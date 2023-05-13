import './index.css';

import { initialCards } from '../utils/initial-cards.js';
import {
  cardListSection,
  buttonOpenEditProfile,
  buttonOpenAddImageForm,
  formEdit,
  formAddImage,
  photoTemplateSelector
 } from '../utils/constants.js';
import { validationConfig } from '../utils/config.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


// Функция создания карточки
const generateCardItem = (data) => {
    const card = new Card(
      data,
      {
        handleCardClick: (data) => {
          imagePopupOpened.openPopup(data);
        }
      },
      photoTemplateSelector
      );

    const cardElement = card.generateCard();

    return cardElement;
  }

const imagePopupOpened = new PopupWithImage('.popup_type_card-opened');
imagePopupOpened.setEventListeners();

const cardList = new Section({
  data: initialCards,
  renderer: (cardItem) => {
    const cardElement = generateCardItem(cardItem);

    cardList.addItem(cardElement, false);
  }
}, cardListSection);

cardList.renderItems();

// Создание экземпляров класса валидации форм
const formEditProfileValidation = new FormValidator (validationConfig, formEdit);
formEditProfileValidation.enableValidation();

const formAddImageValidation = new FormValidator (validationConfig, formAddImage);
formAddImageValidation.enableValidation();

const newUserInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__occupation'
}
);

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile-edit',
  handleFormSubmit: (data) => {
    newUserInfo.setUserInfo(data);
  }
});

popupEditProfile.setEventListeners();

//Открытие попапа для редактирования профиля
const openEditProfilePopup = () => {
  popupEditProfile.setData(newUserInfo.getUserInfo());

  popupEditProfile.openPopup();
  formEditProfileValidation.resetValidation();
}

//Открытие попапа для добавления карточки
const openAddCardPopup = () => {
  popupAddImageCard.openPopup();
  formAddImageValidation.resetValidation();
}

const popupAddImageCard = new PopupWithForm({
  popupSelector: '.popup_type_image-add',
  handleFormSubmit: (data) => {
    const newCardElement = generateCardItem({
      name: data.photoname,
      link: data.imagelink
    });

    cardList.addItem(newCardElement, true);
  }
});

popupAddImageCard.setEventListeners();

buttonOpenEditProfile.addEventListener('click', openEditProfilePopup);
buttonOpenAddImageForm.addEventListener('click', openAddCardPopup);
