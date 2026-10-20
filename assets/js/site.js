const year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();const toggle=document.querySelector(".menu-toggle");const nav=document.getElementById("nav-links");toggle?.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));toggle.textContent=open?"×":"+";toggle.setAttribute("aria-label",open?"Close navigation":"Open navigation")});nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle?.setAttribute("aria-expanded","false");if(toggle){toggle.textContent="+";toggle.setAttribute("aria-label","Open navigation")}}));document.addEventListener("keydown",e=>{if(e.key==="Escape"&&nav?.classList.contains("open")){nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");toggle.textContent="+";toggle.setAttribute("aria-label","Open navigation");toggle.focus()}});const carousel=document.querySelector(".photo-carousel");if(carousel){const slides=[...carousel.querySelectorAll(".photo-slide")];let index=0,paused=false,timer;const status=carousel.querySelector(".photo-status");function show(next,announce=true){index=(next+slides.length)%slides.length;slides.forEach((s,i)=>s.hidden=i!==index);if(announce&&status)status.textContent=`Photo ${index+1} of ${slides.length}`}function restart(){clearInterval(timer);timer=setInterval(()=>{if(!paused&&!document.hidden)show(index+1,false)},4500)}carousel.querySelectorAll(".photo-frame").forEach(b=>b.addEventListener("click",()=>{show(index+1);restart()}));carousel.addEventListener("keydown",e=>{if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();show(index+(e.key==="ArrowRight"?1:-1));restart()}});carousel.querySelector(".photo-prev")?.addEventListener("click",()=>{show(index-1);restart()});carousel.querySelector(".photo-next")?.addEventListener("click",()=>{show(index+1);restart()});const pause=carousel.querySelector(".photo-pause");function syncPause(){if(!pause)return;pause.innerHTML=paused?'<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M7 4v16l13-8Z"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>';pause.setAttribute("aria-label",paused?"Play slideshow":"Pause slideshow");pause.title=paused?"Play slideshow":"Pause slideshow"}syncPause();pause?.addEventListener("click",()=>{paused=!paused;pause.innerHTML=paused?'<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M7 4v16l13-8Z"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>';pause.setAttribute("aria-label",paused?"Play slideshow":"Pause slideshow");pause.title=paused?"Play slideshow":"Pause slideshow";restart()});restart()}
document.querySelectorAll('.matchplant-motion').forEach(video=>{video.muted=true;video.play().catch(()=>{})});

function revealResearchTarget(){if(!location.hash)return;let target=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(!target)return;let ancestor=target.parentElement;while(ancestor){if(ancestor.tagName==='DETAILS')ancestor.open=true;ancestor=ancestor.parentElement}requestAnimationFrame(()=>target.scrollIntoView({block:'start'}))}window.addEventListener('hashchange',revealResearchTarget);if(location.hash)revealResearchTarget();


// Keep category tabs at one compact size; scrolling only changes the active item.
document.querySelectorAll('.scale-nav,.software-scale-nav,.standard-section-nav').forEach(menu => {
 const links = [...menu.querySelectorAll('a[href^="#"]')];
 const header = document.querySelector('body > header');
 menu.classList.add('is-compact-section-nav');
 let pending = false;
 const headerHeight = () => header?.getBoundingClientRect().height || 74;
 function offsets() {
  const top = headerHeight();
  document.documentElement.style.setProperty('--section-menu-top',top+'px');
  const rootPadding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)||0;
  links.forEach(link => {
   const section = document.getElementById(link.hash.slice(1));
   if(section) section.style.scrollMarginTop = Math.max(0,top+menu.getBoundingClientRect().height+16-rootPadding)+'px';
  });
 }
 function refresh() {
  const top = headerHeight();
  offsets();
  let active=null;
  links.forEach(link=>{const target=document.getElementById(link.hash.slice(1));if(target&&target.getBoundingClientRect().top<=top+menu.getBoundingClientRect().height+24)active=link;});
  if(window.scrollY+innerHeight>=document.documentElement.scrollHeight-4)active=links.at(-1);
  links.forEach(link=>{if(link===active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
 }
 function schedule() { if(pending)return; pending=true; requestAnimationFrame(()=>{pending=false;refresh();}); }
 new ResizeObserver(()=>{offsets();schedule();}).observe(menu);
 if(header)new ResizeObserver(()=>{offsets();schedule();}).observe(header);
 window.addEventListener('scroll',schedule,{passive:true});
 window.addEventListener('resize',schedule);
 window.addEventListener('hashchange',schedule);
 window.addEventListener('load',schedule);
 menu.closest('main')?.addEventListener('load',schedule,true);
 document.fonts?.ready.then(schedule);
 refresh();
});
