import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }
  open(image) {
    this._selector.querySelector(".grid__display-image").src = image.link;
    this._selector.querySelector(".grid__display-image").alt = image.name;
    const subtitleDisplay = this._selector.querySelector(
      ".grid__display-title"
    );
    subtitleDisplay.textContent = image.name;
    super.open();
  }
  close() {
    super.close();
  }
}
