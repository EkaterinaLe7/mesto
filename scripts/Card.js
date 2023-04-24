import { popupImageOpened, photoPopupImage, titlePopupImage, openPopup, openPopupImage } from './utils.js'

export default class Card {
	constructor (data, templateSelector) {
		this._name = data.name;
		this._link = data.link;
		this._templateSelector = templateSelector;
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
  this._setEventListeners()
  // Добавим данные
  this._element.querySelector('.photo-item__img').src = this._link;
  this._element.querySelector('.photo-item__img').alt = this._link;
  this._element.querySelector('.photo-item__title').textContent = this._name;

  // Вернём элемент наружу
  return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.photo-item__like-btn').addEventListener('click', () => {
      this._handleCardLike();
    });

    this._element.querySelector('.photo-item__delete-btn').addEventListener('click', () => {
      this._handleCardDelete();
    });

    this._element.querySelector('.photo-item__img').addEventListener('click', () => {
      this._openImageModalWindow();
    });
  }

  // Функция добавления лайка карточке
  _handleCardLike = () => {
    this._element.querySelector('.photo-item__like-btn').classList.toggle('photo-item__like-btn_active');
  }

  // Функция удаления карточки
  _handleCardDelete = () => {
    this._element.remove();
  }

  // _openImageModalWindow = () => {
  //   openPopupImage({
  //     name: this._name,
  //     link: this._link
  //   });
  // }

  // ----
  //2 var
  _openImageModalWindow = () => {
    photoPopupImage.src = this._link;
    photoPopupImage.alt = this._name;
    titlePopupImage.textContent = this._name;
    openPopup(popupImageOpened);
  }


}

