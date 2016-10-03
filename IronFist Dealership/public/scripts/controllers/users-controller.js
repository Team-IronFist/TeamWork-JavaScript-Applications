import {templates} from './../template.js'
import {createUser} from './../models/user.js'
import {popup} from './popup-controller.js'
import { users } from '../data.js'

var usersController = function () {
  const successfulLogoutMessage = "You have Logged out successfully";
  const Successful_Delete_User_Message = "You have deleted this user successfully";

  function login() {
    return new Promise((resolve, reject) => {
      templates.get('login')
        .then((template) => {
          resolve(template());
        })
        .catch(reject);
    });
  };

  function register() {
    return new Promise((resolve, reject) => {
      templates.get('register')
        .then((template) => {
          resolve(template());
        })
        .catch(reject);
    });
  }

  function removeDataFromLocalStorage() {
    users.userLogOut();
    localStorage.removeItem("username");
    localStorage.removeItem("authKey");
    localStorage.removeItem("displayName");
    localStorage.removeItem("accessToken");
  }

  function logout() {
    removeDataFromLocalStorage();
    $('#logout').addClass('hidden');
    $('#user-posts').addClass('hidden');
    popup('#infoBox', successfulLogoutMessage)
    $('#link-register').removeClass('hidden');
    $('#link-login').removeClass('hidden');
    $('#link-settings').addClass('hidden');
    $('#link-addcar').addClass('hidden');
    document.location = '#/';
  }

  function facebookLogin(context) {
  }

  function changePassword() {
    return new Promise((resolve, reject) => {
      templates.get('change-password')
        .then(function (template) {
          resolve(template());
        })
        .catch(reject);
    });
  }

  function getUserByUserName(username) {
    let foundUser;
    return new Promise((resolve, reject) => {
      users.userByUserName(username)
        .then((user) => {
          foundUser = user;
          return templates.get('user-info')
        })
        .then((template)=>{
          resolve(template(foundUser));
        })
        .catch(reject);
    });
  }

  function deleteUser(id) {
    return new Promise((resolve, reject) => {
      users.userDelete(id)
        .then(() => {
          popup('#infoBox', Successful_Delete_User_Message);
          document.location = '#/settings/all-users';
          resolve();
        })
        .catch((error) => {
          popup('#errorBox', error.message);
          document.location = '#/settings/all-users';
          reject(error);
        });
    });
  }

  function editUser(id) {
    return new Promise((resolve, reject) => {
      users.userGetById(id)
        .then((data) => {
          templates.get('settings-edit-user')
            .then(function (template) {
              let result = {};
              result.html = template();
              result.Email = data.Email;
              result.DisplayName = data.DisplayName;

              resolve(result);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }

  function displayUser() {
      return new Promise((resolve, reject) => {
        users.getCurrentUser()
            .then((data) => {
                templates.get('user-info')
                    .then(function (template) {
                        resolve(template(data.result));
                    })
                    .catch(reject);
            })
            .catch(reject);
      });
  }

  return {
    register,
    login,
    logout,
    changePassword,
    getUserByUserName,
    deleteUser,
    editUser,
    displayUser
  };
} ();

export {usersController}
