// generate form fields from js instead of putting them in plain html

const $contactForm = document.querySelector(".form");
const $formButton = document.querySelector(".form__button");

const createLabel = (text, for_attribute, trap = false) => {
  let label = document.createElement("label");
  label.innerHTML = `${text}`;

  label.classList.add("form__label");
  if (trap) {
    label.classList.add("form__label--important");
  }
  label.setAttribute("for", for_attribute);

  $contactForm.insertBefore(label, $formButton);
};

const createInput = (placeholder, for_attribute, file = false, optional = false, trap = false) => {
  let input = document.createElement("input");
  input.classList.add("form__input");
  input.setAttribute("placeholder", placeholder);
  input.setAttribute("name", for_attribute);

  if (trap) {
    input.classList.add("form__input--important");
  }

  if (file) {
    input.setAttribute("type", "file");
    input.setAttribute("multiple", "multiple");
    input.classList.add("form__input--file");
  } else {
    input.setAttribute("type", "text");
  }

  if (optional) {
    input.classList.add("form__input--option");
  }

  $contactForm.insertBefore(input, $formButton);
};

const createTextField = (placeholder, for_attribute) => {
  let field = document.createElement("textarea");

  field.classList.add("form__text-area");
  field.setAttribute("name", for_attribute);
  field.setAttribute("placeholder", placeholder);

  $contactForm.insertBefore(field, $formButton);
};

const createForm = () => {
  createLabel(`Imię i nazwisko <sup class="form__star">&#9733;</sup>`, "name");
  createInput("Imię Nazwisko", "name");

  createLabel(`Adres E-mail <sup class="form__star">&#9733;</sup>`, "email");
  createInput("adres@firma.com", "email");

  createLabel("Telefon:", "phone");
  createInput("123-456-789", "phone");

  createLabel(`Nazwa Firmy <sup class="form__star">&#9733;</sup>`, "company");
  createInput("Nazwa firmy", "company");

  createLabel("Załączniki:", "userfile[]");
  createInput("Załączniki", "userfile[]", true, true);

  createLabel("Wiadomość:", "message");
  createTextField("Wiadomość", "message");

  createLabel("Informacje dodatkowe", "info", true);
  createInput("informacje dodatkowe", "info", false, false, true);
};

createForm();
