(function () {
  document.querySelectorAll('.feature-v2__slider').forEach(function (sliderEl) {
    if (sliderEl.swiper) return;

    new Swiper(sliderEl, {
      slidesPerView: 1,
      spaceBetween: 0,
      navigation: {
        prevEl: sliderEl.closest('.feature-v2')?.querySelector('.feature-v2__arrow--prev'),
        nextEl: sliderEl.closest('.feature-v2')?.querySelector('.feature-v2__arrow--next'),
      },
    });
  });
})();
