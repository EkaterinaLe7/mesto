import Popup from "./Popup.js";

export default class PopupWithOnlySubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._buttonSubmit = this._popupForm.querySelector('.popup__button');
  }

  setSubmitAction(func) {
    this._func = func;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._func();
    });
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._buttonSubmit.textContent = 'Удаление...';
    } else {
      this._buttonSubmit.textContent = 'Да';
    }
  }
}
