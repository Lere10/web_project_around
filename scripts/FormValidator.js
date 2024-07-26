export default class FormValidity {
  constructor(selector, form) {
    this._form = form;
    this._formSelector = selector.formSelector;
    this._inputSelector = selector.inputSelector;
    this._submitButtonSelector = selector.submitButtonSelector;
    this._inactiveButtonClass = selector.inactiveButtonClass;
    this._inputErrorClass = selector.inputErrorClass;
    this._errorClass = selector.errorClass;
  }

  _showInputError(inputElement, errorValid) {
    this._errorElement = this._form.querySelector(
      `.form__${inputElement.id}-error`
    );
    inputElement.classList.add(this._errorClass);

    if (errorValid.tooShort) {
      this._errorElement.textContent = "Muito curto";
    } else if (errorValid.badInput) {
      this._errorElement.textContent = "Campo inválido";
    } else if (errorValid.customError) {
      this._errorElement.textContent = "Valor não aceito";
    } else if (errorValid.patternMismatch) {
      this._errorElement.textContent = "Formato inválido";
    } else if (errorValid.rangeOverflow) {
      this._errorElement.textContent = "Valor muito alto";
    } else if (errorValid.rangeUnderflow) {
      this._errorElement.textContent = "Valor muito baixo";
    } else if (errorValid.stepMismatch) {
      this._errorElement.textContent = "Valor inválido";
    } else if (errorValid.tooLong) {
      this._errorElement.textContent = "Muito longo";
    } else if (errorValid.typeMismatch) {
      this._errorElement.textContent = "Tipo de dado inválido";
    } else if (errorValid.valueMissing) {
      this._errorElement.textContent = "Campo obrigatório";
    }
  }

  _hideInputError(inputElement) {
    this._errorElement = this._form.querySelector(
      `.form__${inputElement.id}-error`
    );
    inputElement.classList.remove(this._errorClass);
    this._errorElement.textContent = "";
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validity);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "");
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }

  _setEventListener() {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        //recebe form e inputElement
        this._checkInputValidity(inputElement);

        //recebe lista de inputs e elemento de botao
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListener();
  }
}
