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
import { api } from '../components/Api.js';

// api.getInitialCards()
//  .then((res) => {
//     // console.log('res===>', res);
//     cardList.renderItems(res);
//  });

//  api.getUserInfo()
//   .then((res) => {
//     console.log('res===>', res);
//     newUserInfo.setUserInfo(res);
//   });

  api.getAppInfo()
    .then((results) => {
      cardList.renderItems(results[0]);
      newUserInfo.setUserInfo(results[1]);
    });

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
  // data: initialCards,
  renderer: (cardItem) => {
    const cardElement = generateCardItem(cardItem);

    cardList.addItem(cardElement, false);
  }
}, cardListSection);



// Создание экземпляров класса валидации форм
const formEditProfileValidation = new FormValidator (validationConfig, formEdit);
formEditProfileValidation.enableValidation();

const formAddImageValidation = new FormValidator (validationConfig, formAddImage);
formAddImageValidation.enableValidation();

const newUserInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__occupation',
  userAvatarSelector: '.profile__avatar'
}
);

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile-edit',
  handleFormSubmit: (data) => {
    api.setUserInfo(data)
      .then((res) =>{
        newUserInfo.setUserInfo(res);
      })

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
    api.createCard(data)
      .then((res) => {
        console.log('res!!', res);
        // const newCardElement = generateCardItem({
        //   name: res.photoname,
        //   link: res.imagelink
        // });

        const newCardElement = generateCardItem(res);

        cardList.addItem(newCardElement, true);
      })




  }
});

popupAddImageCard.setEventListeners();

buttonOpenEditProfile.addEventListener('click', openEditProfilePopup);
buttonOpenAddImageForm.addEventListener('click', openAddCardPopup);
