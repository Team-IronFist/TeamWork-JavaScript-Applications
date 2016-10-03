import {templates} from './../template.js'
import {createUser} from './../models/user.js'
import {popup} from './popup-controller.js'
import { users } from '../data.js'

var usersController = function () {
  const Successful_Login_Message = "Logged in successfully";
  const Successful_Registration_Message = "Your registration was successful";
  const Successful_Change_Password_Message = "Your password has been changed successfully";
  const successfulLogoutMessage = "You have Logged out successfully";
  const Successful_Delete_User_Message = "You have deleted this user successfully";
  const Successful_Edit_User_Message = "You have edited this user successfully";

  let tryToLog = function (username, password) {
    users.logUser(username, password)
      .then((data) => {
        popup('#infoBox', Successful_Login_Message);
        document.location = '#/home'

        //Display currentUser
        if (username) {
          $('#span-username').text(data.result.DisplayName);
          $('#link-register').addClass('hidden');
          $('#link-login').addClass('hidden');
          $('#logout').removeClass('hidden');
          $('#user-posts').removeClass('hidden');
          $('#user-cars').removeClass('hidden');
          $('#link-addcar').removeClass('hidden');
        }
        if (data.result.Role === users.Administrator_Role_Hash) {
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

          users.registerUser(username, password, attributes)
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
     $('#user-cars').addClass('hidden');
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
          users.userChangePassword(username, password, newPassword)
            .then(() => {
              popup('#infoBox', Successful_Change_Password_Message);
            })
            .catch((error) => {
              popup('#errorBox', error.message);
            });
        });
      });
  }

  function getUserByUserName(context, username) {
    let foundUser;
    users.userByUserName(username)
      .then((user) => {
        foundUser = user;
        return templates.get('user-info')
      })
      .then((template)=>{
        context.$element().html(template(foundUser));
      })
      .catch((error) => console.log(error));
  }

  function idFromUrl(url) {
    return url.path.substring(url.path.lastIndexOf('/') + 1);
  }

  function deleteUser(context) {
    let id = idFromUrl(context);
    users.userDelete(id)
      .then(() => {
        console.log('User successfully deleted.');
        popup('#infoBox', Successful_Delete_User_Message);
        document.location = '#/settings/all-users';
      })
      .catch((error) => {
        popup('#errorBox', error.message);
        document.location = '#/settings/all-users';
      });
  }

  function editUser(context) {
    let id = idFromUrl(context);

    users.userGetById(id)
      .then((data) => {
        templates.get('settings-edit-user')
          .then(function (template) {
            context.$element().html(template);
            $('#tb-edit-email').val(data.Email);
            $('#tb-edit-displayName').val(data.DisplayName);
            $('#btn-edit').on('click', function () {
              let email = $('#tb-edit-email').val();
              let displayName = $('#tb-edit-displayName').val();
              if (email === data.Email && displayName === data.DisplayName) {
                document.location = '#/settings/all-users';
                return;
              }

              users.userEdit(id, displayName, email)
                .then(() => {
                  console.log('User successfully edited.');
                  popup('#infoBox', Successful_Edit_User_Message);
                  document.location = '#/settings/all-users';
                })
                .catch((error) => {
                  popup('#errorBox', error.message);
                  document.location = '#/settings/all-users';
                });
            });
          });
      })
      .catch(console.log);
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
