/* Interactive "GetNextSamples vs GetNextData" explainer for the Parameter Data
 * Access page. Drop <div class="pda-samples-vs-data"></div> into the Markdown;
 * this builds the controls, canvas and Chart.js chart inside it.
 *
 * One channel (vCar), with the true continuous signal as the anchor:
 *   - GetNextSamples -> the EXACT values recorded for the channel, each point
 *                       sitting on the true signal at its native timestamp.
 *   - GetNextData    -> values resampled onto a uniform SampleTime grid
 *                       (mode First/Min/Max/Mean + optional linear interpolation).
 *
 * Theme-aware (Material palette) and safe under Material's instant navigation. */
(function () {
  "use strict";

  var TMAX = 1.0;          // window length (s)
  var NATIVE_DT = 0.02;    // native logged interval (s) -> 50 Hz
  var COL = { real: "#9E9E9E", raw: "#BA7517", data: "#1D9E75" };
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

  /* The true continuous signal the channel is measuring. */
  function f(t) {
    return 52 + 18 * Math.sin(2 * Math.PI * 0.9 * t)
              + 9 * Math.sin(2 * Math.PI * 3.3 * t + 0.6)
              + 6 * Math.sin(2 * Math.PI * 6.5 * t);
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
  /* GetNextData: resample the raw samples onto a uniform SampleTime grid. */
  function resample(raw, st, mode, interpolate) {
    var out = [];
    for (var g = 0; g <= TMAX + 1e-9; g += st) {
      var bin = raw.filter(function (p) { return p.x >= g - 1e-9 && p.x < g + st - 1e-9; });
      var val;
      if (bin.length) {
        var ys = bin.map(function (p) { return p.y; });
        if (mode === "First") val = ys[0];
        else if (mode === "Max") val = Math.max.apply(null, ys);
        else if (mode === "Min") val = Math.min.apply(null, ys);
        else val = ys.reduce(function (s, v) { return s + v; }, 0) / ys.length;
      } else {
        val = sampleAt(raw, g, interpolate);
      }
      out.push({ x: +g.toFixed(4), y: +(+val).toFixed(3) });
    }
    return out;
  }
  function sampleAt(raw, t, interpolate) {
    var prev = raw[0], next = null;
    for (var i = 0; i < raw.length; i++) {
      if (raw[i].x <= t) prev = raw[i];
      if (raw[i].x >= t) { next = raw[i]; break; }
    }
    if (!interpolate || !next || next.x === prev.x) return prev.y;
    var r = (t - prev.x) / (next.x - prev.x);
    return prev.y + r * (next.y - prev.y);
  }
  function hz(dt) { return Math.round(1 / dt); }

  function build(root) {
    if (root.dataset.pdaInit || typeof Chart === "undefined") return;
    root.dataset.pdaInit = "1";

    var fg = "var(--md-default-fg-color)";
    var fgl = "var(--md-default-fg-color--light)";
    var bd = "var(--md-default-fg-color--lightest)";

    root.innerHTML =
      '<div class="pda-seg" style="display:inline-flex;border:1px solid ' + bd + ';border-radius:.3rem;overflow:hidden;margin:0 0 .9rem;font-size:.8rem;">' +
        '<button class="pda-mode-samples" style="border:0;padding:.4rem .9rem;cursor:pointer;font:inherit;">GetNextSamples</button>' +
        '<button class="pda-mode-data" style="border:0;border-left:1px solid ' + bd + ';padding:.4rem .9rem;cursor:pointer;font:inherit;">GetNextData</button>' +
      '</div>' +
      '<div class="pda-data-controls" style="display:flex;flex-wrap:wrap;align-items:center;gap:10px 18px;margin:0 0 1rem;font-size:.8rem;color:' + fgl + ';">' +
        '<label style="display:flex;align-items:center;gap:8px;">SampleTime' +
          '<input type="range" class="pda-st" min="20" max="200" step="20" value="100" style="width:160px;vertical-align:middle;">' +
          '<span class="pda-st-out" style="font-weight:600;min-width:54px;color:' + fg + ';">100 ms</span>' +
        '</label>' +
        '<label style="display:flex;align-items:center;gap:6px;">mode' +
          '<select class="pda-modesel" style="font:inherit;padding:2px 4px;">' +
            '<option>Mean</option><option>First</option><option>Max</option><option>Min</option>' +
          '</select>' +
        '</label>' +
        '<label style="display:flex;align-items:center;gap:6px;cursor:pointer;">' +
          '<input type="checkbox" class="pda-interp">linear interpolation</label>' +
      '</div>' +
      '<div style="position:relative;width:100%;height:320px;">' +
        '<canvas class="pda-canvas" role="img" aria-label="The true vCar signal overlaid with either the exact logged samples returned by GetNextSamples, or values resampled onto a uniform SampleTime grid by GetNextData.">GetNextSamples versus GetNextData.</canvas>' +
      '</div>' +
      '<p class="pda-caption" style="font-size:.78rem;color:' + fgl + ';margin:.7rem 0 0;"></p>';

    var real = trueSignal();
    var raw = rawSamples();
    var view = "samples";       // or "data"
    var st = 0.1, mode = "Mean", interp = false;
    var pal = palette();

    var trueDS = {
      label: "True vCar signal", data: real, borderColor: COL.real,
      borderWidth: 1.5, pointRadius: 0, showLine: true, order: 9
    };

    function datasets() {
      if (view === "samples") {
        return [trueDS, {
          label: "GetNextSamples (exact logged samples, " + hz(NATIVE_DT) + " Hz)",
          data: raw, borderColor: COL.raw, backgroundColor: COL.raw,
          borderWidth: 0, pointRadius: 3.5, showLine: false
        }];
      }
      return [trueDS, {
        label: "GetNextData (" + Math.round(1 / st) + " Hz grid)",
        data: resample(raw, st, mode, interp), borderColor: COL.data, backgroundColor: COL.data,
        borderWidth: 2, pointRadius: 3, showLine: true,
        stepped: interp ? false : "after"
      }];
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

    var segS = root.querySelector(".pda-mode-samples");
    var segD = root.querySelector(".pda-mode-data");
    var ctrls = root.querySelector(".pda-data-controls");

    function refresh() {
      var dataView = view === "data";
      ctrls.style.display = dataView ? "flex" : "none";
      segS.style.background = dataView ? "transparent" : COL.raw;
      segS.style.color = dataView ? "inherit" : "#fff";
      segD.style.background = dataView ? COL.data : "transparent";
      segD.style.color = dataView ? "#fff" : "inherit";

      chart.data.datasets = datasets();
      chart.update();

      root.querySelector(".pda-st-out").textContent = Math.round(st * 1000) + " ms";
      var cap = root.querySelector(".pda-caption");
      if (dataView) {
        var n = resample(raw, st, mode, interp).length;
        cap.innerHTML = "<strong>GetNextData</strong> resamples onto a uniform " +
          Math.round(st * 1000) + " ms grid (" + n + " points, <em>" + mode + "</em> mode" +
          (interp ? ", linearly interpolated" : "") + "). The output rate is fixed and " +
          "independent of how the channel was logged — ideal for alignment and plotting.";
      } else {
        cap.innerHTML = "<strong>GetNextSamples</strong> returns the <em>exact</em> values " +
          "recorded for the channel (" + raw.length + " samples at " + hz(NATIVE_DT) + " Hz). " +
          "Every point sits on the logged signal at its native timestamp — no resampling, " +
          "no interpolation, maximum fidelity.";
      }
    }

    segS.addEventListener("click", function () { view = "samples"; refresh(); });
    segD.addEventListener("click", function () { view = "data"; refresh(); });
    root.querySelector(".pda-st").addEventListener("input", function (e) { st = +e.target.value / 1000; refresh(); });
    root.querySelector(".pda-modesel").addEventListener("change", function (e) { mode = e.target.value; refresh(); });
    root.querySelector(".pda-interp").addEventListener("change", function (e) { interp = e.target.checked; refresh(); });
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
    if (!document.querySelector(".pda-samples-vs-data")) return;
    if (typeof Chart === "undefined") {            /* CDN not ready yet — retry */
      if (tries < 30) setTimeout(function () { initAll(tries + 1); }, 120);
      return;
    }
    document.querySelectorAll(".pda-samples-vs-data").forEach(build);
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
