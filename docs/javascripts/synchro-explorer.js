/* Interactive "synchro timing" explainer for the Writing Synchro Data page.
 * Drop <div class="synchro-timing"></div> into the Markdown; this builds the
 * controls, canvas and Chart.js chart inside it.
 *
 * Synchro samples are one-per-engine-event: evenly spaced in the angular
 * (per-rev) domain, but UNEVENLY spaced in time, because the gap between samples
 * = one revolution = 60 / RPM. To make the uneven spacing obvious the samples are
 * drawn as a lollipop/stem plot, with a dimension-line ruler showing each gap
 * (Δt). Switch domains, pick an RPM profile, and watch the inter-sample intervals
 * and the per-packet delta scale (GCD) update live.
 *
 * Theme-aware (Material palette) and safe under Material's instant navigation. */
(function () {
  "use strict";

  /* Revolution periods in milliseconds (one entry per sampled revolution).
   * Synchro interval between samples = the revolution period at that point. */
  var PROFILES = {
    spinup:   { label: "Spin up 5000 → 20000 RPM",  p: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3] },
    spindown: { label: "Spin down 20000 → 5000 RPM", p: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    surge:    { label: "Surge 5000 → 20000 → 5000 RPM", p: [12, 9, 6, 4, 3, 3, 4, 6, 9, 12] },
    steady:   { label: "Steady 7500 RPM", p: [8, 8, 8, 8, 8, 8, 8, 8] }
  };
  var COL = { val: "#D85A30", rpm: "#378ADD" };
  var registry = [];

  function isDark() {
    return document.body.getAttribute("data-md-color-scheme") === "slate";
  }
  function palette() {
    var d = isDark();
    return {
      grid: d ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.10)",
      tick: d ? "rgba(255,255,255,.62)" : "rgba(0,0,0,.55)",
      stem: d ? "rgba(216,90,48,.45)" : "rgba(216,90,48,.40)"
    };
  }

  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a; }
  function fmtMs(v) { return (Math.round(v * 1000) / 1000).toString(); }

  /* Build the per-sample model for a profile. */
  function model(key) {
    var periodsMs = PROFILES[key].p;
    var n = periodsMs.length;
    var periodNs = periodsMs.map(function (ms) { return Math.round(ms * 1e6); });
    var tNs = [0];
    for (var i = 1; i < n; i++) tNs.push(tNs[i - 1] + periodNs[i - 1]);
    var rpm = periodsMs.map(function (ms) { return Math.round(60000 / ms); });
    var value = rpm.map(function (r, i) {
      var v = 40 + Math.max(0, Math.min(1.1, (r - 5000) / 15000)) * 60 + 3 * Math.sin(i * 1.7);
      return +v.toFixed(1);
    });
    var intervalsNs = [];
    for (i = 0; i < n - 1; i++) intervalsNs.push(tNs[i + 1] - tNs[i]);
    var ds = intervalsNs.length ? intervalsNs[0] : 1;
    intervalsNs.forEach(function (v) { ds = gcd(ds, v); });
    if (ds === 0) ds = 1;
    return {
      n: n, tNs: tNs, rpm: rpm, value: value,
      intervalsNs: intervalsNs, deltaScale: ds,
      scaled: intervalsNs.map(function (v) { return v / ds; })
    };
  }

  /* Lollipop stems from the baseline up to each sample (drawn under the dots). */
  var stems = {
    id: "synchroStems",
    beforeDatasetsDraw: function (chart) {
      var d = chart.$syn; if (!d) return;
      var ctx = chart.ctx, area = chart.chartArea, xs = chart.scales.x, ys = chart.scales.y;
      ctx.save();
      ctx.strokeStyle = palette().stem; ctx.lineWidth = 2; ctx.setLineDash([]);
      d.xs.forEach(function (xv, i) {
        var px = xs.getPixelForValue(xv), py = ys.getPixelForValue(d.value[i]);
        ctx.beginPath(); ctx.moveTo(px, area.bottom); ctx.lineTo(px, py); ctx.stroke();
      });
      ctx.restore();
    }
  };

  /* Dimension-line ruler showing the gap (Δt) between consecutive samples. */
  var ruler = {
    id: "synchroRuler",
    afterDatasetsDraw: function (chart) {
      var d = chart.$syn; if (!d || d.xs.length < 2) return;
      var ctx = chart.ctx, area = chart.chartArea, xs = chart.scales.x;
      var pal = palette();
      var yR = area.top + 15;
      ctx.save();
      ctx.strokeStyle = pal.tick; ctx.fillStyle = pal.tick; ctx.lineWidth = 1; ctx.setLineDash([]);
      ctx.font = "10px system-ui, sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";
      for (var i = 0; i < d.xs.length - 1; i++) {
        var x0 = xs.getPixelForValue(d.xs[i]), x1 = xs.getPixelForValue(d.xs[i + 1]);
        ctx.beginPath(); ctx.moveTo(x0, yR); ctx.lineTo(x1, yR); ctx.stroke();           // span
        ctx.beginPath(); ctx.moveTo(x0, yR - 3); ctx.lineTo(x0, yR + 3); ctx.stroke();   // left cap
        ctx.beginPath(); ctx.moveTo(x1, yR - 3); ctx.lineTo(x1, yR + 3); ctx.stroke();   // right cap
        if (x1 - x0 > 30) {
          var label = d.domain === "time" ? fmtMs(d.intervalsNs[i] / 1e6) + " ms" : "1 rev";
          ctx.fillText(label, (x0 + x1) / 2, yR - 4);
        }
      }
      ctx.textAlign = "left";
      ctx.fillText("Δt between samples", area.left, yR + 14);
      ctx.restore();
    }
  };

  function build(root) {
    if (root.dataset.synInit || typeof Chart === "undefined") return;
    root.dataset.synInit = "1";

    var fg = "var(--md-default-fg-color)";
    var fgl = "var(--md-default-fg-color--light)";
    var bd = "var(--md-default-fg-color--lightest)";
    var surf = "var(--md-code-bg-color)";

    var profBtns = Object.keys(PROFILES).map(function (k) {
      return '<button class="syn-prof" data-k="' + k + '" style="border:1px solid ' + bd +
        ';background:transparent;border-radius:.3rem;padding:.3rem .7rem;cursor:pointer;font:inherit;font-size:.78rem;color:' + fgl + ';">' +
        PROFILES[k].label + '</button>';
    }).join("");

    root.innerHTML =
      '<div style="display:flex;flex-wrap:wrap;gap:8px 10px;align-items:center;margin:0 0 .8rem;">' + profBtns + '</div>' +
      '<div class="syn-seg" style="display:inline-flex;border:1px solid ' + bd + ';border-radius:.3rem;overflow:hidden;margin:0 0 1rem;font-size:.8rem;">' +
        '<button class="syn-dom-time" style="border:0;padding:.4rem .9rem;cursor:pointer;font:inherit;">Time domain</button>' +
        '<button class="syn-dom-rev" style="border:0;border-left:1px solid ' + bd + ';padding:.4rem .9rem;cursor:pointer;font:inherit;">Per-rev (event) domain</button>' +
      '</div>' +
      '<div style="position:relative;width:100%;height:330px;">' +
        '<canvas class="syn-canvas" role="img" aria-label="Cylinder pressure sampled once per engine revolution, drawn as stems against time (uneven spacing that tightens as RPM rises) or against revolution number (uniform spacing), with a ruler showing each inter-sample gap and engine RPM overlaid.">Synchro samples as stems in the time domain versus the per-revolution domain.</canvas>' +
      '</div>' +
      '<div class="syn-readout" style="background:' + surf + ';border-radius:.3rem;padding:.7rem .9rem;margin-top:1rem;font-size:.78rem;color:' + fg + ';line-height:1.7;"></div>';

    var key = "spinup";
    var domain = "time";   // or "rev"
    var pal = palette();

    function xfor(m) {
      return domain === "time"
        ? m.tNs.map(function (t) { return +(t / 1e6).toFixed(3); })   // ms
        : m.tNs.map(function (_, i) { return i; });                   // rev index
    }

    function dataFor() {
      var m = model(key), xs = xfor(m);
      return {
        m: m, xs: xs,
        sets: [
          {
            label: "CylPressure (per rev)", yAxisID: "y",
            data: xs.map(function (x, i) { return { x: x, y: m.value[i] }; }),
            borderColor: COL.val, backgroundColor: COL.val, borderWidth: 0,
            pointRadius: 4.5, pointHoverRadius: 6, showLine: false, order: 1
          },
          {
            label: "Engine RPM", yAxisID: "y1",
            data: xs.map(function (x, i) { return { x: x, y: m.rpm[i] }; }),
            borderColor: COL.rpm, backgroundColor: COL.rpm, borderWidth: 2,
            pointRadius: 0, showLine: true, tension: 0.4, order: 9
          }
        ]
      };
    }

    var built = dataFor();
    var chart = new Chart(root.querySelector(".syn-canvas"), {
      type: "scatter",
      data: { datasets: built.sets },
      options: {
        responsive: true, maintainAspectRatio: false, animation: { duration: 250 },
        interaction: { mode: "nearest", intersect: false },
        plugins: {
          legend: { display: true, labels: { color: pal.tick, boxWidth: 12, font: { size: 11 } } },
          tooltip: { callbacks: {
            title: function (items) {
              var i = items[0].dataIndex, m = chart.$syn ? chart.$syn.m : null;
              if (!m) return "";
              return "Sample " + (i + 1) + " · t = " + fmtMs(m.tNs[i] / 1e6) + " ms";
            },
            label: function (c) {
              var unit = c.dataset.yAxisID === "y1" ? " RPM" : " bar";
              return c.dataset.label + ": " + c.parsed.y.toFixed(c.dataset.yAxisID === "y1" ? 0 : 1) + unit;
            }
          } }
        },
        scales: {
          x: { type: "linear", title: { display: true, text: "time (ms)", color: pal.tick }, grid: { color: pal.grid }, ticks: { color: pal.tick } },
          y: { position: "left", grace: "22%", title: { display: true, text: "CylPressure (bar)", color: pal.tick }, grid: { color: pal.grid }, ticks: { color: pal.tick } },
          y1: { position: "right", grace: "22%", title: { display: true, text: "RPM", color: pal.tick }, grid: { drawOnChartArea: false }, ticks: { color: pal.tick } }
        }
      },
      plugins: [stems, ruler]
    });

    function fmtList(arr, mapFn, max) {
      var shown = arr.slice(0, max).map(mapFn);
      return "[" + shown.join(", ") + (arr.length > max ? ", ..." : "") + "]";
    }

    function refresh() {
      var b = dataFor();
      chart.data.datasets = b.sets;
      chart.options.scales.x.title.text = domain === "time" ? "time (ms)" : "revolution #";
      chart.$syn = { xs: b.xs, value: b.m.value, intervalsNs: b.m.intervalsNs, domain: domain, m: b.m };
      chart.update();

      root.querySelectorAll(".syn-prof").forEach(function (btn) {
        var on = btn.dataset.k === key;
        btn.style.background = on ? COL.val : "transparent";
        btn.style.color = on ? "#fff" : "var(--md-default-fg-color--light)";
      });
      var segT = root.querySelector(".syn-dom-time"), segR = root.querySelector(".syn-dom-rev");
      var timeOn = domain === "time";
      segT.style.background = timeOn ? COL.rpm : "transparent"; segT.style.color = timeOn ? "#fff" : "inherit";
      segR.style.background = timeOn ? "transparent" : COL.rpm; segR.style.color = timeOn ? "inherit" : "#fff";

      var m = b.m, durMs = (m.tNs[m.n - 1] / 1e6).toFixed(1);
      root.querySelector(".syn-readout").innerHTML =
        "<div><strong>" + m.n + " samples</strong> over " + durMs + " ms — " +
        (domain === "time"
          ? "look at the stems and the Δt ruler: spacing <strong>tightens as RPM rises</strong> and widens as it falls."
          : "stems are <strong>uniformly spaced</strong> — one per revolution in the angular domain.") + "</div>" +
        "<div>intervals (ms): <code>" + fmtList(m.intervalsNs, function (v) { return +(v / 1e6).toFixed(3); }, 7) + "</code></div>" +
        "<div>delta scale (GCD): <code>" + m.deltaScale.toLocaleString() + " ns</code> &rarr; " +
        "scaled (uint16): <code>" + fmtList(m.scaled, function (v) { return v; }, 7) + "</code></div>";
    }

    root.querySelectorAll(".syn-prof").forEach(function (btn) {
      btn.addEventListener("click", function () { key = btn.dataset.k; refresh(); });
    });
    root.querySelector(".syn-dom-time").addEventListener("click", function () { domain = "time"; refresh(); });
    root.querySelector(".syn-dom-rev").addEventListener("click", function () { domain = "rev"; refresh(); });
    refresh();

    registry.push({
      canvas: root.querySelector(".syn-canvas"),
      apply: function () {
        var p = palette();
        ["x", "y", "y1"].forEach(function (ax) {
          chart.options.scales[ax].ticks.color = p.tick;
          chart.options.scales[ax].title.color = p.tick;
          if (chart.options.scales[ax].grid) chart.options.scales[ax].grid.color = p.grid;
        });
        chart.options.plugins.legend.labels.color = p.tick;
        chart.update();
      }
    });
  }

  function initAll(tries) {
    tries = typeof tries === "number" ? tries : 0;
    if (!document.querySelector(".synchro-timing")) return;
    if (typeof Chart === "undefined") {            /* CDN not ready yet — retry */
      if (tries < 30) setTimeout(function () { initAll(tries + 1); }, 120);
      return;
    }
    document.querySelectorAll(".synchro-timing").forEach(build);
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
