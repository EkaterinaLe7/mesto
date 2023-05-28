export default class UserInfo {
  constructor({userNameSelector, userInfoSelector, userAvatarSelector} ) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userInfoSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
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
    // this._userAvatar.src = data.avatar;
  }

  // setUserInfo(data) {
  //   this._userName.textContent = data.username;
  //   this._userJob.textContent = data.useroccupation;
  // }
}
