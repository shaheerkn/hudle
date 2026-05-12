new Swiper('.latest-posts__slider', {
  slidesPerView: 1,
  spaceBetween: 24,
  navigation: {
    prevEl: '.latest-posts__arrow--prev',
    nextEl: '.latest-posts__arrow--next',
  },
  breakpoints: {
    577: {
      slidesPerView: 2,
    },
    993: {
      slidesPerView: 3,
    },
  },
});
