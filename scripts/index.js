import Card from "./Card.js";
import FormValidity from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const profile = document.querySelector(".profile");
const addPostButton = profile.querySelector(".profile__button-add-post");
const buttonOpenForm = profile.querySelector(".profile__button-open-form");

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

//Class Section OK
const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#grid");
      const cardElement = card.generateCard();
      section.addItem(cardElement);
    },
  },
  ".grid"
);
section.renderer();
//Class Section OK

const userInfo = new UserInfo({ name: "algo", bio: "algo2" });
userInfo.getUserInfo();

//popupWithFormPost OK
const popupForm = new PopupWithForm("#popupPost", (data) => {
  const newCard = new Card(data, "#grid");
  const newCardElement = newCard.generateCard();
  const feed = document.querySelector(".grid");
  feed.prepend(newCardElement);
  popupForm.close();
});
popupForm.setEventListener();

//popupWithForm do User
const popupUser = new PopupWithForm("#popupUser", (data) => {
  popupUser.close();
  //utiliza data para receber nameUser e bio para setUser
});
popupUser.setEventListener();

buttonOpenForm.addEventListener("click", () => {
  popupUser.open();
});
addPostButton.addEventListener("click", () => {
  popupForm.open();
});

//FormValidator
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
