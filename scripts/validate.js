const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    //showInputError
  } else {
    //hideInputError
  }
};

const SetEventListener = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".form__button");
  //toggleButtonState

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      //  toggleButtonState;
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    //const fieldset = formElement.querySelector(".form__fieldset");

    SetEventListener(formElement);

    //    fieldset.forEach((fieldset) => {
    //SetEventListener(fieldset);
    //  });
  });
};
enableValidation();
