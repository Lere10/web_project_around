class Api {
  constructor(baseURL, method) {
    this._baseUrl = baseURL;
    this._method = method;
    this._postMethod = `method: "POST"`;
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, this._method)
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
    return fetch(`${this._baseUrl}/users/me`, this._method).then((res) => {
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
      ...this._method,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }
  setNewAvatar(data) {
    fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      ...this._method,
      body: JSON.stringify({
        avatar: data.link,
      }),
    });
  }
  setNewCard(data) {
    fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      ...this._method,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      console.log(`POST feito: ${res}`);
    });
  }
  deleteCard(id) {
    fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      ...this._method,
    }).then((res) => {
      console.log(`Delete feito: ${res}`);
    });
  }
}

const api = new Api(`https://around.nomoreparties.co/v1/web-ptbr-cohort-12`, {
  headers: {
    authorization: "c5f89901-0404-4ab2-ab83-c8e3c6dc51b4",
    "Content-Type": "application/json",
  },
});

export default api;
