//footer related variables
let $footerYear;
//burger button/mobile menu variables
let $burgerBtn;
let $mobileMenu;

const prepareDOMElements = () => {
  $footerYear = document.querySelector(".footer__year");
  $burgerBtn = document.querySelector(".header__burger");
  $mobileMenu = document.querySelector(".mobile-menu");
};

const handleFooterYear = () => {
  const year = new Date().getFullYear();
  $footerYear.innerText = year;
};

const handleBurgerBtn = () => {
  $mobileMenu.classList.toggle("mobile-menu--active");
};

const prepareDOMEvents = () => {
  handleFooterYear();
  $burgerBtn.addEventListener("click", handleBurgerBtn);
};

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

document.addEventListener("DOMContentLoaded", main);
