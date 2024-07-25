export default class Card {
  //passar #grid pro templateSelector
  constructor(data, templateSelector) {
    this._title = data.name;
    this._image = data.link;
    this._template = templateSelector;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._template)
      .content.querySelector(".grid__box")
      .cloneNode(true);

    return cardTemplate;
  }

  _setEventListeners() {
    this._element
      .querySelector(".grid__delete-button")
      .addEventListener("click", () => {
        this._deleteCard();
      });

    this._element
      .querySelector(".grid__box-portrait-photo")
      .addEventListener("click", () => {
        this._openDisplay();
        document.addEventListener("keydown", (evt) => {
          if (evt.key === "Escape") {
            this._closeDisplay();
          }
        });
      });

    this._element
      .querySelector(".grid__display")
      .addEventListener("click", (evt) => {
        if (evt.target === evt.currentTarget) {
          this._closeDisplay();
        }
      });

    this._element
      .querySelector(".grid__display-closer")
      .addEventListener("click", () => {
        this._closeDisplay();
      });
  }

  _deleteCard() {
    this._element.remove();
  }

  _openDisplay() {
    this._display = this._element.querySelector(".grid__display");
    this._display.querySelector(".grid__display-image").src = this._image;
    this._display.querySelector(".grid__display-title").textContent =
      this._title;
    this._display.classList.add("grid__display_opened");
  }

  _closeDisplay() {
    this._display.classList.remove("grid__display_opened");
    // ToFix/Remover eventListener ao clicar no ESC
    // document.removeEventListener("keydown", this._closeDiplay);
  }

  _likeCard() {
    this._getTemplate()
      .querySelector(".grid__content-like")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("grid__content-like_active");
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".grid__box-portrait-photo").src = this._image;
    this._element.querySelector(".grid__box-portrait-photo").alt = this._title;
    this._element.querySelector(".grid__content-title").textContent =
      this._title;

    this._setEventListeners();

    return this._element;
  }
}
