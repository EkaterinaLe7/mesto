import './index.css';

import { initialCards } from '../utils/initial-cards.js';
import {
  cardListSection,
  buttonOpenEditProfile,
  buttonOpenAddImageForm,
  formEdit,
  formAddImage,
  photoTemplateSelector,
  userAvatar,
  formEditAvatar
 } from '../utils/constants.js';
import { validationConfig } from '../utils/config.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';



// api.getInitialCards()
//  .then((res) => {
//     // console.log('res===>', res);
//     cardList.renderItems(res);
//  });

//  api.getUserInfo()
//   .then((res) => {
//     console.log('res===>', res);
//     newUserInfo.setUserInfo(res);
//     userId = res._id;
//   });

  // api.getUserInfo()
  // .then((res) => {
  //   console.log('res===>', res);
  //   newUserInfo.setUserInfo(res);
  //   userId = res._id;
  // });

  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
      authorization: 'e1c180e3-79bc-4925-aea2-ad0bf0c788ad',
      'Content-Type': 'application/json'
    }
  });

  let userId = null;

// Функция создания карточки
const generateCardItem = (data) => {
    const card = new Card(
      data,
      {
        handleCardClick: (data) => {
          imagePopupOpened.openPopup(data);
        },
        handleLike:() => {
          api.likeCard(data._id)
            .then((res) => {
              card.updateLikes(res.likes)
            })
        },
        handleDislike: () => {
          api.deleteLike(data._id)
            .then((res) => {
              card.updateLikes(res.likes)
            })
        },
        handleDeleteCard: () => {}
      },
      photoTemplateSelector,
      userId
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

const formEditAvatarValidation = new FormValidator (validationConfig, formEditAvatar);
formEditAvatarValidation.enableValidation();

const newUserInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__occupation',
  // userAvatarSelector: '.profile__avatar'
}
);

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile-edit',
  handleFormSubmit: (data) => {
    api.setUserInfo(data)
      .then((res) => {
        newUserInfo.setUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
      });

  }
});

popupEditProfile.setEventListeners();

//Открытие попапа для редактирования профиля
const openEditProfilePopup = () => {
  popupEditProfile.setData(newUserInfo.getUserInfo());

  popupEditProfile.openPopup();
  formEditProfileValidation.resetValidation();
}

const popupEditAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar-edit',
  handleFormSubmit: (data) => {
    api.editAvatar(data)
      .then((res) => {
        userAvatar.style.backgroundImage = `url(${res.avatar})`;
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
popupEditAvatar.setEventListeners();

const openEditAvatarpopup = () => {
  popupEditAvatar.openPopup();
  formEditAvatarValidation.resetValidation();
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
      .catch((err) => {
        console.log(err);
      });




  }
});

popupAddImageCard.setEventListeners();

api.getAppInfo()
.then(([cardsArray, userData]) => {
  newUserInfo.setUserInfo(userData);
  userAvatar.style.backgroundImage = `url(${userData.avatar})`;
  userId = userData._id;
  cardList.renderItems(cardsArray);
  // console.log(userId);
  // console.log(userData);
})
.catch((err) => {
  console.log(err);
});



userAvatar.addEventListener('click', openEditAvatarpopup);
buttonOpenEditProfile.addEventListener('click', openEditProfilePopup);
buttonOpenAddImageForm.addEventListener('click', openAddCardPopup);
