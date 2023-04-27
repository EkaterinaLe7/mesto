export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    // this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }


  // // Показать ошибки при вводе в полях ввода
// _showInputError = () => {
//   this._formError = this._formElement.querySelector(`.${this._inputSelectort.id}-error`);
//   this._inputSelector.classList.add(this._inputErrorClass);
//   this._formError.textContent = this._inputSelector.validationMessage;
//   this._formError.classList.add(this._errorClass);
// };


  // Показать ошибки при вводе в полях ввода
  _showInputError = (inputElement, errorMessage) => {
    this._formError = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._formError.textContent = errorMessage;
    this._formError.classList.add(this._errorClass);
  };

  // Убрать ошибки при вводе в полях ввода
  _hideInputError = (inputElement) => {
    this._formError = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._formError.classList.remove(this._errorClass);
    this._formError.textContent = '';
  };



  // // Проверка поля ввода на валидность
  // _checkInputValidity = () => {
  //   if (!this._inputSelector.validity.valid) {
  //     _showInputError();
  //   } else {
  //     hideInputError(formElement, inputElement, rest);
  //   };
  // };


  // Проверка поля ввода на валидность
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    };
  };


  // Функция активации кнопки
  _enableButton = () => {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.removeAttribute('disabled');
  };


  // Функция дезактивации кнопки
  _disableButton = () => {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute('disabled', true);
  }

  // Проверка: есть ли хоть одно невалидное поле
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

   //Убрать ошибки у всех полей ввода, используется в index.js
   resetValidation = () => {
    this._disableButton();

    this._inputList.forEach((input) => {
      this._hideInputError(input);
    })
  }


  _setEventListeners = () => {
    this._disableButton();

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        if (this._hasInvalidInput()) {
          this._disableButton();
        } else {
          this._enableButton();
        }
      });
    });
  };


  enableValidation = () => {
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    })

    this._setEventListeners();
  }

}



