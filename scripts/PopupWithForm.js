import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._callback = callback;
  }
  _getInputValues() {
    return {
      name: this._selector.querySelector(".form__input-name").value,
      link: this._selector.querySelector(".form__input-bio").value,
      //  name: this._selector.querySelector("#title").value,
      //  link: this._selector.querySelector("#imageURL").value,
    };
  }

  close() {
    super.close();
    this._selector.querySelector(".form").reset();
  }
  setEventListener() {
    super.setEventListener();
    this._selector.querySelector(".form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      const data = this._getInputValues();
      this._callback(data);
    });
  }
}