//-- Инициатор календаря и его настройки --//

new AirDatepicker("#calendar", {
  categoryedDates: [new Date()],
  navTitles: {
    days: "<strong>MMMM</strong>",
    months: "category month of <strong>yyyy</strong>",
  },

  dateFormat(date) {
    let newDate = date.toLocaleString("ru", {
      year: "numeric",
      day: "2-digit",
      month: "numeric",
    });
    newDate = newDate.replace(/\./g, "/");
    return newDate;
  },
});

//-- Настройка выпадающего меню и его частей --//

const category = function () {
  const categoryHeader = document.querySelectorAll(".category__header");
  const categoryItem = document.querySelectorAll(".category__item");

  categoryHeader.forEach((item) => {
    item.addEventListener("click", categoryToggle);
  });

  categoryItem.forEach((item) => {
    item.addEventListener("click", categoryChoose);
  });

  function categoryToggle() {
    if (!this.parentElement.classList.contains("disabled-el")) {
      this.parentElement.classList.toggle("is-active");
    } else {
      console.log("block disabled");
    }
  }

  function categoryChoose() {
    if (this.classList.contains("disabled")) {
      console.log("disabled");
    } else {
      let text = this.innerText,
        category = this.closest(".category"),
        currentText = category.querySelector(".category__current");
      currentText.innerText = text;
      category.classList.remove("is-active");
    }
  }
};

category();

//-- Валидация формы --//

const form = document.querySelector(".form");



function checkForm(form) {
  form.reset();
  const nameField = form.querySelector(".form__name");
  const emailField = form.querySelector(".form__email");
  const commentField = form.querySelector(".form__comment");
  const formAlert = form.querySelector(".form-alert");

  fieldArr = [nameField, emailField, commentField];

  //-- Анимация плейсхолдера --//
  fieldArr.forEach((e) => {
    e.addEventListener("focus", (e) => {
      e = e.target;
      let placeholder = e.nextSibling;
      placeholder.classList.add("focused");
    });
  });

  fieldArr.forEach((e) => {
    e.addEventListener("blur", (e) => {
      e = e.target;

      if (e.value == "") {
        let placeholder = e.nextSibling;
        placeholder.classList.remove("focused");
      }
    });
  });

  //-- Проверка перед отправкой --//
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;
    let emailValid = true;

    fieldArr.forEach((e) => {
      e.classList.remove("_err");

      if (e.value === "") {
        e.classList.add("_err");
        formAlert.classList.remove("success-msg");
        formAlert.classList.add("err-msg");
        formAlert.innerText = "Пожалуйста заполните все поля!";
        valid = false;
      }

      if (valid && checkEmail(emailField)) {
        e.classList.remove("_err");
        emailField.classList.add("_err");
        formAlert.classList.remove("success-msg");
        formAlert.classList.add("err-msg");
        formAlert.innerText = "Введите корректный e-mail.";
        emailValid = false;
      }

      if (valid && emailValid) {
        formAlert.classList.remove("err-msg");
        formAlert.classList.add("success-msg");
        formAlert.innerText = "Ваше сообщение отправлено!";
      }
    });
  });
}

//-- Проверка email на валидность --//
function checkEmail(emailField) {
  return !/.+@.+\..+/i.test(emailField.value);
}

if(form) {
    checkForm(form);
}



function mobileMenu() {
    const burger = document.querySelector('.menu__mob');
    const menu = document.querySelector('.header__menu');

    burger.addEventListener('click', ()=> {
        menu.classList.toggle('mob-active');
    })
}

mobileMenu();