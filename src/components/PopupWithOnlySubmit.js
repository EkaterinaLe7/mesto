import Popup from "./Popup.js";

export default class PopupWithOnlySubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._buttonSubmit = this._popupForm.querySelector('.popup__button');
    this._buttonSubmitContentText = this._buttonSubmit.textContent;
  }

  setSubmitAction(func) {
    this._submitFunction = func;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._submitFunction();
    });
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._buttonSubmit.textContent = 'Удаление...';
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitContentText;
    }
  }
}
