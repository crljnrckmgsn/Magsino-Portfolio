/* Projects page: category filtering */
CJ.add(function () {
  var btns = CJ.$$('.filters button'), cards = CJ.$$('.project[data-cat]');
  if (!btns.length) return;
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.dataset.filter;
      btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      cards.forEach(function (c) { c.hidden = !(f === 'all' || c.dataset.cat.split(' ').indexOf(f) > -1); });
      var n = cards.filter(function (c) { return !c.hidden; }).length;
      CJ.$('#filterStatus').textContent = 'Showing ' + n + ' project' + (n === 1 ? '' : 's');
    });
  });
});
