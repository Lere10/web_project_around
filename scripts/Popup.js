export default class Popup {
  constructor(popupSelector) {
    this._selector = document.querySelector(popupSelector);
    this.open = this.open.bind(this);
    if (!this._selector) {
      console.log("erro no seletor passado");
    }
  }
  open() {
    //Isso funciona
    this._selector.classList.add("grid__display_opened");
    //isso nao funciona kkkkkkkkkkk
    //this._selector.classList.add("grid__display_opened");
  }
  close() {
    this._selector.classList.remove("grid__display_opened");
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
      ?.addEventListener("click", () => {
        this.close();
      });
    this._selector
      .querySelector("#popupOverlay")
      ?.addEventListener("click", (evt) => {
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
