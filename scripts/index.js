const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob= document.querySelector('.profile__occupation');

// Переменные для редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_profile-edit');
const closeEditProfileButton = popupEditProfile.querySelector('.popup__button-close');
const saveEditProfileButton= popupEditProfile.querySelector('.popup__button-save');
const formElementEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = popupEditProfile.querySelector('.popup__input_content_name');
const jobInput = popupEditProfile.querySelector('.popup__input_content_occupation');

// Переменные для добавления карточек
const popupAddImage = document.querySelector('.popup_type_image-add');
const closeAddImageButton = popupAddImage.querySelector('.popup__button-close');
const formElementAddCard = popupAddImage.querySelector('.popup__form');

const photoItemsElements = document.querySelector('.elements__photo-items');
const photoCard = document.querySelector('.photo-item');

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

// Функция закрытия попапа
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

// Редактирование профиля
function openEditPopup () {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

// Открытие формы для добавления карточек
function openAddCardPopup () {
  openPopup(popupAddImage);
  formElementAddCard.reset();
};

// Функция создания карточки
function createPhotoCard (item) {
  const photoTemplate = document.querySelector('.photo-template').content;
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

  // Переменная для открытия карточки
  const popupOpenImageCard = document.querySelector('.popup_type_card-opened');

  // Функция открытия карточки
  function openCardImage () {
    openPopup(popupOpenImageCard);

      const popupImage = popupOpenImageCard.querySelector('.popup__image');
      const popupTitle = popupOpenImageCard.querySelector('.popup__figcaption');

      popupImage.src = cardImage.src;
      popupImage.alt = cardImage.alt;
      popupTitle.textContent = photoItem.cardTitle.textContent;
  };

  // Открытие карточки
  cardImage.addEventListener('click', openCardImage);

  //Закрытие карточки
  const closeImageCardButton = popupOpenImageCard.querySelector('.popup__button-close');
  closeImageCardButton.addEventListener('click', () => closePopup(popupOpenImageCard));

  return photoItem;
};

// Добавление карточек из массива
initialCards.forEach (function (item) {
  const newCard = createPhotoCard (item);

  photoItemsElements.append(newCard);
});

// Добавление карточки из формы
function handleAddCardFormSubmit (evt) {
  evt.preventDefault();

  const titleAddPopupInput = popupAddImage.querySelector('.popup__input_content_title');
  const imageAddPopupInput = popupAddImage.querySelector('.popup__input_content_image');

  const card = {
    name: titleAddPopupInput.value,
    link: imageAddPopupInput.value
  };

  const newCard = createPhotoCard (card);
  photoItemsElements.prepend(newCard);

  closePopup(popupAddImage);
};

// Функция добавления лайка карточке
function handleCardLike (event) {
  const likeButton = event.target.closest('.photo-item__like-btn');
  likeButton.classList.toggle('photo-item__like-btn_active');
 };

// Функция удаления карточки
function handleCardDelete (event) {
  const card = event.target.closest('.photo-item');
  card.remove();
 };


editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddCardPopup);
closeEditProfileButton.addEventListener('click', () => {closePopup(popupEditProfile)});
closeAddImageButton.addEventListener('click', () => {closePopup(popupAddImage)});
formElementEditProfile.addEventListener('submit', handleEditFormSubmit);
formElementAddCard.addEventListener('submit', handleAddCardFormSubmit);
