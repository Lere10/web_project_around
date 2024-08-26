class Api {
  constructor(options) {}
}

//solicitação de user
fetch(`https://around.nomoreparties.co/v1/${group}/user/me`, {
  method: "GET",
  headers: {
    authorization: "c5f89901-0404-4ab2-ab83-c8e3c6dc51b4",
  },
})
  .then((res) => {
    return res.json();
  })
  .then((result) => {
    console.log(result);
  });

//solicitação de Cards
fetch(`https://around.nomoreparties.co/v1/${group}/cards`, {
  method: "GET",
  headers: {
    authorization: "c5f89901-0404-4ab2-ab83-c8e3c6dc51b4",
  },
})
  .then((res) => {
    return res.json();
    //deve retornar um Array com os posts iniciais
    //utilizar esse vetor ao invés do vetor setado manualmente em index.js
  })
  .then((result) => {
    console.log(result);
  });

//Utilização do metodo PATCH:
//editar perfil
fetch("https://around.nomoreparties.co/v1/groupId/users/me", {
  method: "PATCH",
  headers: {
    authorization: "c5f89901-0404-4ab2-ab83-c8e3c6dc51b4",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Marie Skłodowska Curie", //trazer do name.value do form
    about: "Physicist and Chemist",
  }),
});

//adição de novo POST card:
fetch("https://around.nomoreparties.co/v1/groupId/users/me", {
  method: "POST",
  headers: {
    authorization: "c5f89901-0404-4ab2-ab83-c8e3c6dc51b4",
    "Content-Type": "application/json",
  },
  body: {
    //talves não seja no body
    likes: [],
    _id: "5d1f0611d321eb4bdcd707dd",
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    owner: {
      name: "Jacques Cousteau",
      about: "Sailor, researcher",
      avatar:
        "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_avatar.jpg",
      _id: "ef5f7423f7f5e22bef4ad607",
      cohort: "group-42",
    },
    createdAt: "2019-07-05T08:10:57.741Z",
  },
});

//adicionar recursos de like

//popup de confirmação de excluir

//metodo DELETE para excluir
//utilizar id para identificar if owner ou não?

//metodo PUT para curtir e descurtir
//utilizar id para identificar if owner ou não?

//utilizar onload em botão de form "Salvando..." ao carregar

//utilizar Promise.reject pros casos de erro e .catch()
