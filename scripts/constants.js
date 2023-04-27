const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Переменная для открытия карточки
const popupImageOpened = document.querySelector('.popup_type_card-opened');
const photoPopupImage = popupImageOpened.querySelector('.popup__image');
const titlePopupImage = popupImageOpened.querySelector('.popup__figcaption');

export { validationConfig, popupImageOpened, photoPopupImage, titlePopupImage }
