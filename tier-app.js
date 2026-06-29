/* Renders the Season 2 tier-set bonuses from tier-data.js (official PTR dev notes). */
(function () {
  "use strict";
  var T = window.TIERSETS || [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  var CHEV = "<span class='chev' aria-hidden='true'>&rsaquo;</span>";

  // toc
  var toc = $("#toc");
  if (toc) {
    var back = el("a", null, "&larr; Patches"); back.href = "./"; back.style.color = "var(--accent)"; back.style.fontWeight = "600"; toc.appendChild(back);
    var sep = el("span", "navsep"); sep.textContent = "/"; toc.appendChild(sep);
    T.forEach(function (cls) { var a = el("a", null, esc(cls.name)); a.href = "#cls-" + slug(cls.name); a.style.color = cls.color; a.addEventListener("click", function(){ var d=$("#cls-"+slug(cls.name)); if(d) d.open=true; }); toc.appendChild(a); });
  }

  var mount = $("#tiersets");
  T.forEach(function (cls) {
    var det = el("details", "cls");
    det.id = "cls-" + slug(cls.name);
    det.style.setProperty("--cc", cls.color);
    var sum = el("summary");
    sum.innerHTML =
      "<span class='cls-dot'></span>" +
      "<span class='cls-name'>" + esc(cls.name) + "</span>" +
      "<span class='cls-meta'>" + cls.specs.length + " specs</span>" +
      "<span class='cls-tally'>" + CHEV + "</span>";
    det.appendChild(sum);
    var body = el("div", "cls-body");
    cls.specs.forEach(function (sp) {
      var block = el("div", "tierspec");
      var head = "<div class='spechead'><span class='name'>" + esc(sp.spec) + "</span></div>";
      if (sp.note) head += "<p class='specnote'>" + esc(sp.note) + "</p>";
      var rows =
        "<div class='setrow'><span class='setlabel two'>2-Set</span><span class='settext'>" + esc(sp.set2) + "</span></div>" +
        "<div class='setrow'><span class='setlabel four'>4-Set</span><span class='settext'>" + esc(sp.set4) + "</span></div>";
      block.innerHTML = head + rows;
      body.appendChild(block);
    });
    det.appendChild(body);
    mount.appendChild(det);
  });

  if ($("#tier-src")) $("#tier-src").innerHTML = "Source: <a href='https://www.wowhead.com/news/full-patch-12-1-curse-of-ulatek-ptr-development-notes-381914' target='_blank' rel='noopener'>Full Patch 12.1 PTR Development Notes (Blizzard via Wowhead)</a>";
})();
