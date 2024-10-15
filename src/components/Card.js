export default class Card {
  constructor(
    data,
    templateSelector,
    userId,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._title = data.name;
    this._image = data.link;

    this._userId = userId;
    this._likes = data.likes || [];
    this._id = data._id;
    this._handleLikeClick = handleLikeClick;
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

  setLike(isLiked, likesCount) {
    this._isLiked = isLiked;
    this._likeCard = this._element.querySelector(".grid__content-like");

    if (this._isLiked) {
      this._likeCard.classList.add("grid__content-like_active");
    } else {
      this._likeCard.classList.remove("grid__content-like_active");
    }
    this._element.querySelector(".grid__content-likeNumber").textContent =
      likesCount;
  }

  _handleLike() {
    this._handleLikeClick(this._id, this._isLiked)
      .then((updatedCard) => {
        this.setLike(!this._isLiked, updatedCard.likes.length);
      })
      .catch(() => {});
  }

  deleteCard() {
    this._element.remove();
  }

  addDeleteIcon() {
    this._element
      .querySelector(".grid__delete-button")
      .classList.add("grid__delete-button_show");
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".grid__box-portrait-photo").src = this._image;
    this._element.querySelector(".grid__box-portrait-photo").alt = this._title;
    this._element.querySelector(".grid__content-title").textContent =
      this._title;

    const hasOwnLike = this._likes.some((like) => like._id === this._userId);
    this.setLike(hasOwnLike, this._likes.length);

    this._setEventListeners();

    return this._element;
  }
}
