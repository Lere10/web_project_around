import "./main.css";
import Card from "../components/Card.js";
import FormValidity from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";
import closeIconpng from "./images/popup__closeicon.png";

const api = new Api(`https://around.nomoreparties.co/v1/web-ptbr-cohort-12`, {
  headers: {
    authorization: "c5f89901-0404-4ab2-ab83-c8e3c6dc51b4",
    "Content-Type": "application/json",
  },
});

const closeIcon = document.getElementById("closeIcon");
closeIcon.src = closeIconpng;

const profile = document.querySelector(".profile");
const addPostButton = profile.querySelector(".profile__button-add-post");
const buttonOpenForm = profile.querySelector(".profile__button-open-form");
const editAvatarButton = profile.querySelector(".profile__edit-pencil");

//chatGPTilson
api.getUser().then((userData) => {
  const userId = userData._id;
  api.getInitialCards().then((initialCards) => {
    console.log(`Cards criados: `, initialCards);
    const section = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          const card = new Card(
            item,
            "#grid",
            userId,
            (data) => {
              const popupWithImage = new PopupWithImage(".grid__display");
              popupWithImage.open(data);
              popupWithImage.setEventListener();
            },
            () => {
              const deleteForm = new PopupWithConfirmation(
                "#popupDeletePost",
                () => {
                  api.deleteCard(item._id);
                  console.log(`Id excluído: ${item._id}`);
                  card.deleteCard();
                }
              );

              deleteForm.open();
              deleteForm.setEventListener();
            },
            () => {
              //chatGPT
              const hasOwnLike = item.likes.some((like) => {
                like._id === userId;
              });
              if (hasOwnLike) {
                return api.apiDislike(item._id).then((updatedCard) => {
                  card.setLike(false, updatedCard.likes.length);
                  item.likes = updatedCard.likes;
                });
              } else {
                return api.apiLike().then((updatedCard) => {
                  card.setLike(true, updatedCard.likes.length);
                  item.likes = updatedCard.likes;
                });
              }
              // api.getUser().then((userData) => {
              //   const hasOwnLike = item.likes.some((id) => {
              //     id === userData._id;
              //   });
              //   if (hasOwnLike) {
              //     api.apiDislike(item._id).then((updatedCard) => {
              //       card.setLike(false);
              //       item.likes = updatedCard.likes;
              //     });
              //   } else {
              //     api.apiLike(item._id).then((updatedCard) => {
              //       card.setLike(true);
              //       item.likes = updatedCard.likes;
              //     });
              //   }
              // });
            }
          );
          //const hasOwnLike = item.likes.find((id) => {
          //   id === userData._id;
          // });
          // if (hasOwnLike) {
          //   card.setLike(true);
          // }

          //---------------------------------------------
          api.getUser().then((userData) => {
            if (userData._id === item.owner._id) {
              card.addDeleteIcon();
            }
          });

          const cardElement = card.generateCard(item);
          section.addItem(cardElement);
        },
      },
      ".grid"
    );
    section.renderer();
  });
});

//chatGPTilson

// api.getInitialCards().then((initialCards) => {
//   console.log(`Cards criados: `, initialCards);
//   const section = new Section(
//     {
//       items: initialCards,
//       renderer: (item) => {
//         const card = new Card(
//           item,
//           "#grid",
//           userId,
//           (data) => {
//             const popupWithImage = new PopupWithImage(".grid__display");
//             popupWithImage.open(data);
//             popupWithImage.setEventListener();
//           },
//           () => {
//             const deleteForm = new PopupWithConfirmation(
//               "#popupDeletePost",
//               () => {
//                 api.deleteCard(item._id);
//                 console.log(`Id excluído: ${item._id}`);
//                 card.deleteCard();
//               }
//             );

//             deleteForm.open();
//             deleteForm.setEventListener();
//           },
//           () => {
//             //chatGPT
//             const hasOwnLike = item.likes.some((like) => {
//               like._id === userId;
//             });
//             if (hasOwnLike) {
//               api.apiDislike(item._id).then((updatedCard) => {
//                 card.setLike(false, updatedCard.likes.length);
//                 item.likes = updatedCard.likes;
//               });
//             } else {
//               api.apiLike().then((updatedCard) => {
//                 card.setLike(true, updatedCard.likes.length);
//                 item.likes = updatedCard.likes;
//               });
//             }
//             // api.getUser().then((userData) => {
//             //   const hasOwnLike = item.likes.some((id) => {
//             //     id === userData._id;
//             //   });
//             //   if (hasOwnLike) {
//             //     api.apiDislike(item._id).then((updatedCard) => {
//             //       card.setLike(false);
//             //       item.likes = updatedCard.likes;
//             //     });
//             //   } else {
//             //     api.apiLike(item._id).then((updatedCard) => {
//             //       card.setLike(true);
//             //       item.likes = updatedCard.likes;
//             //     });
//             //   }
//             // });
//           }
//         );
//         //const hasOwnLike = item.likes.find((id) => {
//         //   id === userData._id;
//         // });
//         // if (hasOwnLike) {
//         //   card.setLike(true);
//         // }

//         //---------------------------------------------
//         api.getUser().then((userData) => {
//           if (userData._id === item.owner._id) {
//             card.addDeleteIcon();
//           }
//         });

//         const cardElement = card.generateCard(item);
//         section.addItem(cardElement);
//       },
//     },
//     ".grid"
//   );
//   section.renderer();
// });

const userInfo = new UserInfo({
  name: ".profile__info-name",
  bio: ".profile__info-bio",
  link: ".profile__photo",
});

api
  .getUser()
  .then((userData) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
  })
  .then(() => {});

//api.setNewCard();---------------------------------------------<><><>

const popupForm = new PopupWithForm("#popupPost", (data) => {
  //inicio instancia card
  const newCard = new Card(
    data,
    "#grid",
    (data) => {
      const popupWithImage = new PopupWithImage(".grid__display");
      popupWithImage.open(data);
      popupWithImage.setEventListener();
    },
    () => {
      const deleteForm = new PopupWithConfirmation("#popupDeletePost", () => {
        newCard.deleteCard();
        console.log(`oooia aq maxo rei: ${data}`);
      });
      deleteForm.open();
      deleteForm.setEventListener();
    },
    () => {
      api.getUser().then((userData) => {
        const hasOwnLike = item.likes.some((id) => {
          id === userData._id;
        });
        if (hasOwnLike) {
          api.apiDislike(item._id).then((updatedCard) => {
            card.setLike(false, updatedCard.likes.length);
            item.likes = updatedCard.likes;
          });
        } else {
          api.apiLike(item._id).then((updatedCard) => {
            card.setLike(true, updatedCard.likes.length);
            item.likes = updatedCard.likes;
          });
        }
      });
    }
  );
  //fim da instancia card

  const feed = document.querySelector(".grid");
  api.setNewCard(data).then((card) => {
    const newCardElement = newCard.generateCard(card);
    feed.append(newCardElement);
    //AQUI QUE A MÁGICA ACONTECE -<
  });
  popupForm.close();
});
popupForm.setEventListener();

const popupUser = new PopupWithForm("#popupUser", (data) => {
  userInfo.setUserInfo(data);
  api.setNewUser(data);
  popupUser.close();
});
popupUser.setEventListener();

//Popup editar avatar
const popupAvatar = new PopupWithForm("#popupUserAvatar", (data) => {
  userInfo.setUserAvatar(data);
  api.setNewAvatar(data);
  popupAvatar.close();
});
popupAvatar.setEventListener();

editAvatarButton.addEventListener("click", () => {
  popupAvatar.open();
});

buttonOpenForm.addEventListener("click", () => {
  const currentProfile = userInfo.getUserInfo();
  document.querySelector(".form__input-name").value = currentProfile.name;
  document.querySelector(".form__input-bio").value = currentProfile.bio;
  popupUser.open();
});
addPostButton.addEventListener("click", () => {
  popupForm.open();
});

const selectors = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input-error-message",
  errorClass: "form__input-error",
};

const formList = Array.from(document.querySelectorAll(selectors.formSelector));
formList.forEach((formElement) => {
  const formValidation = new FormValidity(selectors, formElement);
  const formEnable = formValidation.enableValidation();
});
