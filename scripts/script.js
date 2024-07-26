//Criacao de post
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

//Ouvinte de criacao de post
addPostForm.addEventListener("submit", AddPost);
