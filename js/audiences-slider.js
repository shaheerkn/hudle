(function () {
  var audiencesSection = document.querySelector('.audiences');
  if (!audiencesSection) return;

  var audiencesSwiper = new Swiper('.audiences .audiences__slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
      prevEl: '.audiences .audiences__arrow--prev',
      nextEl: '.audiences .audiences__arrow--next',
    },
    on: {
      slideChange: function () {
        var tabs = audiencesSection.querySelectorAll('.audiences__tabs .audiences__tab');
        tabs.forEach(function (tab) { tab.classList.remove('audiences__tab--active'); });
        tabs[this.activeIndex].classList.add('audiences__tab--active');
      },
    },
  });

  audiencesSection.querySelectorAll('.audiences__tabs .audiences__tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      audiencesSwiper.slideTo(parseInt(this.dataset.slide, 10));
    });
  });
})();
