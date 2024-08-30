export default class Api {
  constructor(baseURL, options) {
    this._baseUrl = baseURL;
    this._options = options;
    //this._like = callbackLike;
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, this._options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error manual: ${res.status}`);
        }
      })
      .catch((error) => {
        console.log(`Vix paizao, deu ruim ó: ${error}`);
      });
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, this._options).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Vixe fella, erro ó: ${res.status}`);
      }
    });
  }
  setNewUser(data) {
    fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      ...this._options,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }
  setNewAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      ...this._options,
      body: JSON.stringify({
        avatar: data.link,
      }),
    });
  }
  setNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      ...this._options,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Post não enviado corretamente: ${res.status}`);
        }
      })
      .catch((error) => {
        console.log(`Vix paizão, deu ruim ó: ${error}`);
      });
  }

  apiLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      ...this._options,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Erro de like: ${res.status}`);
      }
    });
  }
  apiDislike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      ...this._options,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Erro de dislike: ${res.status}`);
      }
    });
  }
  //apidislike
  //apilike
  //callback

  deleteCard(id) {
    fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      ...this._options,
    }).then((res) => {
      console.log(`Delete feito: ${res}`);
    });
  }
}
