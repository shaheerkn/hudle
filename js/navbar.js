(function () {
  var toggle = document.querySelector('.navbar__toggle');
  var nav = document.querySelector('.navbar__nav');
  var dropdownItems = document.querySelectorAll('.navbar__item--dropdown');

  if (!toggle || !nav) return;

  var mobileQuery = window.matchMedia('(max-width: 992px)');

  function isMobile() {
    return mobileQuery.matches;
  }

  function closeAllDropdowns() {
    dropdownItems.forEach(function (item) {
      item.classList.remove('is-open');
      var trigger = item.querySelector('.navbar__link--dropdown');
      if (trigger) {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function setDropdownOpen(item, open) {
    var trigger = item.querySelector('.navbar__link--dropdown');
    if (!trigger) return;

    if (open) {
      dropdownItems.forEach(function (other) {
        if (other === item) return;
        other.classList.remove('is-open');
        var otherTrigger = other.querySelector('.navbar__link--dropdown');
        if (otherTrigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });
    }

    item.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  toggle.addEventListener('click', function () {
    this.classList.toggle('active');
    nav.classList.toggle('active');

    if (!nav.classList.contains('active')) {
      closeAllDropdowns();
    }
  });

  dropdownItems.forEach(function (item) {
    var trigger = item.querySelector('.navbar__link--dropdown');
    var megamenu = item.querySelector('.megamenu');

    if (!trigger) return;

    trigger.addEventListener('click', function (event) {
      if (!isMobile()) return;

      event.preventDefault();
      event.stopPropagation();
      setDropdownOpen(item, !item.classList.contains('is-open'));
    });

    if (megamenu) {
      megamenu.addEventListener('click', function (event) {
        event.stopPropagation();
      });
    }
  });

  document.addEventListener('click', function (event) {
    var openItem = document.querySelector('.navbar__item--dropdown.is-open');
    if (!openItem) return;
    if (openItem.contains(event.target)) return;
    closeAllDropdowns();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeAllDropdowns();
    }
  });

  mobileQuery.addEventListener('change', function () {
    closeAllDropdowns();
  });
})();
