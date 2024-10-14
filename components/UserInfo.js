export default class UserInfo {
  constructor({ name, bio, link }) {
    this._name = document.querySelector(name);
    this._bio = document.querySelector(bio);
    this._link = document.querySelector(link);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      bio: this._bio.textContent,
      link: this._link.src,
    };
  }
  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._bio.textContent = about;
  }

  setUserAvatar(data) {
    this._link.src = data.avatar;
  }
}
