/* Navigation: scrolled state and mobile menu */
CJ.add(function () {
  var nav = CJ.$('#nav'), links = CJ.$('#navLinks'), btn = CJ.$('#navToggle');
  if (!nav) return;
  function onScroll() { nav.classList.toggle('is-scrolled', window.scrollY > 30); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  function setMenu(open) {
    links.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open);
    btn.textContent = open ? 'Close' : 'Menu';
  }
  btn.addEventListener('click', function () { setMenu(!links.classList.contains('is-open')); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  CJ.$$('a', links).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
});
