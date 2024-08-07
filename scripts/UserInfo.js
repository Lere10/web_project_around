export default class UserInfo {
  constructor({ name, bio }) {
    this._name = name;
    this._bio = bio;
  }
  getUserInfo() {
    return {
      name: this._name,
      bio: this._bio,
    };
  }
  setUserInfo() {}
}

// function changeProfile(evt) {
//   evt.preventDefault();
//   profileName.textContent = inputName.value;
//   profileBio.textContent = inputBio.value;
//   popupState();
// }

// submitButton.addEventListener("submit", changeProfile);
