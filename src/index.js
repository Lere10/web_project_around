import "./main.css";
import Card from "./components/Card.js";
import FormValidity from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithImage from "./components/PopupWithImage.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import Api from "./components/Api.js";
import closeIconpng from "./images/popup__closeicon.png";

const api = new Api(`https://around.nomoreparties.co/v1/web-ptbr-cohort-12`, {
  headers: {
    authorization: "c5f89901-0404-4ab2-ab83-c8e3c6dc51b4",
    "Content-Type": "application/json",
  },
});

const closeIcon = document.getElementById("closeIcon");
closeIcon.src = closeIconpng;

const profile = document.querySelector(".profile");
const addPostButton = profile.querySelector(".profile__button-add-post");
const buttonOpenForm = profile.querySelector(".profile__button-open-form");
const editAvatarButton = profile.querySelector(".profile__edit-pencil");

api.getUser().then((userData) => {
  const userId = userData._id;
  api.getInitialCards().then((initialCards) => {
    const section = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          const card = new Card(
            item,
            "#grid",
            userId,
            (data) => {
              const popupWithImage = new PopupWithImage(".grid__display");
              popupWithImage.open(data);
              popupWithImage.setEventListener();
            },
            () => {
              const deleteForm = new PopupWithConfirmation(
                "#popupDeletePost",
                () => {
                  api.deleteCard(item._id);
                  card.deleteCard();
                }
              );

              deleteForm.open();
              deleteForm.setEventListener();
            },
            () => {
              const hasOwnLike = item.likes.some((like) => {
                return like._id === userId;
              });
              if (hasOwnLike) {
                return api.apiDislike(card._id).then((updatedCard) => {
                  card.setLike(false, updatedCard.likes.length);
                  item.likes = updatedCard.likes;
                });
              } else {
                return api.apiLike(card._id).then((updatedCard) => {
                  card.setLike(true, updatedCard.likes.length);
                  item.likes = updatedCard.likes;
                });
              }
            }
          );

          api.getUser().then((userData) => {
            if (userData._id === item.owner._id) {
              card.addDeleteIcon();
            }
          });

          const cardElement = card.generateCard(item);
          section.addItem(cardElement);
        },
      },
      ".grid"
    );
    section.renderer();
  });
});

const userInfo = new UserInfo({
  name: ".profile__info-name",
  bio: ".profile__info-bio",
  link: ".profile__photo",
});

api.getUser().then((userData) => {
  userInfo.setUserInfo(userData);
  userInfo.setUserAvatar(userData);
});

const popupForm = new PopupWithForm("#popupPost", (data) => {
  api.getUser().then((userData) => {
    const userId = userData._id;

    const newCard = new Card(
      data,
      "#grid",
      userId,
      (data) => {
        const popupWithImage = new PopupWithImage(".grid__display");
        popupWithImage.open(data);
        popupWithImage.setEventListener();
      },
      () => {},
      () => {}
    );
    const feed = document.querySelector(".grid");
    api.setNewCard(data).then((card) => {
      newCard._id = card._id;
      newCard._handleDeleteClick = () => {
        const deleteForm = new PopupWithConfirmation("#popupDeletePost", () => {
          api.deleteCard(newCard._id);
          newCard.deleteCard();
        });
        deleteForm.open();
        deleteForm.setEventListener();
      };

      newCard._handleLikeClick = () => {
        const hasOwnLike = card.likes.some((like) => {
          return like._id === userId;
        });
        if (hasOwnLike) {
          return api.apiDislike(newCard._id).then((updatedCard) => {
            newCard.setLike(false, updatedCard.likes.length);
            card.likes = updatedCard.likes;
          });
        } else {
          return api.apiLike(newCard._id).then((updatedCard) => {
            newCard.setLike(true, updatedCard.likes.length);
            card.likes = updatedCard.likes;
          });
        }
      };

      const newCardElement = newCard.generateCard(card);
      api.getUser().then((userData) => {
        if (userData._id === card.owner._id) {
          newCard.addDeleteIcon();
        }
      });

      feed.prepend(newCardElement);
      popupForm.close();
      popupForm.isLoading("Crie");
    });
  });
});
popupForm.setEventListener();

const popupUser = new PopupWithForm("#popupUser", (data) => {
  userInfo.setUserInfo(data);
  api.setNewUser(data);
  popupUser.close();
  popupUser.isLoading("Salvar");
});
popupUser.setEventListener();

const popupAvatar = new PopupWithForm("#popupUserAvatar", (data) => {
  userInfo.setUserAvatar(data);
  api.setNewAvatar(data);
  popupAvatar.close();
  popupAvatar.isLoading("Salvar");
});
popupAvatar.setEventListener();

editAvatarButton.addEventListener("click", () => {
  popupAvatar.open();
});

buttonOpenForm.addEventListener("click", () => {
  const currentProfile = userInfo.getUserInfo();
  document.querySelector(".form__input-name").value = currentProfile.name;
  document.querySelector(".form__input-bio").value = currentProfile.bio;
  popupUser.open();
});
addPostButton.addEventListener("click", () => {
  popupForm.open();
});

const selectors = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input-error-message",
  errorClass: "form__input-error",
};

const formList = Array.from(document.querySelectorAll(selectors.formSelector));
formList.forEach((formElement) => {
  const formValidation = new FormValidity(selectors, formElement);
  const formEnable = formValidation.enableValidation();
});
