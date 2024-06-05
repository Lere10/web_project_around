let profile = document.querySelector(".profile");

let buttonOpenForm = profile.querySelector(".button__open-form");
let popup = document.querySelector(".popup");
let closePopup = popup.querySelector(".popup__closer");
let submitButton = popup.querySelector(".form__button");
let inputName = popup.querySelector(".form__input-name");
let inputBio = popup.querySelector(".form__input-bio");
let profileName = profile.querySelector(".profile__info-name");
let profileBio = profile.querySelector(".profile__info-bio");

function popupState() {
  popup.classList.toggle("popup_opened");
  inputName.value = profileName.textContent;
  inputBio.value = profileBio.textContent;
}

buttonOpenForm.addEventListener("click", popupState);
closePopup.addEventListener("click", popupState);

function changeProfile(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileBio.textContent = inputBio.value;

  popupState();
}

submitButton.addEventListener("click", changeProfile);
