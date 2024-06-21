let profile = document.querySelector(".profile");

let buttonOpenForm = profile.querySelector(".profile__button-open-form");
let popup = document.querySelector(".popup");
let closePopup = popup.querySelector(".popup__closer");

let submitButton = popup.querySelector(".form");
let inputName = popup.querySelector(".form__input-name");
let inputBio = popup.querySelector(".form__input-bio");
let profileName = profile.querySelector(".profile__info-name");
let profileBio = profile.querySelector(".profile__info-bio");

const addPostButton = profile.querySelector(".profile__button-add-post");
const popupAddPost = document.querySelector(".popup__addpost");
const closePopupPost = popupAddPost.querySelector(".popup__closer");

function popupState() {
  popup.classList.toggle("popup_opened");
  inputName.value = profileName.textContent;
  inputBio.value = profileBio.textContent;
}
function popupPostState() {
  popupAddPost.closest(".popup").classList.toggle("popup_opened");
  console.log("oi");
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

function CriaPost(post) {
  const feedTemplate = document.querySelector("#grid").content;
  const feedPost = feedTemplate.querySelector(".grid__box").cloneNode(true);

  const postImage = feedPost.querySelector(".grid__box-portrait-photo");
  const postTitle = feedPost.querySelector(".grid__content-title");

  postImage.src = post.link;
  postImage.alt = post.name;
  postTitle.textContent = post.name;

  feedPost
    .querySelector(".grid__delete-button")
    .addEventListener("click", function (evt) {
      evt.target.closest(".grid__box").remove();
    });

  feedPost
    .querySelector(".grid__content-like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("grid__content-like_active");
    });

  feedPost
    .querySelector(".grid__box-portrait-photo")
    .addEventListener("click", function (evt) {
      const displayPhoto = evt.target.closest(".grid__box");
      const photoPost = displayPhoto.querySelector(".grid__display");
      photoPost.querySelector(".grid__display-image").src = post.link;
      photoPost.querySelector(".grid__display-title").textContent = post.name;
      photoPost.classList.toggle("grid__display_opened");
    });

  feedPost
    .querySelector(".grid__display-closer")
    .addEventListener("click", function (evt) {
      const photoPost = evt.target
        .closest(".grid__box")
        .querySelector(".grid__display");
      photoPost.classList.toggle("grid__display_opened");
    });

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
