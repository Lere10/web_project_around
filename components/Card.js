export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick) {
    this._title = data.name;
    this._image = data.link;
    this._template = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
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
        this._handleTrashClick();
      });

    this._element
      .querySelector(".grid__box-portrait-photo")
      .addEventListener("click", () => {
        this._handleImageClick();
      });

    this._element
      .querySelector(".grid__content-like")
      .addEventListener("click", () => {
        this._handleLike();
      });
  }

  _handleTrashClick() {
    this._handleDeleteClick();
  }

  _handleImageClick() {
    this._handleCardClick({ name: this._title, link: this._image });
  }

  _handleLike() {
    this._likeCard = this._element.querySelector(".grid__content-like");
    this._likeCard.classList.toggle("grid__content-like_active");
  }

  deleteCard() {
    this._element.remove();
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
