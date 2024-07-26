const enableValidation = (object) => {
  //.
  //Mensagem de erro personalizada
  const showInputError = (formElement, inputElement, errorValid) => {
    const errorElement = formElement.querySelector(
      `.form__${inputElement.id}-error`
    );
    inputElement.classList.add(object.errorClass);

    if (errorValid.tooShort) {
      errorElement.textContent = "Muito curto";
    } else if (errorValid.badInput) {
      errorElement.textContent = "Campo inválido";
    } else if (errorValid.customError) {
      errorElement.textContent = "Valor não aceito";
    } else if (errorValid.patternMismatch) {
      errorElement.textContent = "Formato inválido";
    } else if (errorValid.rangeOverflow) {
      errorElement.textContent = "Valor muito alto";
    } else if (errorValid.rangeUnderflow) {
      errorElement.textContent = "Valor muito baixo";
    } else if (errorValid.stepMismatch) {
      errorElement.textContent = "Valor inválido";
    } else if (errorValid.tooLong) {
      errorElement.textContent = "Muito longo";
    } else if (errorValid.typeMismatch) {
      errorElement.textContent = "Tipo de dado inválido";
    } else if (errorValid.valueMissing) {
      errorElement.textContent = "Campo obrigatório";
    }
  };

  //funcionalidade de retirar erro
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(
      `.form__${inputElement.id}-error`
    );
    inputElement.classList.remove(object.errorClass);
    errorElement.textContent = "";
  };

  //checar validade do INPUT e chama hide or show inputError
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validity);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  //checa se tem algum dado invalido
  //recebe inputs de toggleButtonState e itera por elemento e retorna elemento nao válido
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //muda o estado do botao conforme hasInvalidInput()
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(object.inactiveButtonClass);
      buttonElement.setAttribute("disabled", "");
    } else {
      buttonElement.classList.remove(object.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  };

  //faz um array dos inputs do formElement passado no parametro
  //chama togglebutton nos inputs
  const SetEventListener = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(object.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      object.submitButtonSelector
    );
    toggleButtonState(inputList, buttonElement);

    //ouve cada input e checa validade e buttonState
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  //previne o comportamento padrao de todos os forms e aciona o manipulador de eventos em todos
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    SetEventListener(formElement);
  });
};

//objeto com seletores
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input-error-message",
  errorClass: "form__input-error",
});
