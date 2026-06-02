(function () {
  var toggle = document.querySelector('.navbar__toggle');
  var nav = document.querySelector('.navbar__nav');
  var navbar = document.querySelector('.navbar');
  var megamenu = document.getElementById('navbar-megamenu');
  var megamenuSlot = document.getElementById('navbar-megamenu-slot');
  var dropdownItems = document.querySelectorAll('.navbar__item--dropdown');
  var navList = document.querySelector('.navbar__list');
  var track = megamenu ? megamenu.querySelector('[data-megamenu-track]') : null;
  var menuContents = megamenu
    ? megamenu.querySelectorAll('[data-megamenu-content]')
    : [];

  if (!toggle || !nav || !navbar || !megamenu || !megamenuSlot || !navList || !track) return;

  var mobileQuery = window.matchMedia('(max-width: 992px)');
  var closeTimer = null;
  var SCROLL_DURATION = 1100;
  var SCROLL_TRANSITION =
    'transform ' + SCROLL_DURATION + 'ms cubic-bezier(0.45, 0.05, 0.55, 0.95)';
  var MENU_ORDER = ['product', 'solutions', 'resources'];
  var activeMenuId = null;
  var activeItem = null;
  var scrollTick = 0;

  function getMenuIndex(menuId) {
    return MENU_ORDER.indexOf(menuId);
  }

  function isMobile() {
    return mobileQuery.matches;
  }

  function setActiveTrigger(item) {
    dropdownItems.forEach(function (dropdownItem) {
      var trigger = dropdownItem.querySelector('[data-megamenu]');
      var isActive = dropdownItem === item;

      dropdownItem.classList.toggle('is-open', isActive);
      if (trigger) {
        trigger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      }
    });
  }

  function updateContentAccessibility(index) {
    menuContents.forEach(function (content, i) {
      content.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });
  }

  function getViewport() {
    return megamenu.querySelector('.megamenu__viewport');
  }

  function scrollToMenu(menuId, animate) {
    var index = getMenuIndex(menuId);
    if (index < 0) return;

    var viewport = getViewport();
    var slideWidth = viewport ? viewport.getBoundingClientRect().width : 0;
    var offset = index * slideWidth;
    var transform = 'translate3d(-' + offset + 'px, 0, 0)';

    updateContentAccessibility(index);
    activeMenuId = menuId;

    if (!animate || isMobile()) {
      track.style.transition = 'none';
      track.style.transform = transform;
      void track.offsetWidth;
      track.style.removeProperty('transition');
      return;
    }

    var tick = ++scrollTick;
    track.style.transition = SCROLL_TRANSITION;

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        if (tick !== scrollTick) return;
        track.style.transform = transform;
      });
    });
  }

  function resetMegamenuPosition() {
    if (megamenu.parentElement !== megamenuSlot) {
      megamenuSlot.appendChild(megamenu);
    }
  }

  function positionMegamenu(item) {
    if (!isMobile()) {
      resetMegamenuPosition();
      return;
    }

    if (!item) {
      resetMegamenuPosition();
      return;
    }

    if (megamenu.previousElementSibling !== item) {
      item.after(megamenu);
    }
  }

  function openMegamenu(menuId, item) {
    clearTimeout(closeTimer);

    var animate =
      !isMobile() &&
      navbar.classList.contains('navbar--megamenu-open') &&
      activeMenuId !== null &&
      getMenuIndex(menuId) !== getMenuIndex(activeMenuId);

    scrollToMenu(menuId, animate);
    setActiveTrigger(item);
    activeItem = item;
    positionMegamenu(item);
    navbar.classList.add('navbar--megamenu-open');
    megamenu.setAttribute('aria-hidden', 'false');
  }

  function closeMegamenu() {
    clearTimeout(closeTimer);
    navbar.classList.remove('navbar--megamenu-open');
    megamenu.setAttribute('aria-hidden', 'true');
    setActiveTrigger(null);
    activeItem = null;
    scrollToMenu('product', false);
    resetMegamenuPosition();
  }

  function scheduleClose() {
    clearTimeout(closeTimer);
    closeMegamenu();
  }

  function isMegamenuHotZone(element) {
    if (!element) return false;

    return !!(
      element.closest('.navbar__list') ||
      element.closest('#navbar-megamenu') ||
      element.closest('#navbar-megamenu-slot')
    );
  }

  function cancelScheduledClose() {
    clearTimeout(closeTimer);
  }

  function handlePointerLeaveHotZone(event) {
    if (isMobile()) return;
    if (isMegamenuHotZone(event.relatedTarget)) return;
    scheduleClose();
  }

  scrollToMenu('product', false);

  toggle.addEventListener('click', function () {
    this.classList.toggle('active');
    nav.classList.toggle('active');

    if (!nav.classList.contains('active')) {
      closeMegamenu();
    }
  });

  dropdownItems.forEach(function (item) {
    var trigger = item.querySelector('[data-megamenu]');

    if (!trigger) return;

    var menuId = trigger.dataset.megamenu;

    item.addEventListener('mouseenter', function () {
      if (isMobile()) return;
      openMegamenu(menuId, item);
    });

    trigger.addEventListener('click', function (event) {
      if (!isMobile()) return;

      event.preventDefault();
      event.stopPropagation();

      if (activeMenuId === menuId && item.classList.contains('is-open')) {
        closeMegamenu();
        return;
      }

      openMegamenu(menuId, item);
    });

    trigger.addEventListener('focus', function () {
      if (isMobile()) return;
      openMegamenu(menuId, item);
    });
  });

  navList.addEventListener('mouseenter', function () {
    if (isMobile()) return;
    cancelScheduledClose();
  });

  navList.addEventListener('mouseleave', handlePointerLeaveHotZone);

  megamenuSlot.addEventListener('mouseenter', function () {
    if (isMobile()) return;
    cancelScheduledClose();
  });

  megamenuSlot.addEventListener('mouseleave', handlePointerLeaveHotZone);

  megamenu.addEventListener('mouseenter', function () {
    if (isMobile()) return;
    cancelScheduledClose();
  });

  megamenu.addEventListener('mouseleave', handlePointerLeaveHotZone);

  megamenu.addEventListener('click', function (event) {
    event.stopPropagation();
  });

  var closeTargets = [
    document.querySelector('.navbar__logo'),
    document.querySelector('.navbar__actions'),
    document.querySelector('.navbar__toggle'),
  ];

  closeTargets.forEach(function (target) {
    if (!target) return;

    target.addEventListener('mouseenter', function () {
      if (isMobile()) return;
      if (!navbar.classList.contains('navbar--megamenu-open')) return;
      scheduleClose();
    });
  });

  document.addEventListener('click', function (event) {
    if (!navbar.classList.contains('navbar--megamenu-open')) return;
    if (navbar.contains(event.target)) return;
    closeMegamenu();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeMegamenu();
    }
  });

  mobileQuery.addEventListener('change', function () {
    closeMegamenu();
  });

  window.addEventListener('resize', function () {
    if (!activeMenuId) return;
    scrollToMenu(activeMenuId, false);
  });
})();
