export default class Card {
	constructor (data, templateSelector, openImagePopup) {
		this._name = data.name;
		this._link = data.link;
		this._templateSelector = templateSelector;
    this._openImagePopup = openImagePopup;
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
  this._cardImage.alt = this._link;
  this._element.querySelector('.photo-item__title').textContent = this._name;

  this._setEventListeners();

  // Вернём элемент наружу
  return this._element;
  }

  _setEventListeners() {
    this._buttonLike = this._element.querySelector('.photo-item__like-btn');
    this._buttonLike.addEventListener('click', () => {
      this._handleCardLike();
    });

    this._element.querySelector('.photo-item__delete-btn').addEventListener('click', () => {
      this._handleCardDelete();
    });

    this._cardImage.addEventListener('click', () => {
      // Функция открытия карточки с фотографией
      this._openImagePopup({
        name: this._name,
        link: this._link
      });
    });
  }

  // Функция добавления лайка карточке
  _handleCardLike = () => {
    this._buttonLike.classList.toggle('photo-item__like-btn_active');
  }

  // Функция удаления карточки
  _handleCardDelete = () => {
    this._element.remove();
    this._element = null;
  }


}

