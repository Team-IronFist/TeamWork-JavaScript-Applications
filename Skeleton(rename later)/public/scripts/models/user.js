function createUser(){
  class User {
    constructor(id, username, displayName, password, email) {
      this._id = id;
      this._username = username;
      this._displayName = displayName;
      this._password = password;
      this._email = email;
    }

    get Id(){
      return this._id;
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
    getUser: function (id, username, displayName, password, email){
      return new User(id, username, displayName, password, email)
    }
  }
}

export {createUser}