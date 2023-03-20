const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];



let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let profileName = document.querySelector('.profile__name');
let profileJob= document.querySelector('.profile__occupation');

//let popup = document.querySelector('.popup');
let popupEditProfile = document.querySelector('.popup_type_profile-edit');
let closeEditProfileButton = popupEditProfile.querySelector('.popup__button-close');
let saveEditProfileButton= popupEditProfile.querySelector('.popup__button-save');
let formElemenEditProfile = popupEditProfile.querySelector('.popup__form');
let nameInput = popupEditProfile.querySelector('.popup__input_content_name');
let jobInput = popupEditProfile.querySelector('.popup__input_content_occupation');

let popupAddImage = document.querySelector('.popup_type_image-add');
let closeAddImageButton = popupAddImage.querySelector('.popup__button-close');
let formElemenAddProfile = popupAddImage.querySelector('.popup__form');

const photoTemplate = document.querySelector('.photo-template').content;
const photoItemsElements = document.querySelector('.elements__photo-items');

//let closeButton = document.querySelector('.popup__button-close');


function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

function openEditPopup () {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};





function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function openAddPopup () {
  openPopup(popupAddImage);
  formElemenAddProfile.reset();
};

function handleAddFormSubmit (evt) {
  evt.preventDefault();
  closePopup(popupAddImage);
};

initialCards.forEach(addPhotoCard);

function addPhotoCard (item) {
  const photoItem = photoTemplate.querySelector('.photo-item').cloneNode(true);
  photoItem.querySelector('.photo-item__img').src = item.link;
  photoItem.querySelector('.photo-item__img').alt = item.name;
  photoItem.querySelector('.photo-item__title').textContent = item.name;

  photoItemsElements.append(photoItem);
};



editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);
closeEditProfileButton.addEventListener('click', () => {closePopup(popupEditProfile)});
closeAddImageButton.addEventListener('click', () => {closePopup(popupAddImage)});
formElemenEditProfile.addEventListener('submit', handleEditFormSubmit);
formElemenAddProfile.addEventListener('submit', handleAddFormSubmit);
