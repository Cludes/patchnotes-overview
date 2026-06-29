/* Renders the live weekly-reset tuning page from live-data.js.
 * Percentages computed from o/n, same as the main site. */
(function () {
  "use strict";
  var LIVE = window.LIVE;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  function pct(c) {
    if (typeof c.r === "number") return c.r;
    if (typeof c.o === "number" && typeof c.n === "number") return ((c.n - c.o) / c.o) * 100;
    return null;
  }
  function fmtPct(p) { var s = p > 0 ? "+" : ""; var v = Math.abs(p) >= 100 ? p.toFixed(0) : p.toFixed(1); return s + v.replace(/\.0$/, "") + "%"; }
  function fmtOldNew(c) {
    if (typeof c.o === "number" && typeof c.n === "number") { var u = c.u || ""; return esc(c.o + u) + " &rarr; " + esc(c.n + u); }
    if (typeof c.r === "number") return '<span class="muted">stated</span>';
    return '<span class="muted">-</span>';
  }
  function kindLabel(k) { return { tune: "Tune", rework: "Rework", new: "New", removed: "Removed", qol: "QoL" }[k] || k; }

  // source / intro
  if ($("#live-src")) $("#live-src").innerHTML = "Source: <a href='" + esc(LIVE.source) + "' target='_blank' rel='noopener'>" + esc(LIVE.source) + "</a>";
  var il = $("#live-intro");
  if (il) LIVE.intro.forEach(function (g, i) { il.appendChild(el("li", null, "<b>" + (i + 1) + ".</b> " + esc(g))); });

  // tallies
  function tally(list) {
    var b = 0, n = 0, t = 0;
    list.forEach(function (grp) { grp.changes.forEach(function (c) { t++; if (c.d === "buff") b++; else if (c.d === "nerf") n++; }); });
    return { b: b, n: n, t: t };
  }
  var pve = tally(LIVE.pve), pvp = tally(LIVE.pvp);
  if ($("#live-stats")) {
    [
      { num: pve.t + pvp.t, lbl: "tuning lines", cls: "gold" },
      { num: pve.b + pvp.b, lbl: "buffs", cls: "buff" },
      { num: pve.n + pvp.n, lbl: "nerfs", cls: "nerf" },
      { num: pve.t, lbl: "PvE adjustments", cls: "neutral" },
      { num: pvp.t, lbl: "PvP-only", cls: "" }
    ].forEach(function (d) {
      var s = el("div", "stat " + d.cls);
      s.appendChild(el("div", "num", String(d.num)));
      s.appendChild(el("div", "lbl", d.lbl));
      $("#live-stats").appendChild(s);
    });
  }

  function renderList(list, mount) {
    var lastCls = null;
    list.forEach(function (grp) {
      if (grp.cls !== lastCls) {
        var head = el("div", "classhead");
        head.style.setProperty("--cc", grp.color);
        head.style.borderLeftColor = grp.color;
        head.appendChild(el("h3", null, esc(grp.cls)));
        head.querySelector("h3").style.color = grp.color;
        mount.appendChild(head);
        lastCls = grp.cls;
      }
      var sb = el("div", "specblock");
      var sh = el("div", "spechead");
      sh.appendChild(el("span", "name", esc(grp.spec)));
      sb.appendChild(sh);
      if (grp.note) sb.appendChild(el("p", "specnote", esc(grp.note)));

      var wrap = el("div", "tbl-wrap");
      var table = el("table");
      table.innerHTML = "<thead><tr><th>Ability / Talent</th><th>What changed</th><th>Old &rarr; New</th><th style='text-align:right'>Change</th><th>Type / note</th></tr></thead>";
      var tb = el("tbody");
      grp.changes.forEach(function (c) {
        var p = pct(c);
        var changeCell = (p !== null)
          ? "<span class='change " + c.d + "'>" + fmtPct(p) + "</span>"
          : "<span class='tag " + (c.d === "buff" ? "buff" : c.d === "nerf" ? "nerf" : "neutral") + "'>" + esc(c.d) + "</span>";
        var typeCell = "<span class='tag kind'>" + kindLabel(c.k) + "</span>" + (c.t ? " <span class='note'>" + esc(c.t) + "</span>" : "");
        var tr = el("tr");
        tr.innerHTML =
          "<td class='ability'>" + esc(c.a) + "</td>" +
          "<td class='metric'>" + (c.m ? esc(c.m) : "<span class='muted'>-</span>") + "</td>" +
          "<td class='oldnew'>" + fmtOldNew(c) + "</td>" +
          "<td class='change'>" + changeCell + "</td>" +
          "<td class='note'>" + typeCell + "</td>";
        tb.appendChild(tr);
      });
      table.appendChild(tb);
      wrap.appendChild(table);
      sb.appendChild(wrap);
      mount.appendChild(sb);
    });
  }

  if ($("#pve-mount")) renderList(LIVE.pve, $("#pve-mount"));
  if ($("#pvp-mount")) renderList(LIVE.pvp, $("#pvp-mount"));
})();
