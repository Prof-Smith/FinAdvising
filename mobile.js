(function(){
  function initMobile(){
    var nav=document.querySelector('.nav');
    var links=nav&&nav.querySelector('span');
    if(nav&&links&&!document.getElementById('mobileMenuButton')){
      var b=document.createElement('button'); b.id='mobileMenuButton'; b.className='mobile-menu-button'; b.textContent='Menu'; b.setAttribute('aria-expanded','false'); b.setAttribute('aria-label','Open navigation');
      nav.insertBefore(b,links);
      b.addEventListener('click',function(){var open=links.classList.toggle('mobile-open');b.textContent=open?'Close':'Menu';b.setAttribute('aria-expanded',String(open));});
      links.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){links.classList.remove('mobile-open');b.textContent='Menu';b.setAttribute('aria-expanded','false');});});
    }
    var scroll=document.querySelector('.career-plot-scroll');
    if(scroll&&!document.querySelector('.mobile-chart-hint')){var p=document.createElement('p');p.className='mobile-chart-hint';p.textContent='Swipe horizontally to explore the full chart. Tap a point or heatmap cell for details.';scroll.parentNode.insertBefore(p,scroll);}
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',initMobile):initMobile();
  var timer; window.addEventListener('resize',function(){clearTimeout(timer);timer=setTimeout(function(){if(window.Plotly&&document.getElementById('careerPlot'))Plotly.Plots.resize('careerPlot');},180);});
})();
