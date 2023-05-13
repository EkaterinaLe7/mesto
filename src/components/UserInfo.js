export default class UserInfo {
  constructor({userNameSelector, userInfoSelector} ) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userInfoSelector);
  }

  getUserInfo() {

    this._userInfo = {
      username: this._userName.textContent,
      useroccupation: this._userJob.textContent,
    }

    return this._userInfo;
  }

  setUserInfo(data) {
    this._userName.textContent = data.username;
    this._userJob.textContent = data.useroccupation;
  }
}
