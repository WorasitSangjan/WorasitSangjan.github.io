(() => {
 const carousel = document.querySelector('.home-page .photo-carousel');
 const bio = document.querySelector('.home-page .bio');
 const grid = document.querySelector('.home-page .hero-grid');
 if (!carousel || !bio || !grid) return;
 const phone = window.matchMedia('(max-width:760px)');
 function arrange() {
  if (phone.matches) bio.insertBefore(carousel, bio.querySelector('.lead'));
  else grid.appendChild(carousel);
 }
 arrange();
 phone.addEventListener('change', arrange);
})();
