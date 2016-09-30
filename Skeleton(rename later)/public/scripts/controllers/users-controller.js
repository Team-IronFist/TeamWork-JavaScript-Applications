import {templates} from './../template.js'
import {createUser} from './../models/user.js'
import {popup} from './popup-controller.js'
import {
    registerUser, logUser, userChangePassword, userLogOut,
    userByUserName, userDelete, userEdit, Administrator_Role_Hash, getCurrentUser
} from '../data.js'

var usersController = function () {
  const Successful_Login_Message = "Logged in successfully";
  const Successful_Registration_Message = "Your registration was successful";
  const Successful_Change_Password_Message = "Your password has been changed successfully";
  const successfulLogoutMessage = "You have Logged out successfully";
  const Successful_Delete_User_Message = "You have deleted this user successfully";
  const Successful_Edit_User_Message = "You have edited this user successfully";

  let tryToLog = function (username, password) {
      logUser(username, password)
        .then((data) => {
            popup('#infoBox', Successful_Login_Message);
            document.location = '#/home'

            //Display currentUser
            if (username) {
              $('#span-username').text(data.result.DisplayName);
              $('#link-register').addClass('hidden');
              $('#link-login').addClass('hidden');
              $('#logout').removeClass('hidden');
              $('#link-addcar').removeClass('hidden');
            }
            if (data.result.Role === Administrator_Role_Hash) {
              $('#link-settings').removeClass('hidden');
            }
          })
        .catch((error) => {
            popup('#errorBox', error.message);
            console.log(error);
        });
      }

  function login(context) {
    templates.get('login')
      .then(function (template) {
        context.$element().html(template)

        $('#btn-login').on('click', function () {
          let username = $('#tb-login-username').val();
          let password = $('#tb-login-password').val();
          tryToLog(username, password);
        });
        $('#tb-login-password').on('keydown', function (ev) {
          if (ev.which == 13 || ev.keycode == 13) {

            let username = $('#tb-login-username').val();
            let password = $('#tb-login-password').val();
            tryToLog(username, password);
          }
        })
      });
  };

  function register(context) {
    templates.get('register')
      .then(function (template) {
        context.$element().html(template);

        $('#btn-register').on('click', function () {
          let username = $('#tb-username').val();
          let password = $('#tb-password').val();
          let displayName = $('#tb-display-name').val();
          let email = $('#tb-email').val();

          let attributes = {
            Email: email,
            DisplayName: displayName
          };

          registerUser(username, password, attributes)
            .then(() => {
                popup('#infoBox', Successful_Registration_Message);
                tryToLog(username, password);
            })
            .catch((err) => {
                console.log(err);
                popup('#errorBox', error.message);
            });
        });
      });
  }

  function removeDataFromLocalStorage() {
    userLogOut();
    localStorage.removeItem("username");
    localStorage.removeItem("authKey");
    localStorage.removeItem("displayName");
    localStorage.removeItem("accessToken");
  }

  function logout() {
    removeDataFromLocalStorage();
    $('#logout').addClass('hidden');
    popup('#infoBox', successfulLogoutMessage)
    $('#link-register').removeClass('hidden');
    $('#link-login').removeClass('hidden');
    $('#link-settings').addClass('hidden');
    $('#link-addcar').addClass('hidden');
    document.location = '#/';
  }

  function facebookLogin(context) {
  }

  function changePassword(context) {
    templates.get('change-password')
      .then(function (template) {
        context.$element().html(template);
        let username,
          password,
          newPassword;

        $('#btn-change-password').on('click', function () {
          username = $('#tb-current-username').val();
          password = $('#tb-current-password').val();
          newPassword = $('#tb-new-password').val();
          userChangePassword(username, password, newPassword)
            .then(() => {
                popup('#infoBox', Successful_Change_Password_Message);
            })
            .catch((error) => {
                popup('#errorBox', error.message);
            });
        });
      });
  }

  function getUserByUserName(username) {
      userByUserName(username)
        .then(/* TODO template for current user */)
        .catch(console.log);
  }

  function deleteUser(context){
    templates.get('settings-delete-user')
      .then(function (template) {
        context.$element().html(template);
    });

    let id = 1;// TODO get from current table row username and id.
    userDelete(id)
        .then(() => {
            console.log('User successfully deleted.');
            popup('#infoBox', Successful_Delete_User_Message);
        })
        .catch((error) => {
            popup('#errorBox', error.message);
        });
  }

  function editUser(context){
    templates.get('settings-edit-user')
      .then(function (template) {
        context.$element().html(template);
    });

    let id = 1;// TODO get from current table row username and id.
    let displayName = '';// TODO get from current table row username and id.
    userEdit(id, displayName)
        .then(() => {
            console.log('User successfully edited.');
            popup('#infoBox', Successful_Edit_User_Message);
        })
        .catch((error) => {
            popup('#errorBox', error.message);
        });
  }

  function displayUser(context){
    getCurrentUser()
      .then((data) => {
        templates.get('user-info')
          .then(function (template) {
            console.log(data.result);
            context.$element().html(template(data.result));
        });
      })
      .catch(console.log);
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
