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

function popupState() {
  popup.classList.toggle("popup_opened");
  inputName.value = profileName.textContent;
  inputBio.value = profileBio.textContent;
  document.addEventListener("keydown", closeEsc);
}
function popupPostState() {
  popupAddPost.closest(".popup").classList.toggle("popup_opened");
  document.addEventListener("keydown", closeEsc);
  titleInput.value = "";
  imgInput.value = "";
  const buttonElement = addPostForm.querySelector(".form__button");
  buttonElement.setAttribute("disabled", "");
  buttonElement.classList.add("form__button_disabled");
}

function closeEsc(evt) {
  if (evt.key === "Escape") {
    popup.classList.remove("popup_opened");
    popupAddPost.closest(".popup").classList.remove("popup_opened");
    document.removeEventListener("keydown", closeEsc);
  }
}

popupAddPost.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    popupPostState();
  }
});
popup.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    popupState();
  }
});

addPostButton.addEventListener("click", popupPostState);
buttonOpenForm.addEventListener("click", popupState);
closePopup.addEventListener("click", popupState);
closePopupPost.addEventListener("click", popupPostState);

function changeProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileBio.textContent = inputBio.value;
  popupState();
}

submitButton.addEventListener("submit", changeProfile);

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

function createPost(post) {
  //localiza e clona template
  const feedTemplate = document.querySelector("#grid").content;
  const feedPost = feedTemplate.querySelector(".grid__box").cloneNode(true);

  //localiza campos do template clonado
  const postImage = feedPost.querySelector(".grid__box-portrait-photo");
  const postTitle = feedPost.querySelector(".grid__content-title");

  //preenche campos do template clonado
  postImage.src = post.link;
  postImage.alt = post.name;
  postTitle.textContent = post.name;

  //funcionalidade de delete
  feedPost
    .querySelector(".grid__delete-button")
    .addEventListener("click", function (evt) {
      evt.target.closest(".grid__box").remove();
    });

  //funcionalidade de like
  feedPost
    .querySelector(".grid__content-like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("grid__content-like_active");
    });

  //Display //localiza e preenche os dados do display
  //abre display
  feedPost
    .querySelector(".grid__box-portrait-photo")
    .addEventListener("click", function (evt) {
      const displayPhoto = evt.target.closest(".grid__box");
      const photoPost = displayPhoto.querySelector(".grid__display");
      photoPost.querySelector(".grid__display-image").src = post.link;
      photoPost.querySelector(".grid__display-title").textContent = post.name;
      photoPost.classList.add("grid__display_opened");

      //funcao de fechar display
      const closeDisplay = () => {
        photoPost.classList.remove("grid__display_opened");
        document.removeEventListener("keydown", closeDisplay);
      };

      //chama a funcao de fechar display ao clicar em tecla ESC
      document.addEventListener("keydown", (evt) => {
        if (evt.key === "Escape") {
          closeDisplay();
        }
      });
    });

  //chama a funcao de fechar display quando clica fora da imagem
  photoPost.addEventListener("click", function (evt) {
    if (evt.target === evt.currentTarget) {
      closeDisplay();
    }
  });

  // fecha display ao clicar no X
  feedPost
    .querySelector(".grid__display-closer")
    .addEventListener("click", function (evt) {
      const photoPost = evt.target
        .closest(".grid__box")
        .querySelector(".grid__display");
      photoPost.classList.toggle("grid__display_opened");
    });

  //localiza feed a adiciona cartao com funcionalidades em append
  const feed = document.querySelector(".grid");
  feed.prepend(feedPost);
}

//itera sobre cartões e cria post com funcionalidades
initialCards.forEach((item) => {
  createPost(item);
});

function AddPost(evt) {
  evt.preventDefault();

  const post = {
    name: titleInput.value,
    link: imgInput.value,
  };

  createPost(post);

  popupPostState();
  titleInput.value = "";
  imgInput.value = "";
}

addPostForm.addEventListener("submit", AddPost);
