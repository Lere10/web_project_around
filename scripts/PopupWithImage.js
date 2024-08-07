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

// this._element
//   .querySelector(".grid__box-portrait-photo")
//   .addEventListener("click", () => {
//     this._handleCardClick({ name: this._title, link: this._image });
//     document.addEventListener("keydown", (evt) => {
//       if (evt.key === "Escape") {
//         this._closeDisplay();
//       }
//     });
//   });
