/* Coverage heatmap progress update. No other portal behavior is changed. */
(function () {
  function ready() {
    return window.Plotly && document.getElementById('careerPlot') &&
      typeof activeCareerData === 'function' && typeof st === 'function' &&
      typeof fmt === 'function' && typeof visualConfig === 'function';
  }

  function coverageDetail(cluster, plan, termIndex) {
    const completed = cluster.courses.filter(code => st(code) === 'complete');
    const inProgress = cluster.courses.filter(code => st(code) === 'progress');
    const plannedThroughTerm = [];
    const newThisTerm = [];

    for (let i = 0; i <= termIndex; i += 1) {
      (plan[i]?.pick || []).forEach(course => {
        const code = course.code;
        if (
          cluster.courses.includes(code) &&
          !completed.includes(code) &&
          !inProgress.includes(code) &&
          !plannedThroughTerm.includes(code)
        ) {
          plannedThroughTerm.push(code);
          if (i === termIndex) newThisTerm.push(code);
        }
      });
    }

    const weightedTotal = completed.length + (0.75 * inProgress.length) +
      (0.50 * plannedThroughTerm.length);
    const percentage = cluster.courses.length
      ? Math.round((weightedTotal / cluster.courses.length) * 100)
      : 0;

    const currentCell = `${percentage}%<br><span style="font-size:10px">` +
      `✓ ${completed.length} complete<br>◐ ${inProgress.length} active</span>`;
    const futureCell = `${percentage}%<br><span style="font-size:10px;color:#765600">` +
      `${newThisTerm.length ? newThisTerm.map(code => `▲ ${fmt(code)}`).join('<br>') : 'No new planned course'}` +
      `</span>`;

    const termLabel = termIndex < 0 ? 'Current' : `${plan[termIndex].term} ${plan[termIndex].year}`;
    const list = values => values.length ? values.map(fmt).join(', ') : 'None';

    return {
      percentage,
      cell: termIndex < 0 ? currentCell : futureCell,
      hover:
        `<b>${cluster.title}</b><br>${termLabel}<br>` +
        `<b>Coverage: ${percentage}%</b><br><br>` +
        `Completed (1.00 each): ${list(completed)}<br>` +
        `In progress (0.75 each): ${list(inProgress)}<br>` +
        `Planned through this term (0.50 each): ${list(plannedThroughTerm)}<br>` +
        `Newly planned in this term: ${list(newThisTerm)}<br><br>` +
        `All aligned courses: ${cluster.courses.map(fmt).join(', ')}`
    };
  }

  function updatedRenderCoverage() {
    const clusters = activeCareerData();
    const plan = (window.last || last || []).filter(term => term.pick.length);
    const semesters = ['Current', ...plan.map(term => `${term.term} ${term.year}`)];
    const details = clusters.map(cluster => [
      coverageDetail(cluster, plan, -1),
      ...plan.map((term, index) => coverageDetail(cluster, plan, index))
    ]);
    const z = details.map(row => row.map(item => item.percentage));
    const text = details.map(row => row.map(item => item.cell));
    const hover = details.map(row => row.map(item => item.hover));
    const mobile = window.innerWidth < 761;
    const cellWidth = mobile ? 142 : 150;
    const chartWidth = Math.max(mobile ? 1080 : 1220, 360 + semesters.length * cellWidth);
    const plot = document.getElementById('careerPlot');

    if (window.constellationLegend) constellationLegend.style.display = 'none';
    plot.classList.remove('constellation-wide');
    plot.classList.add('heatmap-wide');
    plot.style.width = `${chartWidth}px`;

    Plotly.purge(plot);
    Plotly.newPlot(plot, [{
      type: 'heatmap',
      x: semesters,
      y: clusters.map(cluster => cluster.title),
      z,
      text,
      texttemplate: '%{text}',
      textfont: { size: 13, color: '#33444e' },
      customdata: hover,
      hovertemplate: '%{customdata}<extra></extra>',
      zmin: 0,
      zmax: 100,
      colorscale: [[0, '#e7f1f5'], [.35, '#d7ecef'], [.65, '#f2d977'], [.82, '#aebd69'], [1, '#27875c']],
      colorbar: { title: { text: 'Coverage %', side: 'top' }, len: .82, thickness: 30, x: 1.018 }
    }], {
      width: chartWidth,
      height: mobile ? 650 : 730,
      margin: { l: mobile ? 260 : 320, r: mobile ? 95 : 115, t: 55, b: 110, pad: 8 },
      xaxis: { side: 'bottom', tickangle: 0, automargin: true, tickfont: { size: 12 }, ticklen: 7, fixedrange: true },
      yaxis: { automargin: true, tickfont: { size: 12 }, fixedrange: true },
      font: { family: 'system-ui', size: 12, color: '#263d4d' },
      paper_bgcolor: '#fff',
      plot_bgcolor: '#fff'
    }, visualConfig());

    if (window.careerPlotScroll) careerPlotScroll.scrollLeft = 0;
    if (window.plotDetail) {
      plotDetail.innerHTML = '<strong>Coverage heatmap:</strong> Current cells show completed and active course counts. Future cells show the newly planned courses driving each percentage. Hover for complete course lists and the weighted calculation.';
    }
  }

  function install() {
    if (!ready()) return false;
    window.renderCoverage = updatedRenderCoverage;
    try { renderCoverage = updatedRenderCoverage; } catch (error) {}
    if (window.visualSelect?.value === 'coverage') updatedRenderCoverage();
    return true;
  }

  if (!install()) {
    let attempts = 0;
    const timer = setInterval(() => {
      attempts += 1;
      if (install() || attempts > 100) clearInterval(timer);
    }, 100);
  }
})();
