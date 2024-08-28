class Api {
  constructor(baseURL, method) {
    this._baseUrl = baseURL;
    this._method = method;
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
}

const api = new Api(`https://around.nomoreparties.co/v1/web-ptbr-cohort-12`, {
  headers: {
    authorization: "c5f89901-0404-4ab2-ab83-c8e3c6dc51b4",
    "Content-Type": "application/json",
  },
});

export default api;
