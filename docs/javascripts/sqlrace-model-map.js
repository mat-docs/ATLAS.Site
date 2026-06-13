/* Interactive SQL Race object-model map for the documentation.
 * Drop <div class="sqlrace-model-map"></div> into the Markdown; this builds an
 * interactive Cytoscape graph of the key SQL Race classes and the methods that
 * connect them, inside it.
 *
 * Data: window.SQLRACE_MODEL (generated from the DocFX xrefmap, so every node
 * and edge maps to a real API type/member). Theme-aware (Material palette) and
 * safe under Material's instant navigation. */
(function () {
  "use strict";

  var CAT = {
    connect:   { label: "Connect",   color: "#378ADD" },
    configure: { label: "Configure", color: "#1D9E75" },
    structure: { label: "Structure", color: "#7E57C2" },
    read:      { label: "Read",      color: "#D85A30" },
    functions: { label: "Functions", color: "#C2459E" }
  };
  var registry = [];

  function isDark() { return document.body.getAttribute("data-md-color-scheme") === "slate"; }
  function palette() {
    var d = isDark();
    return {
      bg:   d ? "#1e2129" : "#ffffff",
      edge: d ? "rgba(255,255,255,.45)" : "rgba(0,0,0,.40)",
      navE: "#378ADD",
      writeE: "#D85A30",
      text: d ? "#e6e6e6" : "#1a1a1a",
      muted: d ? "rgba(255,255,255,.65)" : "rgba(0,0,0,.6)"
    };
  }

  function buildStyle(pal) {
    return [
      { selector: "node", style: {
        "background-color": "data(color)", "label": "data(label)",
        "color": "#ffffff", "font-size": 13, "font-weight": 600,
        "text-valign": "center", "text-halign": "center",
        "shape": "round-rectangle", "width": "label", "height": "label",
        "padding": "10px", "border-width": 0, "text-wrap": "wrap", "text-max-width": 150
      }},
      { selector: "node:selected", style: { "border-width": 4, "border-color": "#F2C200" } },
      { selector: "edge", style: {
        "width": 2, "line-color": pal.edge, "target-arrow-color": pal.edge,
        "target-arrow-shape": "triangle", "curve-style": "bezier",
        "label": "data(label)", "font-size": 10, "color": pal.muted,
        "text-background-color": pal.bg, "text-background-opacity": 1,
        "text-background-padding": 2, "text-rotation": "autorotate"
      }},
      { selector: 'edge[kind = "nav"]', style: { "line-color": pal.navE, "target-arrow-color": pal.navE } },
      { selector: 'edge[kind = "write"]', style: { "line-color": pal.writeE, "target-arrow-color": pal.writeE, "line-style": "dashed" } },
      { selector: 'edge[kind = "uses"]', style: { "line-style": "dashed", "opacity": 0.7 } },
      { selector: ".faded", style: { "opacity": 0.12 } },
      { selector: ".hl", style: { "opacity": 1 } },
      { selector: "edge.hl", style: { "width": 3.5 } }
    ];
  }

  function build(root) {
    if (root.dataset.srmInit) return;
    if (typeof cytoscape === "undefined" || !window.SQLRACE_MODEL) return;
    root.dataset.srmInit = "1";

    var model = window.SQLRACE_MODEL;
    var byId = {};
    model.nodes.forEach(function (n) { byId[n.id] = n; });
    var bd = "var(--md-default-fg-color--lightest)";
    var fgl = "var(--md-default-fg-color--light)";
    var surf = "var(--md-code-bg-color)";

    var legend = Object.keys(CAT).map(function (k) {
      return '<button class="srm-leg" data-c="' + k + '" style="display:inline-flex;align-items:center;gap:6px;border:1px solid ' + bd +
        ';background:transparent;border-radius:.3rem;padding:.25rem .6rem;cursor:pointer;font:inherit;font-size:.76rem;color:' + fgl + ';">' +
        '<span style="width:11px;height:11px;border-radius:3px;background:' + CAT[k].color + ';"></span>' + CAT[k].label + '</button>';
    }).join("");

    root.innerHTML =
      '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:0 0 .7rem;">' +
        '<span style="font-size:.76rem;color:' + fgl + ';margin-right:2px;">Highlight:</span>' + legend +
        '<button class="srm-reset" style="margin-left:auto;border:1px solid ' + bd + ';background:transparent;border-radius:.3rem;padding:.25rem .7rem;cursor:pointer;font:inherit;font-size:.76rem;color:' + fgl + ';">Reset view</button>' +
      '</div>' +
      '<div class="srm-wrap" style="display:flex;flex-wrap:wrap;gap:12px;">' +
        '<div class="srm-graph" style="flex:1 1 420px;min-width:280px;height:560px;border:1px solid ' + bd + ';border-radius:.4rem;position:relative;"></div>' +
        '<div class="srm-panel" style="flex:1 1 260px;min-width:240px;max-width:340px;background:' + surf + ';border-radius:.4rem;padding:1rem 1.1rem;font-size:.82rem;line-height:1.6;align-self:flex-start;"></div>' +
      '</div>';

    var elements = [];
    model.nodes.forEach(function (n) {
      elements.push({ data: { id: n.id, label: n.id, category: n.category, color: (CAT[n.category] || {}).color || "#888" } });
    });
    model.edges.forEach(function (e, i) {
      elements.push({ data: { id: "e" + i, source: e.source, target: e.target, label: e.label, kind: e.kind } });
    });

    var pal = palette();
    if (window.cytoscapeDagre) { try { cytoscape.use(window.cytoscapeDagre); } catch (e) {} }
    var useDagre = !!window.cytoscapeDagre && !!window.dagre;

    var cy = cytoscape({
      container: root.querySelector(".srm-graph"),
      elements: elements,
      style: buildStyle(pal),
      wheelSensitivity: 0.2, minZoom: 0.35, maxZoom: 2.5,
      layout: useDagre
        ? { name: "dagre", rankDir: "LR", nodeSep: 28, rankSep: 80, edgeSep: 12 }
        : { name: "breadthfirst", directed: true, roots: "#SessionManager", spacingFactor: 1.25, padding: 20 }
    });

    function panelDefault() {
      root.querySelector(".srm-panel").innerHTML =
        '<strong style="font-size:.9rem;">SQL Race object model</strong>' +
        '<p style="color:' + fgl + ';margin:.5rem 0 .8rem;">Click a class to see what it does, its key methods, and links to the API reference and a worked example. Arrows are the actual methods/properties that connect the classes.</p>' +
        '<div style="color:' + fgl + ';font-size:.76rem;">Edge colours: ' +
        '<span style="color:' + pal.navE + ';">— navigation</span>, ' +
        '<span style="color:' + pal.writeE + ';">— write</span>, ' +
        '<span>— method call</span>.</div>';
    }

    function showNode(id) {
      var n = byId[id]; if (!n) return;
      var col = (CAT[n.category] || {}).color || "#888";
      var docLink = n.doc ? '<a href="' + n.doc + '" target="_blank" rel="noopener" style="color:' + col + ';font-weight:600;">API reference \u2197</a>' : "";
      var exLink = n.example ? '<a href="' + n.example + '" style="font-weight:600;">See example \u2192</a>' : "";

      function renderMembers(list) {
        return list.map(function (m) {
          var dot = m.edge
            ? '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:' + col + ';margin-right:6px;vertical-align:middle;"></span>'
            : '<span style="display:inline-block;width:6px;margin-right:6px;"></span>';
          return '<a class="srm-mem" data-n="' + m.name.toLowerCase() + '" href="' + m.href + '" target="_blank" rel="noopener" ' +
            'style="display:block;padding:1px 2px;color:inherit;text-decoration:none;font-family:monospace;font-size:.76rem;' +
            (m.edge ? "font-weight:700;" : "") + '">' + dot + m.name + '</a>';
        }).join("");
      }
      function section(title, list) {
        if (!list || !list.length) return "";
        return '<div style="margin-top:.6rem;"><div style="font-size:.68rem;letter-spacing:.04em;text-transform:uppercase;color:' + fgl + ';margin-bottom:.25rem;">' + title + ' (' + list.length + ')</div>' +
          '<div class="srm-mlist" style="max-height:150px;overflow:auto;border:1px solid ' + bd + ';border-radius:.3rem;padding:.3rem .4rem;">' + renderMembers(list) + '</div></div>';
      }

      var total = (n.methods ? n.methods.length : 0) + (n.properties ? n.properties.length : 0);
      var filter = total > 8
        ? '<input class="srm-filter" placeholder="Filter members\u2026" style="width:100%;margin-top:.6rem;padding:.35rem .5rem;border:1px solid ' + bd + ';border-radius:.3rem;font:inherit;font-size:.78rem;box-sizing:border-box;">'
        : "";
      var membersNote = total === 0
        ? '<div style="color:' + fgl + ';font-size:.76rem;margin-top:.5rem;">Members for this type are documented in a separate package &mdash; follow the API reference link.</div>'
        : "";

      root.querySelector(".srm-panel").innerHTML =
        '<div style="display:inline-block;background:' + col + ';color:#fff;font-weight:700;padding:.2rem .6rem;border-radius:.3rem;font-size:.95rem;">' + n.id + '</div>' +
        '<div style="color:' + fgl + ';font-size:.72rem;text-transform:uppercase;letter-spacing:.04em;margin:.5rem 0 .2rem;">' + ((CAT[n.category] || {}).label || n.category) + '</div>' +
        '<p style="margin:.2rem 0 .4rem;">' + n.blurb + '</p>' +
        '<div style="color:' + fgl + ';font-size:.72rem;font-family:monospace;word-break:break-all;margin-bottom:.5rem;">' + n.uid + '</div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:.3rem .9rem;">' + docLink + exLink + '</div>' +
        filter + membersNote +
        section("Methods", n.methods) +
        section("Properties", n.properties) +
        '<div style="font-size:.68rem;color:' + fgl + ';margin-top:.5rem;">' +
        (total ? '<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:' + col + ';margin-right:5px;"></span>shown on the map' : "") + '</div>';

      var fi = root.querySelector(".srm-filter");
      if (fi) fi.addEventListener("input", function () {
        var q = this.value.toLowerCase();
        root.querySelectorAll(".srm-mem").forEach(function (a) {
          a.style.display = a.dataset.n.indexOf(q) >= 0 ? "block" : "none";
        });
      });
    }

    function focus(node) {
      cy.elements().addClass("faded").removeClass("hl");
      var nb = node.closedNeighborhood();
      nb.removeClass("faded").addClass("hl");
    }
    function clearFocus() { cy.elements().removeClass("faded hl"); }

    cy.on("tap", "node", function (evt) { focus(evt.target); showNode(evt.target.id()); });
    cy.on("tap", function (evt) { if (evt.target === cy) { clearFocus(); cy.$(":selected").unselect(); panelDefault(); } });
    cy.on("mouseover", "node", function (evt) { evt.target.connectedEdges().addClass("hl"); });
    cy.on("mouseout", "node", function (evt) { if (cy.$(":selected").length === 0) evt.target.connectedEdges().removeClass("hl"); });

    root.querySelectorAll(".srm-leg").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var c = btn.dataset.c;
        var sel = cy.nodes('[category = "' + c + '"]');
        if (!sel.length) return;
        cy.elements().addClass("faded").removeClass("hl");
        sel.removeClass("faded").addClass("hl");
        sel.connectedEdges().removeClass("faded");
        sel.neighborhood().removeClass("faded");
      });
    });
    root.querySelector(".srm-reset").addEventListener("click", function () {
      clearFocus(); cy.$(":selected").unselect(); panelDefault();
      cy.animate({ fit: { padding: 20 }, duration: 300 });
    });

    panelDefault();
    cy.ready(function () { cy.fit(undefined, 20); });

    registry.push({
      root: root, cy: cy,
      apply: function () { cy.style(buildStyle(palette())); }
    });
  }

  function initAll(tries) {
    tries = typeof tries === "number" ? tries : 0;
    if (!document.querySelector(".sqlrace-model-map")) return;
    if (typeof cytoscape === "undefined" || !window.SQLRACE_MODEL) {
      if (tries < 40) setTimeout(function () { initAll(tries + 1); }, 120);
      return;
    }
    document.querySelectorAll(".sqlrace-model-map").forEach(build);
  }

  new MutationObserver(function () {
    registry = registry.filter(function (r) { return document.body.contains(r.root); });
    registry.forEach(function (r) { r.apply(); });
  }).observe(document.body, { attributes: true, attributeFilter: ["data-md-color-scheme"] });

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(function () { initAll(); });
  } else if (document.readyState !== "loading") {
    initAll();
  } else {
    document.addEventListener("DOMContentLoaded", function () { initAll(); });
  }
})();
