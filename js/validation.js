function showFeedBack(input, valid, message) {
  const validClass = valid ? "is-valid" : "is-invalid";
  const messageDiv = valid
    ? input.parentElement.querySelector("div.valid-feedback")
    : input.parentElement.querySelector("div.invalid-feedback");
  for (const div of input.parentElement.getElementsByTagName("div")) {
    div.classList.remove("d-block");
  }
  messageDiv.classList.remove("d-none");
  messageDiv.classList.add("d-block");
  input.classList.remove("is-valid");
  input.classList.remove("is-invalid");
  input.classList.add(validClass);
  if (message) {
    messageDiv.innerHTML = message;
  }
}
function defaultCheckElement(event) {
  this.value = this.value.trim();
  if (!this.checkValidity()) {
    showFeedBack(this, false);
  } else {
    showFeedBack(this, true);
  }
}

function isValidImage(input) {
  //LAS IMÁGENES TIENEN QUE ESTAR DENTRO DE LA CARPETA IMG DEL PROYECTO
  const file = input.files[0];
  if (!file) return false;

  const allowedTypes = ["image/jpeg", "image/png"];
  return allowedTypes.includes(file.type);
}

function newCategoryValidation(handler) {
  const form = document.forms.fNewCategory;
  form.setAttribute("novalidate", true);
  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;
    this.ncDescription.value = this.ncDescription.value.trim();

    // if (!this.ncImg.checkValidity() || !isValidImage(this.ncImg)) {
    //   isValid = false;
    //   showFeedBack(this.ncImg, false);
    //   firstInvalidElement = this.ncImg;
    // } else {
    //   showFeedBack(this.ncImg, true);
    // }
    if (!this.ncName.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncName, false);
      firstInvalidElement = this.ncName;
    } else {
      showFeedBack(this.ncName, true);
    }
    if (!this.ncDescription.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncDescription, false);
      firstInvalidElement = this.ncDescription;
    } else {
      showFeedBack(this.ncName, true);
    }
    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(this.ncName.value, this.ncImg.value, this.ncDescription.value);
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.ncName.focus();
  });
  form.ncName.addEventListener("change", defaultCheckElement);
  form.ncDescription.addEventListener("change", defaultCheckElement);
}

function newDishValidation(handler) {
  const form = document.forms.fNewDish;
  form.setAttribute("novalidate", "");

  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    this.npDescription.value = this.npDescription.value.trim();

    if (!this.npName.checkValidity()) {
      isValid = false;
      showFeedBack(this.npName, false);
      firstInvalidElement = this.npName;
    } else {
      showFeedBack(this.npName, true);
    }

    if (!this.npIngredients.checkValidity()) {
      isValid = false;
      showFeedBack(this.npIngredients, false);
      firstInvalidElement = this.npIngredients;
    } else {
      showFeedBack(this.npIngredients, true);
    }

    // if (!this.npImg.checkValidity() || !isValidImage(this.npImg)) {
    //   isValid = false;
    //   showFeedBack(this.npImg, false);
    //   firstInvalidElement = this.npImg;
    // } else {
    //   showFeedBack(this.npImg, true);
    // }

    if (!this.npDescription.checkValidity()) {
      isValid = false;
      showFeedBack(this.npDescription, false);
      firstInvalidElement = this.npDescription;
    } else {
      showFeedBack(this.npDescription, true);
    }

    if (!this.npCategories.checkValidity()) {
      isValid = false;
      showFeedBack(this.npCategories, false);
      firstInvalidElement = this.npCategories;
    } else {
      showFeedBack(this.npCategories, true);
    }

    if (!this.npAllergens.checkValidity()) {
      isValid = false;
      showFeedBack(this.npAllergens, false);
      firstInvalidElement = this.npAllergens;
    } else {
      showFeedBack(this.npAllergens, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      const categories = [...this.npCategories.selectedOptions].map(
        (option) => option.value
      );
      const allergens = [...this.npAllergens.selectedOptions].map(
        (option) => option.value
      );
      const ingredients = this.npIngredients.value;
      const arrayIngredients = ingredients.split(",");
      handler(
        this.npName.value,
        arrayIngredients,
        this.npImg.value,
        this.npDescription.value,
        categories,
        allergens
      );
    }

    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.npName.focus();
  });

  form.npName.addEventListener("change", defaultCheckElement);
  form.npIngredients.addEventListener("change", defaultCheckElement);
  form.npDescription.addEventListener("change", defaultCheckElement);
}

function newRestaurantValidation(handler) {
  const form = document.forms.fNewRestaurant;
  form.setAttribute("novalidate", true);
  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;
    this.nrDescription.value = this.nrDescription.value.trim();

    // if (!this.nrImg.checkValidity() || !isValidImage(this.nrImg)) {
    //   isValid = false;
    //   showFeedBack(this.nrImg, false);
    //   firstInvalidElement = this.nrImg;
    // } else {
    //   showFeedBack(this.nrImg, true);
    // }
    if (!this.nrName.checkValidity()) {
      isValid = false;
      showFeedBack(this.nrName, false);
      firstInvalidElement = this.nrName;
    } else {
      showFeedBack(this.nrName, true);
    }
    if (!this.nrDescription.checkValidity()) {
      isValid = false;
      showFeedBack(this.nrDescription, false);
      firstInvalidElement = this.nrDescription;
    } else {
      showFeedBack(this.nrName, true);
    }
    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(this.nrName.value, this.nrImg.value, this.nrDescription.value);
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.nrName.focus();
  });
  form.nrName.addEventListener("change", defaultCheckElement);
  form.nrDescription.addEventListener("change", defaultCheckElement);
}

function AssignDishValidation(handler) {
  const form = document.forms.fAssignDish;
  form.setAttribute("novalidate", "");

  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    if (!this.npMenu.checkValidity()) {
      isValid = false;
      showFeedBack(this.npMenu, false);
      firstInvalidElement = this.npMenu;
    } else {
      showFeedBack(this.npMenu, true);
    }

    if (!this.naDishes.checkValidity()) {
      isValid = false;
      showFeedBack(this.naDishes, false);
      firstInvalidElement = this.naDishes;
    } else {
      showFeedBack(this.naDishes, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      const dishes = [...this.naDishes.selectedOptions].map(
        (option) => option.value
      );

      handler(this.npMenu.value, dishes);
    }

    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.npMenu.focus();
  });
}
function ChangeDishValidation(handler) {
  console.log("hola");
  const form = document.forms.fChanDish;
  console.log(form);
  form.setAttribute("novalidate", "");

  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    // console.log(this.chMenu);
    // if (!this.chMenu.checkValidity()) {
    //   isValid = false;
    //   showFeedBack(this.chMenu, false);
    //   firstInvalidElement = this.chMenu;
    // } else {
    //   showFeedBack(this.chMenu, true);
    // }

    // if (!this.chPlato1.checkValidity()) {
    //   isValid = false;
    //   showFeedBack(this.chPlato1, false);
    //   firstInvalidElement = this.chPlato1;
    // } else {
    //   showFeedBack(this.chPlato1, true);
    // }

    // if (!this.chPlato2.checkValidity()) {
    //   isValid = false;
    //   showFeedBack(this.chPlato2, false);
    //   firstInvalidElement = this.chPlato2;
    // } else {
    //   showFeedBack(this.chPlato2, true);
    // }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(this.chMenu.value, this.chPlato1.value, this.chPlato2.value);
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.chMenu.focus();
  });
}

export {
  newCategoryValidation,
  newDishValidation,
  newRestaurantValidation,
  AssignDishValidation,
  ChangeDishValidation,
};
