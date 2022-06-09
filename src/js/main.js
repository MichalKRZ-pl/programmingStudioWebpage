//footer related variables
let $footerYear;

const prepareDOMElements = () => {
  $footerYear = document.querySelector(".footer__year");
};

const handleFooterYear = () => {
  const year = new Date().getFullYear();
  $footerYear.innerText = year;
};

const prepareDOMEvents = () => {
  handleFooterYear();
};

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

document.addEventListener("DOMContentLoaded", main);
