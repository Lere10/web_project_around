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
