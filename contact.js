/* Contact page: validation, then opens the visitor's email app with the message prefilled */
CJ.add(function () {
  var form = CJ.$('#contactForm'); if (!form) return;
  var status = CJ.$('#formStatus'), EMAIL = 'carlmagzino@gmail.com';
  var rules = {
    name: function (v) { return v.trim().length >= 2 ? '' : 'Please enter your name.'; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.'; },
    message: function (v) { return v.trim().length >= 10 ? '' : 'Please write at least 10 characters.'; }
  };
  function check(field) {
    var msg = rules[field.name](field.value);
    field.setAttribute('aria-invalid', !!msg);
    CJ.$('#err-' + field.name).textContent = msg;
    return !msg;
  }
  CJ.$$('input,textarea', form).forEach(function (f) { f.addEventListener('blur', function () { check(f); }); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fields = CJ.$$('input,textarea', form), ok = fields.map(check).every(Boolean);
    if (!ok) { status.textContent = 'Please fix the highlighted fields.'; fields.filter(function (f) { return f.getAttribute('aria-invalid') === 'true'; })[0].focus(); return; }
    var v = {}; fields.forEach(function (f) { v[f.name] = f.value.trim(); });
    var body = v.message + '\n\nFrom: ' + v.name + ' (' + v.email + ')';
    status.textContent = 'Opening your email app...';
    window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Portfolio message from ' + v.name) + '&body=' + encodeURIComponent(body);
  });
  var copy = CJ.$('#copyEmail');
  if (copy) copy.addEventListener('click', function () {
    var done = function () { status.textContent = 'Email address copied.'; };
    if (navigator.clipboard) navigator.clipboard.writeText(EMAIL).then(done, function () { status.textContent = EMAIL; });
    else status.textContent = EMAIL;
  });
});
