export default class UserInfo {
  constructor({userNameSelector, userInfoSelector }, userAvatar ) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userInfoSelector);
    this._userAvatar = userAvatar;
  }

  getUserInfo() {
    this._userInfo = {
      username: this._userName.textContent,
      useroccupation: this._userJob.textContent,
    }

    return this._userInfo;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.about;
  }

  setUserAvatar(data) {
    this._userAvatar.style.backgroundImage = `url(${data.avatar})`;
  }
}
