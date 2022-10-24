const swiper = new Swiper(".services__swiper", {
  slidesPerView: 1,
  spaceBetween: 40,
  loop: true,
  breakpoints: {
    // when window width is >= 320px
    576: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    // when window width is >= 640px
    992: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
