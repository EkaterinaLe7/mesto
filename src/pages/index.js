import './index.css';

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
import PopupWithOnlySubmit from '../components/PopupWithOnlySubmit.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

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
        handleDeleteCard: () => {
          poupDeleteCard.openPopup();
          poupDeleteCard.setSubmitAction(() => {
            poupDeleteCard.renderLoading(true);
            api.deliteCard(data._id)
            .then(() => {
              card.cardDelete();
              poupDeleteCard.closePopup()
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              poupDeleteCard.renderLoading(false);
            });
          })
        }
      },
      photoTemplateSelector,
      userId
      );

    const cardElement = card.generateCard();

    return cardElement;
  }

const poupDeleteCard = new PopupWithOnlySubmit('.popup_type_confirm-delete');
poupDeleteCard.setEventListeners();

const imagePopupOpened = new PopupWithImage('.popup_type_card-opened');
imagePopupOpened.setEventListeners();

const cardList = new Section({
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
}
);

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile-edit',
  handleFormSubmit: (data) => {
    popupEditProfile.renderLoading(true);
    api.setUserInfo(data)
      .then((res) => {
        newUserInfo.setUserInfo(res);
        popupEditProfile.closePopup()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditProfile.renderLoading(false);
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
    popupEditAvatar.renderLoading(true);
    api.editAvatar(data)
      .then((res) => {
        userAvatar.style.backgroundImage = `url(${res.avatar})`;
        popupEditAvatar.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditAvatar.renderLoading(false);
      })
  }
});

popupEditAvatar.setEventListeners();

//Открытие попапа для редактирования аватара
const openEditAvatarpopup = () => {
  popupEditAvatar.openPopup();
  formEditAvatarValidation.resetValidation();
}



const popupAddImageCard = new PopupWithForm({
  popupSelector: '.popup_type_image-add',
  handleFormSubmit: (data) => {
    popupAddImageCard.renderLoading(true);
    api.createCard(data)
      .then((res) => {
        const newCardElement = generateCardItem(res);

        cardList.addItem(newCardElement, true);
        popupAddImageCard.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAddImageCard.renderLoading(false);
      })
  }
});

popupAddImageCard.setEventListeners();

//Открытие попапа для добавления карточки
const openAddCardPopup = () => {
  popupAddImageCard.openPopup();
  formAddImageValidation.resetValidation();
}

api.getAppInfo()
.then(([cardsArray, userData]) => {
  newUserInfo.setUserInfo(userData);
  userAvatar.style.backgroundImage = `url(${userData.avatar})`;
  userId = userData._id;
  cardList.renderItems(cardsArray);
})
.catch((err) => {
  console.log(err);
});



userAvatar.addEventListener('click', openEditAvatarpopup);
buttonOpenEditProfile.addEventListener('click', openEditProfilePopup);
buttonOpenAddImageForm.addEventListener('click', openAddCardPopup);
