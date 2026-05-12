var audiencesSwiper = new Swiper('.audiences__slider', {
  slidesPerView: 1,
  spaceBetween: 24,
  navigation: {
    prevEl: '.audiences__arrow--prev',
    nextEl: '.audiences__arrow--next',
  },
  on: {
    slideChange: function () {
      var tabs = document.querySelectorAll('.audiences__tab');
      tabs.forEach(function (tab) { tab.classList.remove('audiences__tab--active'); });
      tabs[this.activeIndex].classList.add('audiences__tab--active');
    },
  },
});

document.querySelectorAll('.audiences__tab').forEach(function (tab) {
  tab.addEventListener('click', function () {
    audiencesSwiper.slideTo(parseInt(this.dataset.slide));
  });
});
