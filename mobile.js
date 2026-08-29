(function(){
  function fitConstellation(){
    var plot=document.getElementById('careerPlot');
    if(!plot||!window.Plotly||window.innerWidth>760||!plot.classList.contains('constellation-wide'))return;
    plot.style.width='100%'; plot.style.minWidth='0';
    Plotly.relayout(plot,{width:Math.max(300,plot.parentElement.clientWidth),height:540,'margin.l':12,'margin.r':12,'margin.t':80,'margin.b':35});
  }
  function initMobile(){
    var nav=document.querySelector('.nav'),links=nav&&nav.querySelector('span');
    if(nav&&links&&!document.getElementById('mobileMenuButton')){var b=document.createElement('button');b.id='mobileMenuButton';b.className='mobile-menu-button';b.textContent='Menu';b.setAttribute('aria-expanded','false');nav.insertBefore(b,links);b.onclick=function(){var open=links.classList.toggle('mobile-open');b.textContent=open?'Close':'Menu';b.setAttribute('aria-expanded',String(open));};links.querySelectorAll('a').forEach(function(a){a.onclick=function(){links.classList.remove('mobile-open');b.textContent='Menu';b.setAttribute('aria-expanded','false');};});}
    var scroll=document.querySelector('.career-plot-scroll');if(scroll&&!document.querySelector('.mobile-chart-hint')){var p=document.createElement('p');p.className='mobile-chart-hint';p.textContent='Tap a constellation point for course details. On heatmaps, swipe horizontally to see every semester.';scroll.parentNode.insertBefore(p,scroll);}
    setTimeout(fitConstellation,400);
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',initMobile):initMobile();
  document.addEventListener('click',function(e){if(e.target.closest('.viz-tab,.cluster-focus'))setTimeout(fitConstellation,300)});
  var timer;window.addEventListener('resize',function(){clearTimeout(timer);timer=setTimeout(fitConstellation,200)});
})();
