export default class Card {
	constructor ({name, link, likes, owner}, { handleCardClick, handleLike, handleDislike, handleDeleteCard }, templateSelector, userId) {
		this._name = name;
		this._link = link;
    this._likes = likes;
    this._owner = owner;
		this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
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

  this._drawLikesCounter();
  // this._element.querySelector('.photo-item__like-counter').textContent = this._likes.length;

  this._setEventListeners();

  // Вернём элемент наружу
  return this._element;
  }

  _setEventListeners() {
    this._buttonLike = this._element.querySelector('.photo-item__like-btn');
    this._buttonLike.addEventListener('click', () => {
      if(this._isLiked()) {
        console.log('лайк должен быть удален')
        this._handleDislike();
        // this._handleCardLike();
      } else {
        console.log('лайк будет добавлен');
        this._handleLike();
      }
      // this._handleCardLike();
      this._drawLikesCounter()
    });

    this._element.querySelector('.photo-item__delete-btn').addEventListener('click', () => {
      this._handleCardDelete();

    });

    this._cardImage.addEventListener('click', () => {
      // Функция открытия карточки с фотографией
      this._handleCardClick({
          name: this._name,
          link: this._link
        });
    });
  }

  // Функция добавления лайка карточке
  // _handleCardLike = () => {
  //   this._buttonLike.classList.toggle('photo-item__like-btn_active');
  // }

  // Функция удаления карточки
  _handleCardDelete = () => {
    this._element.remove();
    this._element = null;
  }

  _drawLikesCounter() {
    this._element.querySelector('.photo-item__like-counter').textContent = this._likes.length;
    // this._buttonLike = this._element.querySelector('.photo-item__like-btn');

    if(this._isLiked()) {
      this._element.querySelector('.photo-item__like-btn').classList.add('photo-item__like-btn_active');
    } else {
      this._element.querySelector('.photo-item__like-btn').classList.remove('photo-item__like-btn_active');
    }
  }




  _isLiked() {
    return this._likes.find((item) => {
      console.log(item._id);
      console.log(this._userId);
      return item._id === this._userId;
    }
    );

  }





  updateLikes(likesArray) {
    this._likes = likesArray;
    this._drawLikesCounter();
  }
}

// --------------------

// export default class Card {
// 	constructor ({name, link, likes, owner}, { handleCardClick, handleLike, handleDislike, handleDeleteCard }, templateSelector, userId) {
// 		this._name = name;
// 		this._link = link;
//     this._likes = likes;
//     this._owner = owner;
// 		this._templateSelector = templateSelector;
//     this._handleCardClick = handleCardClick;
//     this._handleLike = handleLike;
//     this._userId = userId;
//   }

// 	_getTemplate() {
//   // забираем разметку из HTML и клонируем элемент
//     const cardElement = document
//     .querySelector(this._templateSelector)
//     .content
//     .querySelector('.photo-item')
//     .cloneNode(true);

//   // вернём DOM-элемент карточки
//     return cardElement;
//   }

// 	generateCard() {
//   // Запишем разметку в приватное поле _element.
//   this._element = this._getTemplate();

//   // Добавим данные
//   this._cardImage = this._element.querySelector('.photo-item__img');
//   this._cardImage.src = this._link;
//   this._cardImage.alt = this._name;
//   this._element.querySelector('.photo-item__title').textContent = this._name;

//   // this._drawLikesContainer();
//   this._element.querySelector('.photo-item__like-counter').textContent = this._likes.length;

//   this._setEventListeners();

//   // Вернём элемент наружу
//   return this._element;
//   }

//   _setEventListeners() {
//     this._buttonLike = this._element.querySelector('.photo-item__like-btn');
//     this._buttonLike.addEventListener('click', () => {
//       if(this.isLiked()) {
//         console.log('лайк должен быть удален')
//         this._handleLike();
//       } else {
//         console.log('лайк будет добавлен');
//       }
//       // this._handleCardLike();
//       // this._drawLikesContainer()
//     });

//     this._element.querySelector('.photo-item__delete-btn').addEventListener('click', () => {
//       this._handleCardDelete();

//     });

//     this._cardImage.addEventListener('click', () => {
//       // Функция открытия карточки с фотографией
//       this._handleCardClick({
//           name: this._name,
//           link: this._link
//         });
//     });
//   }

//   // Функция добавления лайка карточке
//   // _handleCardLike = () => {
//   //   this._buttonLike.classList.toggle('photo-item__like-btn_active');
//   // }

//   // Функция удаления карточки
//   _handleCardDelete = () => {
//     this._element.remove();
//     this._element = null;
//   }

//   // _drawLikesContainer() {
//   //   this._element.querySelector('.photo-item__like-counter').textContent = this._likes.length;
//   //   // this._buttonLike = this._element.querySelector('.photo-item__like-btn');

//   //   if(this._isLiked()) {
//   //     this._element.querySelector('.photo-item__like-btn').classList.add('photo-item__like-btn_active');
//   //   } else {
//   //     this._element.querySelector('.photo-item__like-btn').classList.remove('photo-item__like-btn_active');
//   //   }
//   // }




//   // _isLiked() {
//   //   return this._likes.filter((item) => {
//   //    item._id === this._userId;
//   //    console.log(item._id);
//   //     console.log(this._userId);
//   //   }
//   //   );

//   // }

//   isLiked() {
//     // return this._isLiked;
//     return this._likes.filter((item) => {
//          item._id === this._userId;
//          console.log(item._id);
//           console.log(this._userId);
//         }
//         );
// }

// setLike(data) {
//     this._isLiked = data.likes.filter((item) => { return item._id == this._currentId; }).length > 0; // проверяем что лайк есть и он мой
//     this._element.querySelector('.photo-item__like-counter').textContent = data.likes.length;
//     if (this._isLiked) {
//         this._element.querySelector('.photo-item__like-btn').classList.add('photo-item__like-btn_active');
//     } else {
//         this._element.querySelector('.photo-item__like-btn').classList.remove('photo-item__like-btn_active');
//     }
// }



//   updateLikes(data) {
//     this._likes = data.likes;
//     this._drawLikesContainer();
//   }
// }
