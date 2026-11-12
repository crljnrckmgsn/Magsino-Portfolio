/* Animations: scroll reveals, parallax, hero text reveal */
CJ.add(function () {
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  CJ.$$('[data-reveal]').forEach(function (el, i) { el.style.transitionDelay = (i % 3) * 80 + 'ms'; io.observe(el); });

  var para = CJ.$$('[data-parallax]');
  if (!CJ.reduce && para.length) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        para.forEach(function (p) { p.style.transform = 'translateY(' + window.scrollY * p.dataset.parallax + 'px)'; });
        ticking = false;
      });
    }, { passive: true });
  }

  CJ.onReady.push(function () {
    var el = CJ.$('#heroLead');
    if (CJ.reduce || !el) return;
    var words = el.textContent.split(' ');
    el.setAttribute('aria-label', words.join(' '));
    el.innerHTML = words.map(function (w, i) { return '<span class="word" aria-hidden="true" style="animation-delay:' + (0.5 + i * 0.04) + 's">' + w + '</span>'; }).join(' ');
  });
});
