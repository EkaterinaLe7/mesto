import { initialCards } from './initial-cards.js';
import Card from './Card.js';
import { openPopup, closePopup } from './utils.js';
import { validationConfig } from './constants.js';
import FormValidator from './FormvaVlidator.js';

const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const buttonOpenAddImageForm = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__occupation');

// Переменные для редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_profile-edit');
const formElementEditProfilePopup = popupEditProfile.querySelector('.popup__form');
const nameInputEditProfilePopup = popupEditProfile.querySelector('.popup__input_content_name');
const jobInputEditProfilePopup = popupEditProfile.querySelector('.popup__input_content_occupation');

// Переменные для добавления карточек
const popupAddImageCard = document.querySelector('.popup_type_image-add');
const formElementAddImageCardPopup = popupAddImageCard.querySelector('.popup__form');
const titleInputAddImageCardPopup = popupAddImageCard.querySelector('.popup__input_content_title');
const imageInputAddImageCardPopup = popupAddImageCard.querySelector('.popup__input_content_image');

const photoItemsElements = document.querySelector('.elements__photo-items');

// Переменная для закрытия попапа
const buttonsClosePopup = document.querySelectorAll('.popup__button-close');

// Переменная для закрытия попапа по нажатию на overlay
const popupList = Array.from(document.querySelectorAll('.popup'));

const formEditProfileValidation = new FormValidator (validationConfig, formElementEditProfilePopup);
formEditProfileValidation.enableValidation();

const formAddImageValidation = new FormValidator (validationConfig, formElementAddImageCardPopup);
formAddImageValidation.enableValidation();


// Закрытие попапа при нажатии на кнопку закрытия
buttonsClosePopup.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});


// Функция закрытия попапа по нажатию на overlay
const closePopupByClickOnOverlay = () => {

  popupList.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(popup);
      }
    });
  });
};

closePopupByClickOnOverlay()


// Редактирование профиля
const openEditPopup = () => {
  openPopup(popupEditProfile);
  nameInputEditProfilePopup.value = profileName.textContent;
  jobInputEditProfilePopup.value = profileJob.textContent;
  formEditProfileValidation.resetValidation();
};

const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInputEditProfilePopup.value;
  profileJob.textContent = jobInputEditProfilePopup.value;
  closePopup(popupEditProfile);
};

// Открытие формы для добавления карточек
const openAddCardPopup = () => {
  openPopup(popupAddImageCard);
  formElementAddImageCardPopup.reset();
  formAddImageValidation.resetValidation();
};


// Добавление карточек из массива
initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, '.photo-template');
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  photoItemsElements.append(cardElement);
});

// Добавление карточки из формы

const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();

  const card = {
    name: titleInputAddImageCardPopup.value,
    link: imageInputAddImageCardPopup.value
  };

  const newCard = new Card(card, '.photo-template');

// Создаём карточку и возвращаем наружу
  const cardElement = newCard.generateCard();
  photoItemsElements.prepend (cardElement);

  closePopup(popupAddImageCard);
};


buttonOpenEditProfile.addEventListener('click', openEditPopup);
buttonOpenAddImageForm.addEventListener('click', openAddCardPopup);
formElementEditProfilePopup.addEventListener('submit', handleEditFormSubmit);
formElementAddImageCardPopup.addEventListener('submit', handleAddCardFormSubmit);
