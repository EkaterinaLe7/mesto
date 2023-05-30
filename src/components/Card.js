export default class Card {
	constructor ({name, link, likes, owner}, { handleCardClick, handleLike, handleDislike, handleDeleteCard }, templateSelector, userId) {
		this._name = name;
		this._link = link;
    this._likes = likes;
    this._owner = owner;
		this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleCardDelete = handleDeleteCard;
    this._handleDislike = handleDislike;
    this._userId = userId;
  }

	_getTemplate() {
  // забираем разметку из HTML и клонируем элемент
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.photo-item')
    .cloneNode(true);

  // вернём DOM-элемент карточки
    return cardElement;
  }

	generateCard() {
  // Запишем разметку в приватное поле _element.
  this._element = this._getTemplate();

  // Добавим данные
  this._cardImage = this._element.querySelector('.photo-item__img');
  this._cardImage.src = this._link;
  this._cardImage.alt = this._name;
  this._element.querySelector('.photo-item__title').textContent = this._name;

  this._buttonLike = this._element.querySelector('.photo-item__like-btn');
  this._buttonDelete = this._element.querySelector('.photo-item__delete-btn')

  this._drawLikesCounter();

  if(this._owner._id !== this._userId) {
    this._buttonDelete.remove();
  }

  this._setEventListeners();

  // Вернём элемент наружу
  return this._element;
  }

  _setEventListeners() {

    this._buttonLike.addEventListener('click', () => {
      if(this._isLiked()) {
        this._handleDislike();
      } else {
        this._handleLike();
      }
    });

    if(this._buttonDelete) {
      this._buttonDelete.addEventListener('click', () => {
        this._handleCardDelete();

      });
    }

    this._cardImage.addEventListener('click', () => {
      // Функция открытия карточки с фотографией
      this._handleCardClick({
          name: this._name,
          link: this._link
        });
    });
  }

  // Функция удаления карточки
  cardDelete = () => {
    this._element.remove();
    this._element = null;
  }

  _drawLikesCounter() {
    this._element.querySelector('.photo-item__like-counter').textContent = this._likes.length;

    if(this._isLiked()) {
      this._buttonLike.classList.add('photo-item__like-btn_active');
    } else {
      this._buttonLike.classList.remove('photo-item__like-btn_active');
    }
  }

  _isLiked() {
    return this._likes.find((item) => {
      return item._id === this._userId;
    }
    );
  }

  updateLikes(likesArray) {
    this._likes = likesArray;
    this._drawLikesCounter();
  }
}
