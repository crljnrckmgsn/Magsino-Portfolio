/* Intro loading screen (home page). Progress follows real asset loading, with fallback. */
CJ.add(function () {
  var loader = CJ.$('#loader'); if (!loader) return;
  var fill = CJ.$('#loaderFill'), pct = CJ.$('#loaderPct'), msg = CJ.$('#loaderMsg'), toggle = CJ.$('#soundToggle');
  var messages = ['Preparing something nice...', 'Tidying up the files...', 'Almost ready...'];
  var progress = 0, finished = false, assetsReady = false, soundOn = false, ctx;
  var MIN = CJ.reduce ? 300 : 2200, MAX = 6000, start = performance.now();

  function blip(f, d) {  /* optional sound, off by default */
    if (!soundOn) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = f; g.gain.value = 0.04;
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + d);
      o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + d);
    } catch (e) {}
  }
  toggle.addEventListener('click', function () {
    soundOn = !soundOn;
    toggle.setAttribute('aria-pressed', soundOn);
    toggle.textContent = 'Sound: ' + (soundOn ? 'on' : 'off');
    toggle.setAttribute('aria-label', soundOn ? 'Turn loading sound off' : 'Turn loading sound on');
    blip(660, 0.08);
  });
  function setProgress(v) {
    progress = Math.max(progress, Math.min(v, 100));
    fill.style.width = progress + '%'; pct.textContent = Math.round(progress) + '%';
    msg.textContent = messages[progress > 85 ? 2 : progress > 45 ? 1 : 0];
  }
  Promise.all([
    new Promise(function (r) { if (document.readyState === 'complete') r(); else window.addEventListener('load', r, { once: true }); }),
    document.fonts ? document.fonts.ready : 0
  ]).then(function () { assetsReady = true; });

  var timer = setInterval(function () {
    var t = performance.now() - start;
    setProgress(Math.min(t / MIN * 90, assetsReady ? 100 : 90));
    if ((assetsReady && t >= MIN) || t >= MAX) finish();
  }, 120);
  function finish() {
    if (finished) return; finished = true;
    clearInterval(timer); setProgress(100); blip(784, 0.15);
    setTimeout(function () {
      loader.classList.add('is-done'); CJ.ready();
      setTimeout(function () { loader.remove(); }, 1000);
    }, 350);
  }
});
