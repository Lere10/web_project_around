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

//funcao de editar perfil
function changeProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileBio.textContent = inputBio.value;
  popupState();
}

//ouvinte de mudanca de perfil
submitButton.addEventListener("submit", changeProfile);
