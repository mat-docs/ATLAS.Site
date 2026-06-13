/* Interactive "GetLapStatistics" explainer for the Parameter Data Access page.
 * Drop <div class="pda-lap-stats"></div> into the Markdown; this builds the
 * controls, canvas and Chart.js chart inside it.
 *
 * Shows a parameter trace across several laps, with the per-lap statistics
 * (Min / Max / Mean / Standard deviation) that GetLapStatistics returns drawn
 * over each lap, plus a live results table mirroring IParameterDataStatistics.
 *
 * Theme-aware (Material palette) and safe under Material's instant navigation. */
(function () {
  "use strict";

  var LAP_COUNT = 5;
  var LAP_DUR = 90;     // seconds per lap
  var COL = { min: "#378ADD", max: "#D85A30", mean: "#1D9E75", std: "#1D9E75", trend: "#BA7517" };

  var PARAMS = {
    vCar: {
      label: "vCar", unit: "km/h", color: "#D85A30",
      gen: function (ph, lap, k) {
        var v = 220 + 70 * Math.sin(2 * Math.PI * ph) + 28 * Math.sin(2 * Math.PI * 3 * ph + 1)
                    + 14 * Math.sin(2 * Math.PI * 7 * ph) + lap * 4 + 5 * Math.sin(k * 12.9898);
        return Math.max(70, +v.toFixed(1));
      }
    },
    rThrottle: {
      label: "rThrottle", unit: "%", color: "#1D9E75",
      gen: function (ph, lap, k) {
        var r = 60 + 55 * Math.sin(2 * Math.PI * ph) + 25 * Math.sin(2 * Math.PI * 3 * ph)
                   + 4 * Math.sin(k * 7.13);
        return Math.max(0, Math.min(100, +r.toFixed(1)));
      }
    },
    nEngine: {
      label: "nEngine", unit: "rpm", color: "#7E57C2",
      gen: function (ph, lap, k) {
        var n = 11500 + 2600 * Math.sin(2 * Math.PI * ph) + 1100 * Math.sin(2 * Math.PI * 3 * ph + 0.7)
                     + lap * 60 + 120 * Math.sin(k * 4.7);
        return Math.max(7000, Math.min(15500, Math.round(n)));
      }
    }
  };
  var registry = [];

  function isDark() {
    return document.body.getAttribute("data-md-color-scheme") === "slate";
  }
  function palette() {
    var d = isDark();
    return {
      grid: d ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.10)",
      tick: d ? "rgba(255,255,255,.62)" : "rgba(0,0,0,.55)",
      lapA: d ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.025)",
      lapB: d ? "rgba(255,255,255,.00)" : "rgba(0,0,0,.00)",
      lapLabel: d ? "rgba(255,255,255,.45)" : "rgba(0,0,0,.40)"
    };
  }

  function buildSeries(key) {
    var p = PARAMS[key];
    var points = [], laps = [];
    for (var L = 0; L < LAP_COUNT; L++) {
      var ys = [], start = L * LAP_DUR, minV = Infinity, maxV = -Infinity, minT = start, maxT = start, sum = 0, sum2 = 0;
      for (var s = 0; s < LAP_DUR; s++) {
        var k = L * LAP_DUR + s, t = k, ph = s / LAP_DUR;
        var y = p.gen(ph, L, k);
        points.push({ x: t, y: y });
        ys.push(y);
        if (y < minV) { minV = y; minT = t; }
        if (y > maxV) { maxV = y; maxT = t; }
        sum += y; sum2 += y * y;
      }
      var n = ys.length, mean = sum / n, std = Math.sqrt(Math.max(0, sum2 / n - mean * mean));
      var startVal = ys[0], endVal = ys[n - 1], delta = endVal - startVal;
      // linear regression over X = sample number (1..n), Y = value
      var mx = (n + 1) / 2, sxy = 0, sxx = 0, syy = 0, absSum = 0, lnSum = 0, allPos = true;
      for (var j = 0; j < n; j++) {
        var dx = (j + 1) - mx, dy = ys[j] - mean;
        sxy += dx * dy; sxx += dx * dx; syy += dy * dy;
        absSum += Math.abs(ys[j]);
        if (ys[j] > 0) lnSum += Math.log(ys[j]); else allPos = false;
      }
      var slope = sxx ? sxy / sxx : 0;
      var intercept = mean - slope * mx;
      var r2 = (sxx && syy) ? (sxy * sxy) / (sxx * syy) : 0;
      laps.push({
        name: "Lap " + (L + 1), start: start, end: start + LAP_DUR - 1,
        min: minV, max: maxV, mean: mean, std: std, n: n, minT: minT, maxT: maxT,
        startVal: startVal, endVal: endVal, delta: delta,
        absMean: absSum / n, geoMean: allPos ? Math.exp(lnSum / n) : NaN,
        slope: slope, intercept: intercept, r2: r2
      });
    }
    return { points: points, laps: laps, unit: p.unit, color: p.color };
  }

  /* Plugin: lap shading + labels (under the trace) and the std band. */
  var lapBg = {
    id: "lapBg",
    beforeDatasetsDraw: function (chart) {
      var d = chart.$lap; if (!d) return;
      var ctx = chart.ctx, area = chart.chartArea, xs = chart.scales.x, ys = chart.scales.y;
      var pal = palette();
      ctx.save();
      d.laps.forEach(function (lap, i) {
        var x0 = xs.getPixelForValue(lap.start), x1 = xs.getPixelForValue(lap.end);
        ctx.fillStyle = i % 2 ? pal.lapB : pal.lapA;
        ctx.fillRect(x0, area.top, x1 - x0, area.bottom - area.top);
        if (d.show.std) {
          ctx.fillStyle = "rgba(29,158,117,.13)";
          var yTop = ys.getPixelForValue(lap.mean + lap.std), yBot = ys.getPixelForValue(lap.mean - lap.std);
          ctx.fillRect(x0, yTop, x1 - x0, yBot - yTop);
        }
        ctx.fillStyle = pal.lapLabel;
        ctx.font = "600 11px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(lap.name, (x0 + x1) / 2, area.top + 13);
      });
      ctx.restore();
    }
  };

  /* Plugin: per-lap stat lines + markers (over the trace). */
  var lapStats = {
    id: "lapStats",
    afterDatasetsDraw: function (chart) {
      var d = chart.$lap; if (!d) return;
      var ctx = chart.ctx, xs = chart.scales.x, ys = chart.scales.y;
      ctx.save();
      d.laps.forEach(function (lap) {
        var x0 = xs.getPixelForValue(lap.start), x1 = xs.getPixelForValue(lap.end);
        function hline(val, color, dash) {
          var y = ys.getPixelForValue(val);
          ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.setLineDash(dash || []);
          ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
        }
        function dot(t, val, color) {
          ctx.fillStyle = color; ctx.setLineDash([]);
          ctx.beginPath(); ctx.arc(xs.getPixelForValue(t), ys.getPixelForValue(val), 3.5, 0, 2 * Math.PI); ctx.fill();
        }
        if (d.show.mean) hline(lap.mean, COL.mean);
        if (d.show.max) { hline(lap.max, COL.max, [5, 4]); dot(lap.maxT, lap.max, COL.max); }
        if (d.show.min) { hline(lap.min, COL.min, [5, 4]); dot(lap.minT, lap.min, COL.min); }
        if (d.show.trend) {
          ctx.strokeStyle = COL.trend; ctx.lineWidth = 2.5; ctx.setLineDash([]);
          ctx.beginPath();
          ctx.moveTo(x0, ys.getPixelForValue(lap.intercept + lap.slope * 1));
          ctx.lineTo(x1, ys.getPixelForValue(lap.intercept + lap.slope * lap.n));
          ctx.stroke();
        }
      });
      ctx.restore();
    }
  };

  function build(root) {
    if (root.dataset.lsInit || typeof Chart === "undefined") return;
    root.dataset.lsInit = "1";

    var fgl = "var(--md-default-fg-color--light)";
    var bd = "var(--md-default-fg-color--lightest)";
    var surf = "var(--md-code-bg-color)";

    var paramBtns = Object.keys(PARAMS).map(function (k) {
      return '<button class="ls-param" data-k="' + k + '" style="border:1px solid ' + bd +
        ';background:transparent;border-radius:.3rem;padding:.3rem .8rem;cursor:pointer;font:inherit;font-size:.8rem;color:' + fgl + ';">' +
        PARAMS[k].label + '</button>';
    }).join("");

    function chip(stat, label, color, on) {
      return '<label style="display:flex;align-items:center;gap:6px;font-size:.8rem;padding:3px 10px;border:1px solid ' + bd +
        ';border-radius:.3rem;cursor:pointer;color:' + fgl + ';">' +
        '<input type="checkbox" class="ls-stat" data-s="' + stat + '"' + (on ? " checked" : "") + '>' +
        '<span style="width:12px;height:12px;border-radius:3px;background:' + color + ';"></span>' + label + '</label>';
    }

    root.innerHTML =
      '<div style="display:flex;flex-wrap:wrap;gap:8px 10px;align-items:center;margin:0 0 .7rem;">' +
        '<span style="font-size:.8rem;color:' + fgl + ';">Parameter:</span>' + paramBtns + '</div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:8px 12px;margin:0 0 1rem;">' +
        chip("mean", "Mean", COL.mean, true) + chip("max", "Max", COL.max, true) +
        chip("min", "Min", COL.min, true) + chip("std", "Std Dev (±σ)", COL.std, false) +
        chip("trend", "Trend (slope)", COL.trend, false) + '</div>' +
      '<div style="position:relative;width:100%;height:330px;">' +
        '<canvas class="ls-canvas" role="img" aria-label="A parameter trace across five laps with per-lap minimum, maximum, mean and standard-deviation statistics overlaid on each lap.">Per-lap statistics over a multi-lap session.</canvas>' +
      '</div>' +
      '<div class="ls-table" style="margin-top:1rem;overflow-x:auto;"></div>';

    var key = "vCar";
    var show = { mean: true, max: true, min: true, std: false, trend: false };
    var pal = palette();
    var series = buildSeries(key);

    var chart = new Chart(root.querySelector(".ls-canvas"), {
      type: "scatter",
      data: { datasets: [{
        label: PARAMS[key].label, data: series.points, borderColor: series.color,
        backgroundColor: series.color, borderWidth: 1.5, pointRadius: 0, showLine: true
      }] },
      options: {
        responsive: true, maintainAspectRatio: false, animation: { duration: 200 },
        interaction: { mode: "nearest", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: function (c) {
            return PARAMS[key].label + ": " + c.parsed.y.toFixed(1) + " " + series.unit + " @ " + c.parsed.x + "s";
          } } }
        },
        scales: {
          x: { type: "linear", title: { display: true, text: "time (s)", color: pal.tick }, grid: { color: pal.grid }, ticks: { color: pal.tick }, min: 0, max: LAP_COUNT * LAP_DUR },
          y: { title: { display: true, text: PARAMS[key].label + " (" + series.unit + ")", color: pal.tick }, grid: { color: pal.grid }, ticks: { color: pal.tick } }
        }
      },
      plugins: [lapBg, lapStats]
    });

    function table() {
      function c(v, color) {
        return "<td style='padding:.3rem .55rem;text-align:right;white-space:nowrap;" +
          (color ? "color:" + color + ";" : "") + "'>" + v + "</td>";
      }
      var rows = series.laps.map(function (l) {
        return "<tr>" +
          "<td style='padding:.3rem .55rem;'>" + l.name + "</td>" +
          c(l.startVal.toFixed(1)) + c(l.endVal.toFixed(1)) +
          c(l.min.toFixed(1), COL.min) + c(l.max.toFixed(1), COL.max) +
          c(l.mean.toFixed(1), COL.mean) + c(l.std.toFixed(2)) +
          c(isNaN(l.geoMean) ? "&mdash;" : l.geoMean.toFixed(1)) +
          c((l.delta >= 0 ? "+" : "") + l.delta.toFixed(1)) +
          c(l.slope.toFixed(3), COL.trend) + c(l.r2.toFixed(3)) +
          c(l.n) + "</tr>";
      }).join("");
      var heads = ["Lap", "StartValue", "EndValue", "MinimumValue", "MaximumValue",
        "MeanValue", "StandardDeviation", "GeometricMeanValue", "DeltaValue",
        "RegressionSlope", "RegressionR\u00B2", "NumberOfSamples"];
      var thead = "<thead><tr>" + heads.map(function (h, i) {
        return "<th style='padding:.4rem .55rem;text-align:" + (i === 0 ? "left" : "right") +
          ";white-space:nowrap;'>" + h + "</th>";
      }).join("") + "</tr></thead>";
      root.querySelector(".ls-table").innerHTML =
        "<table style='border-collapse:collapse;width:100%;font-size:.76rem;background:" + surf +
        ";border-radius:.3rem;'>" + thead + "<tbody>" + rows + "</tbody></table>";
    }

    function refresh() {
      series = buildSeries(key);
      chart.data.datasets[0].data = series.points;
      chart.data.datasets[0].label = PARAMS[key].label;
      chart.data.datasets[0].borderColor = series.color;
      chart.data.datasets[0].backgroundColor = series.color;
      chart.options.scales.y.title.text = PARAMS[key].label + " (" + series.unit + ")";
      chart.$lap = { laps: series.laps, show: show };
      chart.update();
      table();
      root.querySelectorAll(".ls-param").forEach(function (b) {
        var on = b.dataset.k === key;
        b.style.background = on ? PARAMS[key].color : "transparent";
        b.style.color = on ? "#fff" : "var(--md-default-fg-color--light)";
      });
    }

    root.querySelectorAll(".ls-param").forEach(function (b) {
      b.addEventListener("click", function () { key = b.dataset.k; refresh(); });
    });
    root.querySelectorAll(".ls-stat").forEach(function (c) {
      c.addEventListener("change", function (e) { show[e.target.dataset.s] = e.target.checked; chart.$lap = { laps: series.laps, show: show }; chart.update(); });
    });
    refresh();

    registry.push({
      canvas: root.querySelector(".ls-canvas"),
      apply: function () {
        var p = palette();
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
    if (!document.querySelector(".pda-lap-stats")) return;
    if (typeof Chart === "undefined") {            /* CDN not ready yet — retry */
      if (tries < 30) setTimeout(function () { initAll(tries + 1); }, 120);
      return;
    }
    document.querySelectorAll(".pda-lap-stats").forEach(build);
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
