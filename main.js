/* Core: shared helpers, module registry, ready state. Load this first. */
(function () {
  'use strict';
  var CJ = window.CJ = { modules: [], onReady: [], isReady: false };
  CJ.$ = function (s, c) { return (c || document).querySelector(s); };
  CJ.$$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  CJ.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  CJ.add = function (fn) { CJ.modules.push(fn); };
  /* Reveals the page: called by the loader (home) or immediately (other pages) */
  CJ.ready = function () {
    if (CJ.isReady) return; CJ.isReady = true;
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-ready');
    CJ.onReady.forEach(function (fn) { fn(); });
  };
  document.addEventListener('DOMContentLoaded', function () {
    CJ.modules.forEach(function (fn) { fn(); });
    if (!CJ.$('#loader')) CJ.ready();
  });
})();
