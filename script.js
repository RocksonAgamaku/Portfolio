(function () {
  'use strict';
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  var photos = Array.from(document.querySelectorAll('.photo-grid figure'));
  var current = 0;
  var trigger = null;
  var activeAlbum = [];

  function render() {
    var photo = activeAlbum[current];
    var image = photo.querySelector('img');
    lbImg.src = image.dataset.full || image.src;
    lbImg.alt = image.alt;
    document.getElementById('lb-caption').textContent = photo.querySelector('figcaption').textContent;
    document.getElementById('lb-count').textContent = (current + 1) + ' / ' + activeAlbum.length;
  }
  function step(delta) {
    current = (current + delta + activeAlbum.length) % activeAlbum.length;
    render();
  }
  if (typeof lb.showModal === 'function') {
    photos.forEach(function (photo) {
      var img = photo.querySelector('img');
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'photo-trigger';
      button.setAttribute('aria-label', 'View photo: ' + img.alt);
      button.setAttribute('aria-haspopup', 'dialog');
      img.before(button);
      button.appendChild(img);
      button.addEventListener('click', function () {
        activeAlbum = Array.from(photo.closest('.photo-grid').querySelectorAll('figure'));
        current = activeAlbum.indexOf(photo);
        trigger = button;
        render();
        lb.showModal();
        document.body.classList.add('gallery-open');
        document.getElementById('lb-close').focus();
      });
    });
  }
  document.querySelectorAll('.photo-grid').forEach(function (grid) {
    var figures = Array.from(grid.querySelectorAll('figure'));
    var limit = 6;
    if (figures.length <= limit) return;
    var sectionTitle = grid.closest('section').querySelector('h2').textContent;
    grid.id = grid.dataset.gallery + '-gallery';
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'button button-secondary gallery-toggle';
    button.setAttribute('aria-controls', grid.id);
    var status = document.createElement('span');
    status.className = 'gallery-status';
    status.setAttribute('aria-live', 'polite');
    var expanded = false;
    function update() {
      figures.forEach(function (f, index) { f.hidden = !expanded && index >= limit; });
      button.textContent = expanded ? 'Show selected photos ↑' : 'View all ' + figures.length + ' photos ↓';
      button.setAttribute('aria-expanded', String(expanded));
      button.setAttribute('aria-label', (expanded ? 'Show selected photos' : 'View all ' + figures.length + ' photos') + ': ' + sectionTitle);
      status.textContent = 'Showing ' + (expanded ? figures.length : limit) + ' of ' + figures.length + ' photos';
    }
    button.addEventListener('click', function () {
      expanded = !expanded;
      update();
      if (expanded) figures[limit].querySelector('button')?.focus({ preventScroll: true });
      else button.focus({ preventScroll: true });
    });
    grid.after(button, status);
    update();
  });
  document.getElementById('lb-close').addEventListener('click', function () { lb.close(); });
  document.getElementById('lb-prev').addEventListener('click', function () { step(-1); });
  document.getElementById('lb-next').addEventListener('click', function () { step(1); });
  lb.addEventListener('close', function () {
    document.body.classList.remove('gallery-open');
    lbImg.removeAttribute('src');
    if (trigger) trigger.focus({ preventScroll: true });
  });
  lb.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      step(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  lb.addEventListener('click', function (event) { if (event.target === lb) lb.close(); });

  var mobileNav = document.querySelector('.mobile-nav');
  var select = document.getElementById('section-select');
  mobileNav.hidden = false;
  document.body.classList.add('has-mobile-nav');
  select.addEventListener('change', function () {
    var target = document.querySelector(select.value);
    if (!target) return;
    target.scrollIntoView({ block: 'start' });
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    history.replaceState(null, '', select.value);
  });
  var links = Array.from(document.querySelectorAll('.section-nav a'));
  var category = { 'featured': '', 'aqua-monitor': '#aqua-monitor', 'graduation': '#aqua-monitor', 'nss-training': '#aqua-monitor', 'leadership': '#leadership', 'outreach': '#outreach', 'convening': '#convening', 'ventures': '#ventures', 'sice': '#sice', 'about': '#about' };
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          if (link.hash === category[entry.target.id]) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
        if (select.querySelector('option[value="#' + entry.target.id + '"]')) select.value = '#' + entry.target.id;
      });
    }, { rootMargin: '-95px 0px -55% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (section) { observer.observe(section); });
  }
})();
