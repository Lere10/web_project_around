import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._callback = callback;
    this._isLoading = false;
    this._originalButtonText =
      this._selector.querySelector(".form__button").textContent;
  }
  _getInputValues() {
    return {
      name: this._selector.querySelector(".form__input-name")?.value,
      link: this._selector.querySelector(".form__input-bio")?.value,
      about: this._selector.querySelector(".form__input-bio")?.value,
      avatar: this._selector.querySelector(".form__input-bio")?.value,
    };
  }

  close() {
    super.close();
    this._selector
      .querySelector(".form__button")
      .classList.add("form__button_disabled");
    this._selector.querySelector(".form__button").setAttribute("disabled", "");
    this._selector.querySelector(".form").reset();
    console.log(this._selector);
  }

  // isLoading() {
  //   const submitButton = this._selector.querySelector(".form__button");
  //   this._isLoading = !this._isLoading;
  //   if (this._isLoading) {
  //     submitButton.textContent = "Salvando...";
  //   } else {
  //     submitButton.textContent = originalButtonText;
  //   }
  // }

  setEventListener() {
    super.setEventListener();
    this._selector.querySelector(".form").addEventListener("submit", (evt) => {
      //buscar só o carregamento da página?
      evt.preventDefault();
      const data = this._getInputValues();
      this._callback(data);
    });
  }
}
