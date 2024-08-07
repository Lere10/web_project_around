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
    this.close();
    removeEventListener("keydown", this._handleEscClose);
  }
  setEventListener() {
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        this._handleEscClose();
      }
    });
    this._selector
      .querySelector(".popup__closer")
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
    this._selector.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}
