import {validationConfig} from './constants.js'

export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    // this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._Config = Config;
  }


  // // Показать ошибки при вводе в полях ввода
// _showInputError = () => {
//   this._formError = this._formElement.querySelector(`.${this._inputSelectort.id}-error`);
//   this._inputSelector.classList.add(this._inputErrorClass);
//   this._formError.textContent = this._inputSelector.validationMessage;
//   this._formError.classList.add(this._errorClass);
// };


// Показать ошибки при вводе в полях ввода
_showInputError = (inputElement) => {
  this._formError = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this._inputErrorClass);
  this._formError.textContent = inputElement.validationMessage;
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
    this._showInputError(inputElement);
  } else {
    this._hideInputError(inputElement);
  };
};


// Функция активации кнопки
_enableButton = () => {
  this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
  this._submitButtonSelector.removeAttribute('disabled');
};


// Функция дезактивации кнопки
_disableButton = () => {
  this._submitButtonSelector.classList.add(this._inactiveButtonClass);
  this._submitButtonSelector.setAttribute('disabled', true);
}

// Проверка: есть ли хоть одно невалидное поле
_hasInvalidInput = (formInputs) => {
  return formInputs.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}


_setEventListeners = () => {
  this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  this._disableButton();

  this._inputList.forEach((input) => {
    input.addEventListener('input', () => {
      this._checkInputValidity(input);
      if (this._hasInvalidInput(this._inputList)) {
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

  this._formElement.setEventListeners ();
}


}



