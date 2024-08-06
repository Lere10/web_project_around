export default class Popup {
  constructor(popupSelector) {
    this._selector = document.querySelector(popupSelector);
  }
  open() {
    this._selector.classList.add("popup_opened");
  }
  close() {
    this._selector.classList.remove("popup_opened");
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
      removeEventListener("keydown", this._handleEscClose);
    }
  }
  setEventListener() {
    this._selector
      .querySelector(".popup__closer") //also grid__display-closer
      .addEventListener("click", () => {
        this.close();
      });
    this._selector
      .querySelector("#popupOverlay")
      .addEventListener("click", (evt) => {
        if (evt.target === evt.currentTarget) {
          this.close();
        }
      });
  }
}
