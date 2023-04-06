const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}


//const form = document.querySelector('.popup__form');

// Функция, которая добавляет класс с ошибкой
//const showInputError = (element, errorElement) => {
  //element.classList.add('form__input_type_error');
 // errorElement.classList.add('popup__error_visible');
//};

// Функция, которая удаляет класс с ошибкой
//const hideInputError = (element, errorElement) => {
  //element.classList.remove('form__input_type_error');
  //errorElement.classList.remove('popup__error_visible');
//};

const showInputError = (formElement, inputElement, errorMessage) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('popup__error_visible');
};

const hideInputError = (formElement, inputElement) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  formError.classList.remove('popup__error_visible');
  formError.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};



const hasInvalidInput = (formInputs) => {
  return formInputs.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

//Функция активации кнопки
const enableButton = (button, { inactiveButtonClass }) => {
  button.classList.remove(inactiveButtonClass);
  button.removeAttribute('disabled');
};

//Функция дезактивации кнопки
const disableButton = (button, {inactiveButtonClass}) => {
  button.classList.add(inactiveButtonClass);
  button.setAttribute('disabled', true);
}

//const toggleButtonState = (formInputs, formButton) => {
  //if (hasInvalidInput(formInputs)) {
    //disableButton(formButton);
  //} else {
    //enableButton(formButton);
  //}
//}

const setEventListeners = (formElement, { inputSelector, submitButtonSelector, ...rest }) => {
  const formInputs = Array.from(formElement.querySelectorAll(inputSelector));
  const formButton = formElement.querySelector(submitButtonSelector);
  disableButton(formButton, rest);

  formInputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      //toggleButtonState(formInputs, formButton);
      if (hasInvalidInput(formInputs)) {
        disableButton(formButton, rest);
      } else {
        enableButton(formButton, rest);
      }
    });
  });
};


//if (hasInvalidInput(formInputs)) {
  //disableButton(formButton);
//} else {
  //enableButton(formButton);
//}

//const checkInputValidity = (input) => {
  //const formError = document.querySelector(`.${input.id}-error`);

  //if (input.checkValidity()) {
    //formError.textContent = '';
    //hideInputError(input, formError);
  //} else {
   // formError.textContent = input.validationMessage;
    //showInputError(input, formError);
 // }
//}


//---------
// Функция, которая проверяет валидность поля
  //const isValid = () => {
    //if (!formInput.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      //showInputError(formInput);
   // } else {
      // Если проходит, скроем
     // hideInputError(formInput);
   // }
  //};

  // Вызовем функцию isValid на каждый ввод символа
 // formInput.addEventListener('input', isValid);

//------------





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
