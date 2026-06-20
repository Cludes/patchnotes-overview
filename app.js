/* Renders the data-driven parts of the page from data.js. All percentages shown
 * are computed here from o/n, identical to verify.mjs. */
(function () {
  "use strict";
  var PATCH = window.PATCH, CLASSES = window.CLASSES;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };

  // pct: identical math to verify.mjs
  function pct(c) {
    if (typeof c.r === "number") return c.r;
    if (typeof c.o === "number" && typeof c.n === "number") return ((c.n - c.o) / c.o) * 100;
    return null;
  }
  function fmtPct(p) {
    if (p === null) return "";
    var sign = p > 0 ? "+" : "";
    var v = Math.abs(p) >= 100 ? p.toFixed(0) : p.toFixed(1);
    // strip trailing .0
    v = v.replace(/\.0$/, "");
    return sign + v + "%";
  }
  function fmtOldNew(c) {
    if (typeof c.o === "number" && typeof c.n === "number") {
      var u = c.u || "";
      return esc(c.o + u) + " &rarr; " + esc(c.n + u);
    }
    if (typeof c.r === "number") return '<span class="muted">stated</span>';
    return '<span class="muted">-</span>';
  }
  function kindLabel(k) {
    return { tune: "Tune", rework: "Rework", new: "New", removed: "Removed", qol: "QoL" }[k] || k;
  }

  // ---- source links ----
  var srcLink = $("#src-link");
  if (srcLink) { srcLink.href = PATCH.source; }
  var fsrc = $("#footer-src");
  if (fsrc) { fsrc.innerHTML = "Source: <a href='" + esc(PATCH.source) + "' target='_blank' rel='noopener'>" + esc(PATCH.source) + "</a>"; }

  // ---- global structural changes ----
  var gl = $("#global-list");
  if (gl) {
    PATCH.global.forEach(function (g, i) {
      gl.appendChild(el("li", null, "<b>" + (i + 1) + ".</b> " + esc(g)));
    });
  }

  // ---- summary stats ----
  var counts = { buff: 0, nerf: 0, neutral: 0 }, total = 0, numeric = 0, reworks = 0, news = 0, removed = 0;
  CLASSES.forEach(function (cls) {
    cls.specs.forEach(function (sp) {
      sp.changes.forEach(function (c) {
        total++;
        counts[c.d] = (counts[c.d] || 0) + 1;
        if (pct(c) !== null) numeric++;
        if (c.k === "rework") reworks++;
        if (c.k === "new") news++;
        if (c.k === "removed") removed++;
      });
    });
  });
  var stats = $("#stats");
  if (stats) {
    var defs = [
      { num: total, lbl: "total change lines", cls: "" },
      { num: counts.buff, lbl: "buffs", cls: "buff" },
      { num: counts.nerf, lbl: "nerfs", cls: "nerf" },
      { num: reworks, lbl: "reworks / redesigns", cls: "neutral" },
      { num: news, lbl: "new talents / spells", cls: "" },
      { num: removed, lbl: "removed", cls: "" }
    ];
    defs.forEach(function (d) {
      var s = el("div", "stat " + d.cls);
      s.appendChild(el("div", "num", String(d.num)));
      s.appendChild(el("div", "lbl", d.lbl));
      stats.appendChild(s);
    });
  }

  // ---- table-of-contents jump nav ----
  var toc = $("#toc");
  if (toc) {
    [["how", "Math"], ["global", "Structural"], ["summary", "Glance"], ["scorecard", "Scorecard"],
     ["winners", "Buffs/Nerfs"], ["reroll", "Reroll"], ["all", "All changes"]].forEach(function (p) {
      toc.appendChild(el("a", null, esc(p[1]))).setAttribute("href", "#" + p[0]);
    });
    var sep = el("span", "muted small");
    sep.style.padding = "5px 4px";
    sep.textContent = "|";
    toc.appendChild(sep);
    CLASSES.forEach(function (cls) {
      var a = el("a", null, esc(cls.name));
      a.href = "#cls-" + slug(cls.name);
      a.style.color = cls.color;
      toc.appendChild(a);
    });
  }
  function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

  // ---- full per-class tables ----
  var mount = $("#classes");
  CLASSES.forEach(function (cls) {
    var block = el("div", "classblock");
    block.id = "cls-" + slug(cls.name);
    block.style.setProperty("--cc", cls.color);

    var head = el("div", "classhead");
    head.appendChild(el("h3", null, esc(cls.name)));
    block.appendChild(head);

    cls.specs.forEach(function (sp) {
      var sb = el("div", "specblock");

      var sh = el("div", "spechead");
      sh.appendChild(el("span", "name", esc(sp.name)));
      if (sp.role) sh.appendChild(el("span", "tag role", esc(sp.role)));
      sb.appendChild(sh);

      if (sp.note) sb.appendChild(el("p", "specnote", esc(sp.note)));

      var wrap = el("div", "tbl-wrap");
      var table = el("table");
      table.innerHTML = "<thead><tr><th>Ability / Talent</th><th>What changed</th><th>Old &rarr; New</th><th style='text-align:right'>Change</th><th>Type / note</th></tr></thead>";
      var tb = el("tbody");

      sp.changes.forEach(function (c) {
        var p = pct(c);
        var dirClass = c.d;
        var tr = el("tr");
        tr.setAttribute("data-dir", c.d);
        tr.setAttribute("data-kind", c.k);

        var changeCell = "";
        if (p !== null) {
          changeCell = "<span class='change " + dirClass + "'>" + fmtPct(p) + "</span>";
        } else {
          changeCell = "<span class='tag " + (c.d === "buff" ? "buff" : c.d === "nerf" ? "nerf" : "neutral") + "'>" + esc(c.d) + "</span>";
        }

        var typeCell = "<span class='tag kind'>" + kindLabel(c.k) + "</span>";
        if (c.t) typeCell += " <span class='note'>" + esc(c.t) + "</span>";

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
      block.appendChild(sb);
    });

    mount.appendChild(block);
  });

  // ---- filters ----
  var filterBtns = document.querySelectorAll("#filters button");
  filterBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      filterBtns.forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
      var f = b.getAttribute("data-f");
      document.querySelectorAll("#classes tbody tr").forEach(function (tr) {
        var dir = tr.getAttribute("data-dir"), kind = tr.getAttribute("data-kind");
        var show = true;
        if (f === "buff") show = dir === "buff";
        else if (f === "nerf") show = dir === "nerf";
        else if (f === "structural") show = (kind === "rework" || kind === "new" || kind === "removed");
        tr.style.display = show ? "" : "none";
      });
      // hide spec blocks that now have no visible rows
      document.querySelectorAll("#classes .specblock").forEach(function (sb) {
        var anyVisible = Array.prototype.some.call(sb.querySelectorAll("tbody tr"), function (tr) { return tr.style.display !== "none"; });
        sb.style.display = anyVisible ? "" : "none";
      });
      document.querySelectorAll("#classes .classblock").forEach(function (cb) {
        var anyVisible = Array.prototype.some.call(cb.querySelectorAll(".specblock"), function (sb) { return sb.style.display !== "none"; });
        cb.style.display = anyVisible ? "" : "none";
      });
    });
  });

  // ---- back to top ----
  var totop = $("#totop");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 600) totop.classList.add("show"); else totop.classList.remove("show");
  });
  totop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
})();
