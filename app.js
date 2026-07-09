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
  function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

  function pct(c) {
    if (typeof c.r === "number") return c.r;
    if (typeof c.o === "number" && typeof c.n === "number") return ((c.n - c.o) / c.o) * 100;
    return null;
  }
  function fmtPct(p) {
    if (p === null) return "";
    var sign = p > 0 ? "+" : "";
    var v = Math.abs(p) >= 100 ? p.toFixed(0) : p.toFixed(1);
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
  if ($("#src-link")) $("#src-link").href = PATCH.source;
  if ($("#footer-src")) {
    var fs = "Sources: <a href='" + esc(PATCH.source) + "' target='_blank' rel='noopener'>build 1 class notes</a>";
    if (PATCH.source2) fs += " &middot; <a href='" + esc(PATCH.source2) + "' target='_blank' rel='noopener'>Week 2 weekly notes</a>";
    if (PATCH.source3) fs += " &middot; <a href='" + esc(PATCH.source3) + "' target='_blank' rel='noopener'>Week 3 weekly notes</a>";
    $("#footer-src").innerHTML = fs;
  }

  // ---- global structural changes ----
  var gl = $("#global-list");
  if (gl) PATCH.global.forEach(function (g, i) { gl.appendChild(el("li", null, "<b>" + (i + 1) + ".</b> " + esc(g))); });

  // ---- tallies ----
  var counts = { buff: 0, nerf: 0, neutral: 0 }, total = 0, reworks = 0, news = 0, removed = 0;
  CLASSES.forEach(function (cls) {
    cls.specs.forEach(function (sp) {
      sp.changes.forEach(function (c) {
        total++;
        counts[c.d] = (counts[c.d] || 0) + 1;
        if (c.k === "rework") reworks++;
        if (c.k === "new") news++;
        if (c.k === "removed") removed++;
      });
    });
  });

  if ($("#pill-counts")) $("#pill-counts").innerHTML = "<b>" + counts.buff + "</b> buffs &middot; <b>" + counts.nerf + "</b> nerfs";
  if ($("#all-kicker")) $("#all-kicker").textContent = CLASSES.length + " classes";

  var stats = $("#stats");
  if (stats) {
    [
      { num: total, lbl: "total change lines", cls: "gold" },
      { num: counts.buff, lbl: "buffs", cls: "buff" },
      { num: counts.nerf, lbl: "nerfs", cls: "nerf" },
      { num: reworks, lbl: "reworks / redesigns", cls: "neutral" },
      { num: news, lbl: "new talents / spells", cls: "gold" },
      { num: removed, lbl: "removed", cls: "" }
    ].forEach(function (d) {
      var s = el("div", "stat " + d.cls);
      s.appendChild(el("div", "num", String(d.num)));
      s.appendChild(el("div", "lbl", d.lbl));
      stats.appendChild(s);
    });
  }

  // ---- toc ----
  var toc = $("#toc");
  if (toc) {
    var back = el("a", null, "&larr; Patches"); back.href = "./"; back.style.color = "var(--accent)"; back.style.fontWeight = "600";
    toc.appendChild(back);
    var sep0 = el("span", "navsep"); sep0.textContent = "/"; toc.appendChild(sep0);
    var nm = el("a", null, "Net model"); nm.href = "net-change.html"; toc.appendChild(nm);
    var sep0b = el("span", "navsep"); sep0b.textContent = "/"; toc.appendChild(sep0b);
    var ts = el("a", null, "Tier sets"); ts.href = "tier-sets.html"; toc.appendChild(ts);
    var sep0d = el("span", "navsep"); sep0d.textContent = "/"; toc.appendChild(sep0d);
    var dm = el("a", null, "Datamined"); dm.href = "datamined.html"; toc.appendChild(dm);
    var sep0e = el("span", "navsep"); sep0e.textContent = "/"; toc.appendChild(sep0e);
    var lt = el("a", null, "Live tuning"); lt.href = "live-tuning.html"; toc.appendChild(lt);
    var sep0c = el("span", "navsep"); sep0c.textContent = "/"; toc.appendChild(sep0c);
    [["global", "Structural"], ["summary", "Glance"], ["scorecard", "Scorecard"],
     ["winners", "Buffs/Nerfs"], ["reroll", "Reroll"], ["all", "All changes"]].forEach(function (p) {
      var a = el("a", null, esc(p[1])); a.href = "#" + p[0]; toc.appendChild(a);
    });
    var sep = el("span", "navsep"); sep.textContent = "/"; toc.appendChild(sep);
    CLASSES.forEach(function (cls) {
      var a = el("a", null, esc(cls.name)); a.href = "#cls-" + slug(cls.name); a.style.color = cls.color;
      a.addEventListener("click", function () { var d = $("#cls-" + slug(cls.name)); if (d) d.open = true; });
      toc.appendChild(a);
    });
  }

  // ---- accordion class blocks ----
  var mount = $("#classes");
  var CHEV = "<span class='chev' aria-hidden='true'>&rsaquo;</span>";

  CLASSES.forEach(function (cls) {
    var nB = 0, nN = 0, nChanges = 0, nWk2 = 0, nWk3 = 0;
    cls.specs.forEach(function (sp) {
      sp.changes.forEach(function (c) { nChanges++; if (c.d === "buff") nB++; else if (c.d === "nerf") nN++; if (c.b === 2) nWk2++; else if (c.b === 3) nWk3++; });
    });
    var latestChip = nWk3 ? (nWk3 + " Wk3") : (nWk2 ? (nWk2 + " Wk2") : "");
    // count only real specs (exclude Class-wide / hero-tree shared sections)
    var realSpecs = cls.specs.filter(function (sp) { return sp.role !== "All" && sp.role !== "Shared"; }).length;
    var specLabel = realSpecs + (realSpecs === 1 ? " spec" : " specs");

    var det = el("details", "cls");
    det.id = "cls-" + slug(cls.name);
    det.style.setProperty("--cc", cls.color);

    var sum = el("summary");
    sum.innerHTML =
      "<span class='cls-dot'></span>" +
      "<span class='cls-name'>" + esc(cls.name) + "</span>" +
      "<span class='cls-meta'>" + specLabel + " &middot; " + nChanges + " changes</span>" +
      "<span class='cls-tally'>" +
        (latestChip ? "<span class='minichip w'>" + latestChip + "</span>" : "") +
        (nB ? "<span class='minichip b'>+" + nB + "</span>" : "") +
        (nN ? "<span class='minichip n'>-" + nN + "</span>" : "") +
        CHEV +
      "</span>";
    det.appendChild(sum);

    var body = el("div", "cls-body");
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
        var tr = el("tr");
        tr.setAttribute("data-dir", c.d);
        tr.setAttribute("data-kind", c.k);
        tr.setAttribute("data-build", c.b ? String(c.b) : "1");
        var changeCell = (p !== null)
          ? "<span class='change " + c.d + "'>" + fmtPct(p) + "</span>"
          : "<span class='tag " + (c.d === "buff" ? "buff" : c.d === "nerf" ? "nerf" : "neutral") + "'>" + esc(c.d) + "</span>";
        var typeCell = (c.b ? "<span class='tag wk2'>Wk" + c.b + "</span> " : "") + "<span class='tag kind'>" + kindLabel(c.k) + "</span>" + (c.t ? " <span class='note'>" + esc(c.t) + "</span>" : "");
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
      body.appendChild(sb);
    });

    det.appendChild(body);
    mount.appendChild(det);
  });

  // ---- filters + search ----
  var currentFilter = "all", currentSearch = "";
  function rowVisible(tr, f) {
    if (f === "all") return true;
    var dir = tr.getAttribute("data-dir"), kind = tr.getAttribute("data-kind");
    if (f === "buff") return dir === "buff";
    if (f === "nerf") return dir === "nerf";
    if (f === "structural") return kind === "rework" || kind === "new" || kind === "removed";
    if (f === "wk2") return tr.getAttribute("data-build") === "2";
    if (f === "wk3") return tr.getAttribute("data-build") === "3";
    return true;
  }
  function rowMatch(tr) {
    if (!rowVisible(tr, currentFilter)) return false;
    if (currentSearch && tr.textContent.toLowerCase().indexOf(currentSearch) === -1) return false;
    return true;
  }
  function apply() {
    var active = currentFilter !== "all" || currentSearch !== "";
    document.querySelectorAll("#classes details.cls").forEach(function (det) {
      var anyInClass = false;
      det.querySelectorAll(".specblock").forEach(function (sb) {
        var anyInSpec = false;
        sb.querySelectorAll("tbody tr").forEach(function (tr) {
          var vis = rowMatch(tr);
          tr.style.display = vis ? "" : "none";
          if (vis) anyInSpec = true;
        });
        sb.style.display = anyInSpec ? "" : "none";
        if (anyInSpec) anyInClass = true;
      });
      det.style.display = anyInClass ? "" : "none";
      det.open = active && anyInClass;
    });
    var none = $("#search-none");
    if (none) none.style.display = (active && !document.querySelector("#classes details.cls:not([style*='display: none'])")) ? "" : "none";
  }
  document.querySelectorAll("#filters button").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll("#filters button").forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
      currentFilter = b.getAttribute("data-f");
      apply();
    });
  });
  var search = $("#ability-search");
  if (search) search.addEventListener("input", function () { currentSearch = search.value.trim().toLowerCase(); apply(); });

  // ---- expand / collapse all ----
  if ($("#expand-all")) $("#expand-all").addEventListener("click", function () {
    document.querySelectorAll("#classes details.cls").forEach(function (d) { if (d.style.display !== "none") d.open = true; });
  });
  if ($("#collapse-all")) $("#collapse-all").addEventListener("click", function () {
    document.querySelectorAll("#classes details.cls").forEach(function (d) { d.open = false; });
  });

  // ---- back to top ----
  var totop = $("#totop");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 700) totop.classList.add("show"); else totop.classList.remove("show");
  });
  totop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
})();
