/* Per-spec net-change model for the 12.1 page.
 *
 * Honesty contract: the patch notes do NOT contain damage-share weights, so a
 * true net DPS % per spec is not derivable from them alone. This page therefore:
 *   1. Shows the ONLY thing that is exact - spec-wide multipliers ("all damage +N%").
 *   2. Provides a transparent first-order calculator where the weights are YOUR
 *      inputs (from a sim/log), never numbers invented here. Default weights are 0,
 *      so by default the calculator shows only the exact spec-wide base.
 *
 * First-order model: net% = base + Σ( weight_i × pct_i ), where weight_i is an
 * ability's share of the spec's damage and pct_i is its stated change. It treats
 * each change as multiplicative on its own ability's damage share, independent of
 * the others, and ignores cooldown-window uptime and proc interactions.
 */
(function () {
  "use strict";
  var PATCH = window.PATCH, CLASSES = window.CLASSES;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  function pct(c) {
    if (typeof c.r === "number") return c.r;
    if (typeof c.o === "number" && typeof c.n === "number") return ((c.n - c.o) / c.o) * 100;
    return null;
  }
  function fmtPct(p, withSign) {
    var s = (withSign && p > 0) ? "+" : "";
    var v = Math.abs(p) >= 100 ? p.toFixed(0) : p.toFixed(1);
    return s + v.replace(/\.0$/, "") + "%";
  }
  function isGlobalDamage(c) { return /^all (damage|ability damage)\b/i.test(c.a); }
  function isGlobalHealing(c) { return /^all (healing|spell and ability healing)\b/i.test(c.a); }
  function isDamageChange(c) {
    if (pct(c) === null) return false;
    var s = ((c.m || "") + " " + (c.a || "")).toLowerCase();
    return /damage/.test(s);
  }

  // flatten specs with their parent class
  var SPECS = [];
  CLASSES.forEach(function (cls) {
    cls.specs.forEach(function (sp) {
      var dmg = sp.changes.filter(isDamageChange);
      var globalD = sp.changes.filter(isGlobalDamage)[0] || null;
      var globalH = sp.changes.filter(isGlobalHealing)[0] || null;
      SPECS.push({
        cls: cls, sp: sp, key: cls.name + " - " + sp.name,
        role: sp.role, note: sp.note || "",
        globalD: globalD, globalH: globalH,
        targeted: dmg.filter(function (c) { return c !== globalD; })
      });
    });
  });

  // ---------- exact table ----------
  var et = $("#exact-table-body");
  if (et) {
    SPECS.forEach(function (s) {
      var base = s.globalD ? pct(s.globalD) : null;
      var healBase = s.globalH ? pct(s.globalH) : null;
      var buffs = s.targeted.filter(function (c) { return c.d === "buff"; }).length;
      var nerfs = s.targeted.filter(function (c) { return c.d === "nerf"; }).length;

      var exactCell;
      if (base !== null) exactCell = "<span class='change " + (base >= 0 ? "buff" : "nerf") + "'>" + fmtPct(base, true) + " all damage</span>";
      else if (healBase !== null) exactCell = "<span class='change " + (healBase >= 0 ? "buff" : "nerf") + "'>" + fmtPct(healBase, true) + " all healing</span>";
      else exactCell = "<span class='muted'>none stated</span>";

      var tr = el("tr");
      tr.innerHTML =
        "<td class='ability' style='color:" + s.cls.color + "'>" + esc(s.cls.name) + "</td>" +
        "<td>" + esc(s.sp.name) + "</td>" +
        "<td><span class='tag role'>" + esc(s.role || "") + "</span></td>" +
        "<td>" + exactCell + "</td>" +
        "<td class='oldnew' style='text-align:center'>" + (s.targeted.length ? ("<span class='change buff'>" + buffs + "</span> / <span class='change nerf'>" + nerfs + "</span>") : "<span class='muted'>-</span>") + "</td>" +
        "<td class='note'>" + esc(s.note || "-") + "</td>";
      et.appendChild(tr);
    });
  }

  // ---------- calculator ----------
  var sel = $("#spec-select");
  var rows = $("#calc-rows");
  var out = $("#calc-net");
  var baseLbl = $("#calc-base");
  var wsum = $("#calc-wsum");
  if (sel && rows) {
    SPECS.forEach(function (s, i) {
      var o = el("option", null, esc(s.key)); o.value = String(i); sel.appendChild(o);
    });

    function recompute() {
      var s = SPECS[Number(sel.value)];
      var base = s.globalD ? pct(s.globalD) : 0;
      var sumW = 0, net = base;
      rows.querySelectorAll("input.wt").forEach(function (inp) {
        var w = parseFloat(inp.value) || 0;
        var p = parseFloat(inp.getAttribute("data-pct"));
        sumW += w;
        net += (w / 100) * p;
      });
      out.textContent = (net > 0 ? "+" : "") + net.toFixed(1) + "%";
      out.className = "net-num " + (net > 0.0001 ? "buff" : net < -0.0001 ? "nerf" : "");
      wsum.textContent = sumW.toFixed(0) + "%";
      wsum.style.color = sumW > 100 ? "var(--nerf)" : "var(--dim)";
    }

    function render() {
      var s = SPECS[Number(sel.value)];
      var base = s.globalD ? pct(s.globalD) : 0;
      baseLbl.innerHTML = s.globalD
        ? "Exact spec-wide base: <b class='change " + (base >= 0 ? "buff" : "nerf") + "'>" + fmtPct(base, true) + "</b> (from &ldquo;" + esc(s.globalD.a) + "&rdquo;, applies to 100% of damage)"
        : "Exact spec-wide base: <b class='muted'>none</b> (no &ldquo;all damage&rdquo; line for this spec)";

      rows.innerHTML = "";
      if (!s.targeted.length) {
        rows.appendChild(el("p", "muted small", "No further per-ability damage changes to weight for this spec. Net = the spec-wide base above" + (s.globalD ? "" : " (i.e. 0% from the notes alone)") + "."));
        recompute();
        return;
      }
      s.targeted.forEach(function (c, idx) {
        var p = pct(c);
        var row = el("div", "calc-row");
        row.innerHTML =
          "<div class='cr-name'>" + esc(c.a) + " <span class='cr-pct change " + c.d + "'>" + fmtPct(p, true) + "</span>" +
            (c.m ? " <span class='muted small'>(" + esc(c.m) + ")</span>" : "") + "</div>" +
          "<div class='cr-input'><input class='wt' type='number' min='0' max='100' step='1' value='0' data-pct='" + p + "' aria-label='damage share for " + esc(c.a) + "'> <span class='muted small'>% of spec dmg</span></div>";
        rows.appendChild(row);
      });
      rows.querySelectorAll("input.wt").forEach(function (inp) { inp.addEventListener("input", recompute); });
      recompute();
    }

    sel.addEventListener("change", render);
    // default to a spec that has a global so the value is meaningful
    var defIdx = SPECS.findIndex(function (s) { return s.globalD; });
    sel.value = String(defIdx >= 0 ? defIdx : 0);
    render();
  }

  if ($("#src-foot")) $("#src-foot").innerHTML = "Source: <a href='" + esc(PATCH.source) + "' target='_blank' rel='noopener'>" + esc(PATCH.source) + "</a>";
})();
