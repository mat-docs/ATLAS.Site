/* Interactive "read-method fidelity" overlay for the Parameter Data Access page.
 * Drop <div class="pda-fidelity"></div> into the Markdown; this builds the
 * controls, canvas and Chart.js chart inside it.
 *
 * Overlays, on one signal:
 *   - True signal (illustrative continuous trace)
 *   - GetNextSamples  -> every raw logged sample at the native rate
 *   - GetNextData @ 500 Hz  (SampleTime = 2,000,000 ns)
 *   - GetNextData @ 50 Hz   (SampleTime = 20,000,000 ns)
 *   - GetNextData (custom)  -> driven by the SampleTime / frequency slider
 *
 * Theme-aware (Material palette) and safe under Material's instant navigation. */
(function () {
  "use strict";

  var TMAX = 1.0;            // window length (s)
  var NATIVE_DT = 0.01;      // native logged interval (s) -> 100 Hz
  var COL = {
    real:   "#9E9E9E",
    raw:    "#BA7517",
    f500:   "#1D9E75",
    f50:    "#D85A30",
    custom: "#378ADD"
  };
  var registry = [];

  function isDark() {
    return document.body.getAttribute("data-md-color-scheme") === "slate";
  }
  function palette() {
    var d = isDark();
    return {
      grid: d ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.10)",
      tick: d ? "rgba(255,255,255,.62)" : "rgba(0,0,0,.55)"
    };
  }

  /* The underlying physical signal the logger is measuring. */
  function f(t) {
    return 52 + 18 * Math.sin(2 * Math.PI * 0.9 * t)
              + 9 * Math.sin(2 * Math.PI * 3.3 * t + 0.6)
              + 6 * Math.sin(2 * Math.PI * 7.0 * t)
              + 4 * Math.sin(2 * Math.PI * 18.0 * t);
  }
  function trueSignal() {
    var pts = [];
    for (var t = 0; t <= TMAX + 1e-9; t += 0.001) pts.push({ x: +t.toFixed(4), y: +f(t).toFixed(3) });
    return pts;
  }
  function rawSamples() {
    var pts = [];
    for (var t = 0; t <= TMAX + 1e-9; t += NATIVE_DT) pts.push({ x: +t.toFixed(4), y: +f(t).toFixed(3) });
    return pts;
  }
  /* GetNextData: resample the raw samples onto a uniform SampleTime grid.
   * Down-sampling (grid coarser than native) -> mean over the bin.
   * Up-sampling (grid finer than native)     -> linear interpolation. */
  function resample(raw, st) {
    var out = [];
    for (var g = 0; g <= TMAX + 1e-9; g += st) {
      var bin = raw.filter(function (p) { return p.x >= g - 1e-9 && p.x < g + st - 1e-9; });
      var val;
      if (bin.length) {
        val = bin.reduce(function (s, p) { return s + p.y; }, 0) / bin.length;
      } else {
        val = interpAt(raw, g);
      }
      out.push({ x: +g.toFixed(4), y: +val.toFixed(3) });
    }
    return out;
  }
  function interpAt(raw, t) {
    var prev = raw[0], next = null;
    for (var i = 0; i < raw.length; i++) {
      if (raw[i].x <= t) prev = raw[i];
      if (raw[i].x >= t) { next = raw[i]; break; }
    }
    if (!next || next.x === prev.x) return prev.y;
    var r = (t - prev.x) / (next.x - prev.x);
    return prev.y + r * (next.y - prev.y);
  }
  function hz(st) { return Math.round(1 / st); }
  function ns(st) { return Math.round(st * 1e9); }

  function build(root) {
    if (root.dataset.pdaInit || typeof Chart === "undefined") return;
    root.dataset.pdaInit = "1";

    var fg = "var(--md-default-fg-color)";
    var fgl = "var(--md-default-fg-color--light)";

    root.innerHTML =
      '<div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px 18px;margin:0 0 1rem;font-size:.8rem;color:' + fgl + ';">' +
        '<label style="display:flex;align-items:center;gap:8px;">GetNextData frequency' +
          '<input type="range" class="pda-fq" min="10" max="500" step="10" value="100" style="width:180px;vertical-align:middle;">' +
        '</label>' +
        '<span class="pda-fq-out" style="font-weight:600;color:' + fg + ';">100 Hz</span>' +
        '<span class="pda-st-out">SampleTime = 10,000,000 ns</span>' +
      '</div>' +
      '<div style="position:relative;width:100%;height:340px;">' +
        '<canvas class="pda-canvas" role="img" aria-label="A continuous true signal overlaid with GetNextSamples raw data and GetNextData resampled at 500 Hz and 50 Hz, showing how a lower output frequency drops detail.">Read-method fidelity comparison.</canvas>' +
      '</div>' +
      '<p class="pda-caption" style="font-size:.78rem;color:' + fgl + ';margin:.7rem 0 0;"></p>';

    var real = trueSignal();
    var raw = rawSamples();
    var pal = palette();
    var customSt = 0.01;          // 100 Hz default
    var customShown = false;

    function lineDS(label, data, color, opts) {
      opts = opts || {};
      return {
        label: label, data: data, borderColor: color, backgroundColor: color,
        borderWidth: opts.bw || 2, pointRadius: opts.pr == null ? 0 : opts.pr,
        showLine: true, stepped: opts.stepped || false,
        borderDash: opts.dash || [], hidden: !!opts.hidden, order: opts.order || 0
      };
    }

    function datasets() {
      return [
        lineDS("True signal", real, COL.real, { bw: 1.5, order: 9 }),
        lineDS("GetNextSamples (raw, " + hz(NATIVE_DT) + " Hz)", raw, COL.raw, { pr: 2.5, bw: 1.5 }),
        lineDS("GetNextData @ 500 Hz", resample(raw, 0.002), COL.f500, { bw: 2 }),
        lineDS("GetNextData @ 50 Hz", resample(raw, 0.02), COL.f50, { bw: 2, stepped: "after", pr: 2 }),
        lineDS("GetNextData @ " + hz(customSt) + " Hz (custom)", resample(raw, customSt), COL.custom, { bw: 2, dash: [6, 4], hidden: !customShown })
      ];
    }

    var chart = new Chart(root.querySelector(".pda-canvas"), {
      type: "scatter",
      data: { datasets: datasets() },
      options: {
        responsive: true, maintainAspectRatio: false, animation: { duration: 200 },
        interaction: { mode: "nearest", intersect: false },
        plugins: {
          legend: { display: true, labels: { color: pal.tick, boxWidth: 12, font: { size: 11 } } },
          tooltip: { callbacks: { label: function (c) {
            return c.dataset.label + ": " + c.parsed.y.toFixed(1) + " @ " + c.parsed.x.toFixed(3) + "s";
          } } }
        },
        scales: {
          x: { title: { display: true, text: "time (s)", color: pal.tick }, grid: { color: pal.grid }, ticks: { color: pal.tick }, min: 0, max: TMAX },
          y: { title: { display: true, text: "vCar (km/h)", color: pal.tick }, grid: { color: pal.grid }, ticks: { color: pal.tick } }
        }
      }
    });

    function caption() {
      root.querySelector(".pda-caption").innerHTML =
        "<strong>SampleTime sets the output grid:</strong> frequency = 1e9 / SampleTime. " +
        "<code>2,000,000 ns</code> = 500 Hz, <code>20,000,000 ns</code> = 50 Hz. " +
        "<code>GetNextData</code> can't add detail beyond the logged rate — 500 Hz tracks " +
        "the raw samples, while 50 Hz averages each window and drops the peaks. Toggle any " +
        "series in the legend; drag the slider to add a custom output frequency.";
    }

    function refresh() {
      chart.data.datasets = datasets();
      chart.update();
      root.querySelector(".pda-fq-out").textContent = hz(customSt) + " Hz";
      root.querySelector(".pda-st-out").textContent =
        "SampleTime = " + ns(customSt).toLocaleString() + " ns";
    }

    root.querySelector(".pda-fq").addEventListener("input", function (e) {
      customSt = 1 / (+e.target.value);
      customShown = true;
      refresh();
    });
    caption();
    refresh();

    registry.push({
      canvas: root.querySelector(".pda-canvas"),
      apply: function () {
        var p = palette();
        ["x", "y"].forEach(function (ax) {
          chart.options.scales[ax].grid.color = p.grid;
          chart.options.scales[ax].ticks.color = p.tick;
          chart.options.scales[ax].title.color = p.tick;
        });
        chart.options.plugins.legend.labels.color = p.tick;
        chart.update();
      }
    });
  }

  function initAll(tries) {
    tries = typeof tries === "number" ? tries : 0;
    if (!document.querySelector(".pda-fidelity")) return;
    if (typeof Chart === "undefined") {            /* CDN not ready yet — retry */
      if (tries < 30) setTimeout(function () { initAll(tries + 1); }, 120);
      return;
    }
    document.querySelectorAll(".pda-fidelity").forEach(build);
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
