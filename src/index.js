import "./main.css";
import Card from "../components/Card.js";
import FormValidity from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import api from "../components/Api.js";
import closeIconpng from "./images/popup__closeicon.png";

const closeIcon = document.getElementById("closeIcon");
closeIcon.src = closeIconpng;

const profile = document.querySelector(".profile");
const addPostButton = profile.querySelector(".profile__button-add-post");
const buttonOpenForm = profile.querySelector(".profile__button-open-form");
const editAvatarButton = profile.querySelector(".profile__edit-pencil");

api.getInitialCards().then((initialCards) => {
  console.log(`Cards criados: `, initialCards);
  const section = new Section(
    {
      items: initialCards,
      renderer: (item) => {
        const card = new Card(
          item,
          "#grid",
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
                console.log(`Id excluído: ${item._id}`);
                card.deleteCard();
              }
            );
            deleteForm.open();
            deleteForm.setEventListener();
          }
        );
        const likes = item.likes.length;
        const cardElement = card.generateCard(likes);
        section.addItem(cardElement);
      },
    },
    ".grid"
  );
  section.renderer();
});

const userInfo = new UserInfo({
  name: ".profile__info-name",
  bio: ".profile__info-bio",
  link: ".profile__photo",
});

api.getUser().then((userData) => {
  console.log(userData);
  userInfo.setUserInfo(userData);
  userInfo.setUserAvatar(userData);
});

//api.setNewCard();

// const initialCards = [
//   {
//     name: "Vale de Yosemite",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
//   },
//   {
//     name: "Lago Louise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
//   },
//   {
//     name: "Montanhas Carecas",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
//   },
//   {
//     name: "Latemar",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
//   },
//   {
//     name: "Parque Nacional da Vanoise ",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
//   },
//   {
//     name: "Lago di Braies",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
//   },
// ];

const popupForm = new PopupWithForm("#popupPost", (data) => {
  const newCard = new Card(
    data,
    "#grid",
    (data) => {
      const popupWithImage = new PopupWithImage(".grid__display");
      popupWithImage.open(data);
      popupWithImage.setEventListener();
    },
    () => {
      const deleteForm = new PopupWithConfirmation("#popupDeletePost", () => {
        newCard.deleteCard();
        console.log(`oooia aq maxo rei: ${data}`);
        //TODO exclui post criado // feed
        //api.deleteCard();
      });
      deleteForm.open();
      deleteForm.setEventListener();
    }
  );
  const newCardElement = newCard.generateCard();
  //console.log(newCardElement);
  const feed = document.querySelector(".grid");
  api.setNewCard(data);
  //console.log(data);
  feed.append(newCardElement);
  //TODO - Recarregar feed automaticamente
  popupForm.close();
});
popupForm.setEventListener();

const popupUser = new PopupWithForm("#popupUser", (data) => {
  userInfo.setUserInfo(data);
  api.setNewUser(data);
  popupUser.close();
});
popupUser.setEventListener();

//Popup editar avatar
const popupAvatar = new PopupWithForm("#popupUserAvatar", (data) => {
  userInfo.setUserAvatar(data);
  api.setNewAvatar(data);
  console.log(`Outra data aqui paizao, avia:`, data);
  popupAvatar.close();
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
