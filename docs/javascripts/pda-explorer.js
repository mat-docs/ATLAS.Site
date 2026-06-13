/* Interactive "sample modes" explainer for the Parameter Data Access page.
 * Drop <div class="pda-sample-modes"></div> into the Markdown; this builds the
 * controls, canvas and Chart.js chart inside it. Theme-aware (Material palette)
 * and safe under Material's instant navigation. */
(function () {
  "use strict";

  var MODES = [
    { k: "First", c: "#BA7517" },
    { k: "Max",   c: "#D85A30" },
    { k: "Mean",  c: "#1D9E75" },
    { k: "Min",   c: "#378ADD" }
  ];
  var registry = [];

  function isDark() {
    return document.body.getAttribute("data-md-color-scheme") === "slate";
  }
  function palette() {
    var d = isDark();
    return {
      grid: d ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.10)",
      tick: d ? "rgba(255,255,255,.62)" : "rgba(0,0,0,.55)",
      raw:  d ? "rgba(255,255,255,.30)" : "rgba(0,0,0,.22)"
    };
  }

  function makeSignal() {
    var n = 240, dt = 0.01, x = [], y = [];
    for (var i = 0; i < n; i++) {
      var t = i * dt;
      var v = 52 + 18 * Math.sin(2 * Math.PI * 0.8 * t)
                 + 9 * Math.sin(2 * Math.PI * 3.1 * t + 1)
                 + 6 * Math.sin(2 * Math.PI * 7 * t)
                 + 4 * Math.sin(i * 12.9898) * Math.cos(i * 1.234);
      x.push(+t.toFixed(3));
      y.push(+v.toFixed(2));
    }
    return { n: n, x: x, y: y };
  }

  function resample(sig, mode, st) {
    var bins = {};
    for (var i = 0; i < sig.n; i++) {
      var b = Math.floor(sig.x[i] / st);
      (bins[b] = bins[b] || []).push(sig.y[i]);
    }
    return Object.keys(bins).map(function (b) {
      var a = bins[b], c = (+b + 0.5) * st, val;
      if (mode === "First") val = a[0];
      else if (mode === "Max") val = Math.max.apply(null, a);
      else if (mode === "Min") val = Math.min.apply(null, a);
      else val = a.reduce(function (s, v) { return s + v; }, 0) / a.length;
      return { x: +c.toFixed(3), y: +val.toFixed(2) };
    });
  }

  function build(root) {
    if (root.dataset.pdaInit || typeof Chart === "undefined") return;
    root.dataset.pdaInit = "1";

    var fg = "var(--md-default-fg-color)";
    var fgl = "var(--md-default-fg-color--light)";
    var bd = "var(--md-default-fg-color--lightest)";
    var surf = "var(--md-code-bg-color)";

    root.innerHTML =
      '<div class="pda-modes" style="display:flex;flex-wrap:wrap;gap:8px 14px;margin:0 0 .8rem;"></div>' +
      '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;margin:0 0 1rem;font-size:.8rem;color:' + fgl + ';">' +
        '<label style="display:flex;align-items:center;gap:8px;">SampleTime' +
          '<input type="range" class="pda-st" min="40" max="400" step="20" value="200" style="width:180px;vertical-align:middle;">' +
          '<span class="pda-st-out" style="font-weight:600;min-width:54px;color:' + fg + ';">200 ms</span>' +
        '</label>' +
        '<span>≈ <span class="pda-hz">5</span> Hz grid</span>' +
      '</div>' +
      '<div style="position:relative;width:100%;height:320px;">' +
        '<canvas class="pda-canvas" role="img" aria-label="Raw logged signal overlaid with First, Max, Mean and Min sub-sampled series; a coarser SampleTime makes Max and Min diverge further from the mean.">Raw signal versus sub-sampled modes.</canvas>' +
      '</div>' +
      '<div class="pda-stat" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:1rem;"></div>';

    var modeBox = root.querySelector(".pda-modes");
    var statBox = root.querySelector(".pda-stat");
    statBox.innerHTML =
      stat("raw samples", "240", "pda-raw") +
      stat("returned per mode", "12", "pda-ret") +
      stat("reduction", "20×", "pda-red");
    function stat(label, val, cls) {
      return '<div style="background:' + surf + ';border-radius:.3rem;padding:.6rem .9rem;">' +
        '<div style="font-size:.72rem;color:' + fgl + ';">' + label + '</div>' +
        '<div class="' + cls + '" style="font-size:1.4rem;font-weight:600;color:' + fg + ';">' + val + '</div></div>';
    }

    var sig = makeSignal();
    var raw = sig.x.map(function (xv, k) { return { x: xv, y: sig.y[k] }; });
    var on = { First: false, Max: true, Mean: true, Min: true };
    var st = 0.2;
    var pal = palette();

    function datasets() {
      var arr = [{
        label: "raw samples (GetNextSamples)", data: raw, showLine: true,
        borderColor: pal.raw, borderWidth: 1, pointRadius: 0, order: 9
      }];
      MODES.forEach(function (m) {
        arr.push({
          label: m.k + " (GetNextData)", data: resample(sig, m.k, st),
          borderColor: m.c, backgroundColor: m.c, borderWidth: 2, pointRadius: 3,
          showLine: true, hidden: !on[m.k],
          stepped: (m.k === "Max" || m.k === "Min" || m.k === "First") ? "middle" : false
        });
      });
      return arr;
    }

    var chart = new Chart(root.querySelector(".pda-canvas"), {
      type: "scatter",
      data: { datasets: datasets() },
      options: {
        responsive: true, maintainAspectRatio: false, animation: { duration: 200 },
        interaction: { mode: "nearest", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: function (c) {
            return c.dataset.label + ": " + c.parsed.y.toFixed(1) + " bar @ " + c.parsed.x.toFixed(2) + "s";
          } } }
        },
        scales: {
          x: { title: { display: true, text: "time (s)", color: pal.tick }, grid: { color: pal.grid }, ticks: { color: pal.tick } },
          y: { title: { display: true, text: "cyl pressure (bar)", color: pal.tick }, grid: { color: pal.grid }, ticks: { color: pal.tick } }
        }
      }
    });

    MODES.forEach(function (m) {
      var el = document.createElement("label");
      el.style.cssText = "display:flex;align-items:center;gap:6px;font-size:.8rem;padding:3px 10px;border:1px solid " + bd + ";border-radius:.3rem;cursor:pointer;color:" + fgl + ";";
      el.innerHTML = '<input type="checkbox" ' + (on[m.k] ? "checked" : "") +
        '><span style="width:12px;height:12px;border-radius:3px;background:' + m.c + ';"></span>' + m.k;
      el.querySelector("input").addEventListener("change", function (e) { on[m.k] = e.target.checked; refresh(); });
      modeBox.appendChild(el);
    });

    function refresh() {
      chart.data.datasets = datasets();
      chart.update();
      var ret = resample(sig, "Mean", st).length;
      root.querySelector(".pda-ret").textContent = ret;
      root.querySelector(".pda-red").textContent = Math.round(sig.n / ret) + "×";
      root.querySelector(".pda-raw").textContent = sig.n;
      root.querySelector(".pda-st-out").textContent = Math.round(st * 1000) + " ms";
      root.querySelector(".pda-hz").textContent = Math.round(1 / st);
    }
    root.querySelector(".pda-st").addEventListener("input", function (e) { st = +e.target.value / 1000; refresh(); });
    refresh();

    registry.push({
      canvas: root.querySelector(".pda-canvas"),
      apply: function () {
        var p = palette();
        chart.data.datasets[0].borderColor = p.raw;
        ["x", "y"].forEach(function (ax) {
          chart.options.scales[ax].grid.color = p.grid;
          chart.options.scales[ax].ticks.color = p.tick;
          chart.options.scales[ax].title.color = p.tick;
        });
        chart.update();
      }
    });
  }

  function initAll(tries) {
    tries = typeof tries === "number" ? tries : 0;
    if (!document.querySelector(".pda-sample-modes")) return;
    if (typeof Chart === "undefined") {            /* CDN not ready yet — retry */
      if (tries < 30) setTimeout(function () { initAll(tries + 1); }, 120);
      return;
    }
    document.querySelectorAll(".pda-sample-modes").forEach(build);
  }

  /* Re-theme charts when the Material palette toggles. */
  new MutationObserver(function () {
    registry = registry.filter(function (r) { return document.body.contains(r.canvas); });
    registry.forEach(function (r) { r.apply(); });
  }).observe(document.body, { attributes: true, attributeFilter: ["data-md-color-scheme"] });

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(function () { initAll(); });   /* Material instant navigation */
  } else if (document.readyState !== "loading") {
    initAll();
  } else {
    document.addEventListener("DOMContentLoaded", function () { initAll(); });
  }
})();
