import Popup from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(selector, deleteCallback) {
    super(selector);
    this._deleteCallback = deleteCallback;
  }
  open() {
    super.open();
  }
  setEventListener() {
    super.setEventListener();
    this._selector.querySelector(".form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._deleteCallback();
      this.close();
    });
  }
}
