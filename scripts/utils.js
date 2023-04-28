// Переменная для открытия карточки
const popupImageOpened = document.querySelector('.popup_type_card-opened');
const photoPopupImage = popupImageOpened.querySelector('.popup__image');
const titlePopupImage = popupImageOpened.querySelector('.popup__figcaption');


// Функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
};

// Функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
};

// Функция закрытия попапа по нажатию на Escape
const closePopupByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    if (activePopup) {
      closePopup(activePopup);
    };
  };
 };

// Функция открытия карточки
  const openImagePopup = (card) => {
    openPopup(popupImageOpened);
    photoPopupImage.src = card.link;
    photoPopupImage.alt = card.name;
    titlePopupImage.textContent = card.name;
  };

  export { openPopup, openImagePopup, closePopup }

