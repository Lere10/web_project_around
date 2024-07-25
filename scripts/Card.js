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

  _handleDisplay() {
    this._getTemplate()
      .querySelector(".grid__box-portrait-photo")
      .addEventListener("click", function (evt) {
        const displayPhoto = evt.target.closest(".grid__box");
        const photoPost = displayPhoto.querySelector(".grid__display");
        photoPost.querySelector(".grid__display-image").src = this._image;
        photoPost.querySelector(".grid__display-title").textContent =
          this._title;
        photoPost.classList.add("grid__display_opened");

        //funcao de fechar display
        const closeDisplay = () => {
          photoPost.classList.remove("grid__display_opened");
          document.removeEventListener("keydown", closeDisplay);
        };

        //chama a funcao de fechar display quando clica fora da imagem
        photoPost.addEventListener("click", function (evt) {
          if (evt.target === evt.currentTarget) {
            closeDisplay();
          }
        });

        //chama a funcao de fechar display ao clicar em tecla ESC
        document.addEventListener("keydown", (evt) => {
          if (evt.key === "Escape") {
            closeDisplay();
          }
        });

        this._getTemplate()
          .querySelector(".grid__display-closer")
          .addEventListener("click", function (evt) {
            const photoPost = evt.target
              .closest(".grid__box")
              .querySelector(".grid__display");
            photoPost.classList.toggle("grid__display_opened");
          });
      });
  }

  //_closeDisplay() {}

  _deleteCard() {
    this._getTemplate()
      .querySelector(".grid__delete-button")
      .addEventListener("click", (evt) => {
        evt.target.closest(".grid__box").remove();
      });
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
    return this._element;
    console.log("oi");
  }
}
