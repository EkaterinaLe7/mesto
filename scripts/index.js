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

// Переменные для редактирования профиля
let popupEditProfile = document.querySelector('.popup_type_profile-edit');
let closeEditProfileButton = popupEditProfile.querySelector('.popup__button-close');
let saveEditProfileButton= popupEditProfile.querySelector('.popup__button-save');
let formElementEditProfile = popupEditProfile.querySelector('.popup__form');
let nameInput = popupEditProfile.querySelector('.popup__input_content_name');
let jobInput = popupEditProfile.querySelector('.popup__input_content_occupation');

// Переменные для добавления карточек
let popupAddImage = document.querySelector('.popup_type_image-add');
let closeAddImageButton = popupAddImage.querySelector('.popup__button-close');
let formElementAddCard = popupAddImage.querySelector('.popup__form');

const photoItemsElements = document.querySelector('.elements__photo-items');
const photoCard = document.querySelector('.photo-item');


// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

// Функция закрытия попапа
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

// Редактирование профиля
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

// Открытие формы для добавления карточек
function openAddCardPopup () {
  openPopup(popupAddImage);
  formElementAddCard.reset();
};

// Функция создания карточки
function createPhotoCard (item) {
  const photoTemplate = document.querySelector('.photo-template').content;
  const photoItem = photoTemplate.querySelector('.photo-item').cloneNode(true);
  photoItem.querySelector('.photo-item__img').src = item.link;
  photoItem.querySelector('.photo-item__img').alt = item.name;
  photoItem.querySelector('.photo-item__title').textContent = item.name;

  const addlikeButton = photoItem.querySelector('.photo-item__like-btn');
  addlikeButton.addEventListener('click', handleCardLike);

  const deleteButton = photoItem.querySelector('.photo-item__delete-btn');
  deleteButton.addEventListener('click', handleCardDelete);

  return photoItem;
};

//Добавление карточек из массива
initialCards.forEach (function (item) {
  const newCard = createPhotoCard (item);

  photoItemsElements.append(newCard);
});

// Добавление карточки из формы
function handleAddCardFormSubmit (evt) {
  evt.preventDefault();

  const titleAddPopupInput = popupAddImage.querySelector('.popup__input_content_title');
  const imageAddPopupInput = popupAddImage.querySelector('.popup__input_content_image');

  const card = {
    name: titleAddPopupInput.value,
    link: imageAddPopupInput.value
  };

  const newCard = createPhotoCard (card);
  photoItemsElements.prepend(newCard);

  closePopup(popupAddImage);
};




editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddCardPopup);
closeEditProfileButton.addEventListener('click', () => {closePopup(popupEditProfile)});
closeAddImageButton.addEventListener('click', () => {closePopup(popupAddImage)});
formElementEditProfile.addEventListener('submit', handleEditFormSubmit);
formElementAddCard.addEventListener('submit', handleAddCardFormSubmit);
