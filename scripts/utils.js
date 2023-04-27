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

  // // Функция открытия карточки
  // const openPopupImage = (card) => {
  //   openPopup(popupImageOpened);
  //   photoPopupImage.src = card.link;
  //   photoPopupImage.alt = card.name;
  //   titlePopupImage.textContent = card.name;
  // };

  export { openPopup, closePopup }
