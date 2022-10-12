//footer related variables
let $footerYear;

//burger button/mobile menu variables
let $burgerBtn;
let $mobileMenu;
let $allNavItems;

//contact form controls
let $nameField;
let $emailField;
let $phoneField;
let $companyField;
let $messageField;
let $formButton;
let $isFormValid;
let $allFormFields;

const swiper = new Swiper(".services__swiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  breakpoints: {
    // when window width is >= 320px
    576: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    992: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const prepareDOMElements = () => {
  $footerYear = document.querySelector(".footer__year");
  $burgerBtn = document.querySelector(".header__burger");
  $mobileMenu = document.querySelector(".mobile-menu");
  $allNavItems = document.querySelectorAll(".mobile-menu__item");

  if (document.querySelector("form") != null) {
    $nameField = document.querySelector('[name="name"]');
    $emailField = document.querySelector('[name="email"]');
    $phoneField = document.querySelector('[name="phone"]');
    $companyField = document.querySelector('[name="company"]');
    $messageField = document.querySelector('[name="message"]');
    $formButton = document.querySelector(".form__button");
    $allFormFields = document.querySelectorAll(".form__input");
  }
};

const handleFooterYear = () => {
  const year = new Date().getFullYear();
  $footerYear.innerText = year;
};

const handleBurgerBtn = () => {
  $mobileMenu.classList.toggle("mobile-menu--active");
};

const handleNavItems = () => {
  $allNavItems.forEach((item) => {
    item.addEventListener("click", () => {
      $mobileMenu.classList.remove("mobile-menu--active");
    });
  });
};

const showError = (input, msg = "") => {
  input.classList.add("form__input--error");

  if (msg === "") {
    input.placeholder = `Wprowadź ${input.previousElementSibling.innerText
      .slice(0, -1)
      .toLowerCase()}`;
  } else {
    input.placeholder = msg;
  }
};

const clearError = (input) => {
  input.classList.remove("form__input--error");
};

const checkForm = (input) => {
  input.forEach((el) => {
    if (el.value === "") {
      showError(el);
      $isFormValid = false;
    } else {
      clearError(el);
    }
  });
};

const checkMail = (input) => {
  const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (regExp.test(input.value)) {
    clearError(input);
  } else {
    showError(input, "Wprowadź poprawny adres e-mail");
    $isFormValid = false;
  }
};

const prepareDOMEvents = () => {
  handleFooterYear();
  $burgerBtn.addEventListener("click", handleBurgerBtn);
  handleNavItems();

  if ($formButton != null) {
    $formButton.addEventListener("click", (e) => {
      $isFormValid = true;
      checkForm([$nameField, $companyField]);

      checkMail($emailField);

      if (!$isFormValid) {
        e.preventDefault();
      }
    });
  }
};

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

document.addEventListener("DOMContentLoaded", main);
