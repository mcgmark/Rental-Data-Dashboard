export class UserModel {
  username: String;
  password: String;
  oauthProvider: String;
  oauthId: String;

  constructor() {
    this.username = '';
    this.password = '';
    this.oauthProvider = '';
    this.oauthId = '';
  }
};
