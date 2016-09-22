function createUser(){
  class User {
    constructor(username, displayName, password, email) {
      this._username = username;
      this._displayName = displayName;
      this._password = password;
      this._email = email;
    }

    get Username(){
      return this._username;
    }
    set Username(value){
        this._username = value;
    }

    get DisplayName(){
      return this._displayName;
    }
    set DisplayName(value){
        this._displayName = value;
    }

    get Password(){
      return this._password;
    }
    set Password(value){
        this._password = value;
    }

    get EMail(){
      return this._email;
    }
    set EMail(value){
        this._email = value;
    }

  }
  return {
    getUser: function (username, displayName, password, email){
      return new User(username, displayName, password, email)
      }
    }
}
