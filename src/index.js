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
                card.deleteCard();
              }
            );
            deleteForm.open();
            deleteForm.setEventListener();
          }
        );
        const cardElement = card.generateCard();
        section.addItem(cardElement);
      },
    },
    ".grid"
  );
  section.renderer();
});

api.getUser().then((userData) => {
  const userInfo = new UserInfo({
    name: ".profile__info-name",
    bio: ".profile__info-bio",
  });
  userInfo.setUserInfo(userData);
  //Setar o user info a partir de UserData
  console.log(userData);
});

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

const userInfo = new UserInfo({
  name: ".profile__info-name",
  bio: ".profile__info-bio",
});

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
      });
      deleteForm.open();
      deleteForm.setEventListener();
    }
  );
  const newCardElement = newCard.generateCard();
  const feed = document.querySelector(".grid");
  feed.prepend(newCardElement);
  popupForm.close();
});
popupForm.setEventListener();

const popupUser = new PopupWithForm("#popupUser", (data) => {
  userInfo.setUserInfo();
  popupUser.close();
});
popupUser.setEventListener();

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
