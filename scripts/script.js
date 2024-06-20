let profile = document.querySelector(".profile");

let buttonOpenForm = profile.querySelector(".profile__button-open-form");
let popup = document.querySelector(".popup");
let closePopup = popup.querySelector(".popup__closer");

let submitButton = popup.querySelector(".form__button");
let inputName = popup.querySelector(".form__input-name");
let inputBio = popup.querySelector(".form__input-bio");
let profileName = profile.querySelector(".profile__info-name");
let profileBio = profile.querySelector(".profile__info-bio");
const addPostButton = profile.querySelector(".profile__button-add-post");
const popupAddPost = document.querySelector(".popup__add-post");
const closePopupPost = popupAddPost.querySelector(".popup__closer");

function popupState() {
  popup.classList.toggle("popup_opened");
  inputName.value = profileName.textContent;
  inputBio.value = profileBio.textContent;
}
function popupPostState() {
  popupAddPost.classList.toggle("popup_opened");
}

addPostButton.addEventListener("click", popupPostState);
buttonOpenForm.addEventListener("click", popupState);
closePopup.addEventListener("click", popupState);
closePopupPost.addEventListener("click", popupPostState);

function changeProfile(evt) {
  profileBio.textContent = inputBio.value;
  if (inputName.value === "") {
    popupState();
  } else {
    profileName.textContent = inputName.value;
    popupState();
  }
  evt.preventDefault();
}

//Aplicar o submit no form e não o Clique no botão -- depois
submitButton.addEventListener("click", changeProfile);

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

function CriaPost(post) {
  const feedTemplate = document.querySelector("#grid").content;
  const feedPost = feedTemplate.querySelector(".grid__box").cloneNode(true);

  const postImage = feedPost.querySelector(".grid__box-portrait-photo");
  const postTitle = feedPost.querySelector(".grid__content-title");

  postImage.src = post.link;
  postTitle.textContent = post.name;

  const feed = document.querySelector(".grid");
  feed.prepend(feedPost);
}
initialCards.forEach((item) => {
  CriaPost(item);
});

const addPostForm = popupAddPost.querySelector(".form");
function AddPost(evt) {
  evt.preventDefault();

  const titleInput = addPostForm.querySelector("#title");
  const imgInput = addPostForm.querySelector("#imageURL");

  const post = {
    name: titleInput.value,
    link: imgInput.value,
  };

  CriaPost(post);

  popupPostState();
  titleInput.value = "";
  imgInput.value = "";
}

addPostForm.addEventListener("submit", AddPost);
