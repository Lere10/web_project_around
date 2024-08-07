const profile = document.querySelector(".profile");

const buttonOpenForm = profile.querySelector(".profile__button-open-form");
const popup = document.querySelector(".popup");
const closePopup = popup.querySelector(".popup__closer");

const submitButton = popup.querySelector(".form");
const inputName = popup.querySelector(".form__input-name");
const inputBio = popup.querySelector(".form__input-bio");
const profileName = profile.querySelector(".profile__info-name");
const profileBio = profile.querySelector(".profile__info-bio");

const addPostButton = profile.querySelector(".profile__button-add-post");
const popupAddPost = document.querySelector(".popup__addpost");
const closePopupPost = popupAddPost.querySelector(".popup__closer");

const addPostForm = popupAddPost.querySelector(".form");
const titleInput = addPostForm.querySelector("#title");
const imgInput = addPostForm.querySelector("#imageURL");
