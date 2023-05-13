export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector('.popup__button-close');
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    };
  }

  setEventListeners() {
    this._buttonClose.addEventListener('click', () => this.closePopup());
    this._popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.closePopup();
      }
    });
  }
}






