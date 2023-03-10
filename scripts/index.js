let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let formElemen = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_content_name');
let jobInput = document.querySelector('.popup__input_content_occupation');
let saveButton= document.querySelector('.popup__button-save');
let closeButton = document.querySelector('.popup__button-close');
let profileName = document.querySelector('.profile__name');
let profileJob= document.querySelector('.profile__occupation');

function popupOpen () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

function popupClose () {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupClose ()
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
formElemen.addEventListener('submit', handleFormSubmit);
