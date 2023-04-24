const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Показать ошибки при вводе в полях ввода
const showInputError = (formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(errorClass);
};

// Убрать ошибки при вводе в полях ввода
const hideInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  formError.classList.remove(errorClass);
  formError.textContent = '';
};


// Проверка поля ввода на валидность
const checkInputValidity = (formElement, inputElement, {...rest}) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, rest);
  } else {
    hideInputError(formElement, inputElement, rest);
  };
};


// Функция активации кнопки
const enableButton = (button, { inactiveButtonClass }) => {
  button.classList.remove(inactiveButtonClass);
  button.removeAttribute('disabled');
};

// // Функция дезактивации кнопки
// const disableButton = (button, {inactiveButtonClass}) => {
//   button.classList.add(inactiveButtonClass);
//   button.setAttribute('disabled', true);
// }

// Проверка: есть ли хоть одно невалидное поле
const hasInvalidInput = (formInputs) => {
  return formInputs.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}


const setEventListeners = (formElement, { inputSelector, submitButtonSelector, ...rest }) => {
  const formInputs = Array.from(formElement.querySelectorAll(inputSelector));
  const formButton = formElement.querySelector(submitButtonSelector);
  disableButton(formButton, rest);

  formInputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, rest);
      if (hasInvalidInput(formInputs)) {
        disableButton(formButton, rest);
      } else {
        enableButton(formButton, rest);
      }
    });
  });
};


const enableValidation = ({ formSelector, ...rest }) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
  })

  setEventListeners (formElement, rest);
  })
}


enableValidation(validationConfig);
