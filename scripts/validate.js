const enableValidation = (object) => {
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(
      `.form__${inputElement.id}-error`
    );
    inputElement.classList.add(object.errorClass);
    errorElement.textContent = errorMessage;
    // Olá revisor, nesse trecho do código foi apontado um erro mas confesso que não entendi o feedback e também não achei nada relacionável na descrição do projeto ou no checklist, poderia me explicar um pouco melhor o que não está de acordo com o projeto?
  };

  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(
      `.form__${inputElement.id}-error`
    );
    inputElement.classList.remove(object.errorClass);
    errorElement.textContent = "";
  };

  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(object.inactiveButtonClass);
      buttonElement.setAttribute("disabled", "");
    } else {
      buttonElement.classList.remove(object.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  };

  const SetEventListener = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(object.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      object.submitButtonSelector
    );
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    SetEventListener(formElement);
  });
};

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input-error-message",
  errorClass: "form__input-error",
});
