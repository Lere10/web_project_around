export default class UserInfo {
  constructor({ name, bio }) {
    this._name = document.querySelector(name);
    this._bio = document.querySelector(bio);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      bio: this._bio.textContent,
    };
  }
  setUserInfo() {
    this._name.textContent = document.querySelector(".form__input-name").value;
    this._bio.textContent = document.querySelector(".form__input-bio").value;
  }
}

// function changeProfile(evt) {
//   evt.preventDefault();
//   profileName.textContent = inputName.value;
//   profileBio.textContent = inputBio.value;
//   popupState();
// }

// submitButton.addEventListener("submit", changeProfile);

//-----------------------------------------------------------------

// function popupState() {
//   popup.classList.toggle("popup_opened");
//   inputName.value = profileName.textContent;
//   inputBio.value = profileBio.textContent;
//   document.addEventListener("keydown", closeEsc);
// }

// const inputName = popup.querySelector(".form__input-name");
// const inputBio = popup.querySelector(".form__input-bio");
// const profileName = profile.querySelector(".profile__info-name");
// const profileBio = profile.querySelector(".profile__info-bio");
