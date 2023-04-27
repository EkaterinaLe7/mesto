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

// Переменная для создания карточки
// const photoTemplate = document.querySelector('.photo-template').content;

// // Переменная для открытия карточки
// const popupImageOpened = document.querySelector('.popup_type_card-opened');
// const photoPopupImage = popupImageOpened.querySelector('.popup__image');
// const titlePopupImage = popupImageOpened.querySelector('.popup__figcaption');

// Переменные для добавления карточек
const popupAddImageCard = document.querySelector('.popup_type_image-add');
const formElementAddImageCardPopup = popupAddImageCard.querySelector('.popup__form');
const titleInputAddImageCardPopup = popupAddImageCard.querySelector('.popup__input_content_title');
const imageInputAddImageCardPopup = popupAddImageCard.querySelector('.popup__input_content_image');

const photoItemsElements = document.querySelector('.elements__photo-items');
// const photoCard = document.querySelector('.photo-item');

// Переменная для закрытия попапа
const buttonsClosePopup = document.querySelectorAll('.popup__button-close');

// Переменная для закрытия попапа по нажатию на overlay
const popupList = Array.from(document.querySelectorAll('.popup'));

const formEditProfileValidation = new FormValidator (validationConfig, formElementEditProfilePopup);
formEditProfileValidation.enableValidation();

const formAddImageValidation = new FormValidator (validationConfig, formElementAddImageCardPopup);
formAddImageValidation.enableValidation();


// // Функция открытия попапа
// const openPopup = (popup) => {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupByEscape);
// };



// // Функция закрытия попапа
// const closePopup = (popup) => {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupByEscape);
// };

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

// // Функция закрытия попапа по нажатию на Escape
// const closePopupByEscape = (evt) => {
//   if (evt.key === 'Escape') {
//     const activePopup = document.querySelector('.popup_opened');
//     if (activePopup) {
//       closePopup(activePopup);
//     };
//   };
//  };




// //Дезактивация кнопки при откратии попапа
// const disableButtonOpenPopup = (popup) => {
//   const formButton = popup.querySelector('.popup__button');
//   disableButton(formButton, {inactiveButtonClass: validationConfig.inactiveButtonClass});
// }

// // Скрытие ошибок при откратии попапа
// const hideErrors = (form) => {
//   const inputs = form.querySelectorAll('.popup__input');

//   inputs.forEach(input => {
//     hideInputError(form, input, {inputErrorClass: validationConfig.inputErrorClass, errorClass: validationConfig.errorClass});
//   });
// };

// // Редактирование профиля
// const openEditPopup = () => {
//   openPopup(popupEditProfile);
//   nameInputEditProfilePopup.value = profileName.textContent;
//   jobInputEditProfilePopup.value = profileJob.textContent;
//   disableButtonOpenPopup(popupEditProfile);
//   hideErrors(formElementEditProfilePopup);
// };


// Редактирование профиля
const openEditPopup = () => {
  openPopup(popupEditProfile);
  nameInputEditProfilePopup.value = profileName.textContent;
  jobInputEditProfilePopup.value = profileJob.textContent;
  // formEditProfileValidation.disableButton();
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
  // formAddImageValidation.disableButton();
  formAddImageValidation.resetValidation();
};

// // Открытие формы для добавления карточек
// const openAddCardPopup = () => {
//   openPopup(popupAddImageCard);
//   formElementAddImageCardPopup.reset();
//   disableButtonOpenPopup(popupAddImageCard);
//   hideErrors(formElementAddImageCardPopup);
// };


// // Функция добавления лайка карточке
// const handleCardLike = (event) => {
//   const buttonLike = event.target.closest('.photo-item__like-btn');
//   buttonLike.classList.toggle('photo-item__like-btn_active');
//  };

//  // Функция удаления карточки
// const handleCardDelete = (event) => {
//   const card = event.target.closest('.photo-item');
//   card.remove();
//  };


// // Функция открытия карточки
// const openPopupImage = (card) => {
//   openPopup(popupImageOpened);
//   photoPopupImage.src = card.link;
//   photoPopupImage.alt = card.name;
//   titlePopupImage.textContent = card.name;
// };

// ------------------------
// // Функция создания карточки
// const createPhotoCard = (item) => {
//   const photoItem = photoTemplate.querySelector('.photo-item').cloneNode(true);

//   const cardImage = photoItem.querySelector('.photo-item__img');
//   const cardTitle = photoItem.querySelector('.photo-item__title');
//   cardImage.src = item.link;
//   cardImage.alt = item.name;
//   cardTitle.textContent = item.name;

//   const buttonAddlike = photoItem.querySelector('.photo-item__like-btn');
//   buttonAddlike.addEventListener('click', handleCardLike);

//   const buttonDelete = photoItem.querySelector('.photo-item__delete-btn');
//   buttonDelete.addEventListener('click', handleCardDelete);


//   // Открытие карточки
//   cardImage.addEventListener('click', () => openPopupImage(item));

//   return photoItem;
// };
// ------------------------------

// Добавление карточек из массива
initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, '.photo-template');
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  photoItemsElements.append(cardElement);
});


// initialCards.forEach ((item) => {
//   const newCard = createPhotoCard (item);
//   photoItemsElements.append(newCard);
// });

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

  // const newCard = createPhotoCard (card);
  photoItemsElements.prepend (cardElement);

  closePopup(popupAddImageCard);
};


buttonOpenEditProfile.addEventListener('click', openEditPopup);
buttonOpenAddImageForm.addEventListener('click', openAddCardPopup);
formElementEditProfilePopup.addEventListener('submit', handleEditFormSubmit);
formElementAddImageCardPopup.addEventListener('submit', handleAddCardFormSubmit);
