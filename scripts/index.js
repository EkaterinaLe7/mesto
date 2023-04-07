


const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob= document.querySelector('.profile__occupation');

// Переменные для редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_profile-edit');
const saveEditProfileButton= popupEditProfile.querySelector('.popup__button');
const formElementEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = popupEditProfile.querySelector('.popup__input_content_name');
const jobInput = popupEditProfile.querySelector('.popup__input_content_occupation');

// Переменная для создания карточки
const photoTemplate = document.querySelector('.photo-template').content;

// Переменная для открытия карточки
const popupOpenImageCard = document.querySelector('.popup_type_card-opened');
const popupImage = popupOpenImageCard.querySelector('.popup__image');
const popupTitle = popupOpenImageCard.querySelector('.popup__figcaption');

// Переменные для добавления карточек
const popupAddImage = document.querySelector('.popup_type_image-add');
const formElementAddCard = popupAddImage.querySelector('.popup__form');
const titleAddPopupInput = popupAddImage.querySelector('.popup__input_content_title');
const imageAddPopupInput = popupAddImage.querySelector('.popup__input_content_image');

const photoItemsElements = document.querySelector('.elements__photo-items');
const photoCard = document.querySelector('.photo-item');

// Переменная для закрытия попапа
const closeButtons = document.querySelectorAll('.popup__button-close');

// Переменная для закрытия попапа по нажатию на overlay
const popupList = Array.from(document.querySelectorAll('.popup'));


// Функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
};

//Дезактивация кнопки при откратии попапа
const disableButtonOpenPopup = (popup) => {
  const formButton = popup.querySelector('.popup__button');
  disableButton(formButton, {inactiveButtonClass: validationConfig.inactiveButtonClass});
}

// Скрытие ошибок при откратии попапа
const hideErrors = (form) => {
  const inputs = form.querySelectorAll('.popup__input');

  inputs.forEach(input => {
    hideInputError(form, input);
  })
};

// Функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
};

// Закрытие попапа при нажатии на кнопку закрытия
closeButtons.forEach((button) => {
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
  })
}

closePopupByClickOnOverlay()

// Функция закрытия попапа по нажатию на Escape
const closePopupByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    if (activePopup) {
      closePopup(activePopup);
    };
  };
 }


// Редактирование профиля
const openEditPopup = () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  disableButtonOpenPopup(popupEditProfile);
  hideErrors(formElementEditProfile);
};

const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

// Открытие формы для добавления карточек
const openAddCardPopup = () => {
  openPopup(popupAddImage);
  formElementAddCard.reset();
  disableButtonOpenPopup(popupAddImage);
  hideErrors(formElementAddCard);
};

// Функция добавления лайка карточке
const handleCardLike = (event) => {
  const likeButton = event.target.closest('.photo-item__like-btn');
  likeButton.classList.toggle('photo-item__like-btn_active');
 };

 // Функция удаления карточки
const handleCardDelete = (event) => {
  const card = event.target.closest('.photo-item');
  card.remove();
 };

// Функция создания карточки
const createPhotoCard = (item) => {
  const photoItem = photoTemplate.querySelector('.photo-item').cloneNode(true);

  const cardImage = photoItem.querySelector('.photo-item__img');
  const cardTitle = photoItem.querySelector('.photo-item__title');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  const addlikeButton = photoItem.querySelector('.photo-item__like-btn');
  addlikeButton.addEventListener('click', handleCardLike);

  const deleteButton = photoItem.querySelector('.photo-item__delete-btn');
  deleteButton.addEventListener('click', handleCardDelete);

  // Функция открытия карточки
  function openCardImage () {
    openPopup(popupOpenImageCard);
      popupImage.src = cardImage.src;
      popupImage.alt = cardImage.alt;
      popupTitle.textContent = cardTitle.textContent;
  };

  // Открытие карточки
  cardImage.addEventListener('click', openCardImage);

  return photoItem;
};

// Добавление карточек из массива
initialCards.forEach ((item) => {
  const newCard = createPhotoCard (item);
  photoItemsElements.append(newCard);
});

// Добавление карточки из формы
const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();

  const card = {
    name: titleAddPopupInput.value,
    link: imageAddPopupInput.value
  };

  const newCard = createPhotoCard (card);
  photoItemsElements.prepend (newCard);

  closePopup(popupAddImage);
};


editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddCardPopup);
formElementEditProfile.addEventListener('submit', handleEditFormSubmit);
formElementAddCard.addEventListener('submit', handleAddCardFormSubmit);
