import {templates} from './../template.js'
import {createUser} from './../models/user.js'
import {popup} from './popup-controller.js'

var usersController = function () {
  const Authentication_Key = 'zhumgwq8m2cn6p2e';
  const Administrator_Role_Hash = '372d6b60-8102-11e6-9eb4-3157f6092d16';
  const Successful_Login_Message = "Logged in successfully";
  const Successful_Registration_Message = "Your registration was successful";
  const Successful_Change_Password_Message = "Your password has been changed successfully";
  const successfulLogoutMessage = "You have Logged out successfully";
  const Successful_Delete_User_Message = "You have deleted this user successfully";
  const Successful_Edit_User_Message = "You have edited this user successfully";

  let dataAccess = new Everlive(Authentication_Key);

  let tryToLog = function (username, password) {
    dataAccess.authentication.login(username, password,
      function (data) {
        popup('#infoBox', Successful_Login_Message);
        document.location = '#/home'

        //Display currentUser
        dataAccess.Users.currentUser()
          .then(function (data) {
            localStorage.setItem("username", data.result.Username);
            localStorage.setItem("displayName", data.result.DisplayName);
            localStorage.setItem("authKey", data.result.Id);
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
          },
          function (error) {
            popup('#errorBox', error.message);
            console.log(JSON.stringify(error));
          });

        console.log((JSON.stringify(data)));
      },
      function (error) {
        popup('#errorBox', error.message);
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
          dataAccess.Users.register(username, password, attributes,
            function (data) {
              let id = data.result.Id;
              var module = createUser();
              let user = module.getUser(id, username, displayName, password, email);

              console.log(user);
              popup('#infoBox', Successful_Registration_Message);
              tryToLog(username, password);
            },
            function (error) {
              popup('#errorBox', error.message)
            });
        });
      });
  }

  function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("authKey");
    $('#logout').addClass('hidden');
    popup('#infoBox', successfulLogoutMessage)
    $('#link-register').removeClass('hidden');
    $('#link-login').removeClass('hidden');
    $('#link-settings').addClass('hidden');
    $('#link=addcar').addClass('hidden');
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
          dataAccess.Users.changePassword(username, // username
            password, // current password
            newPassword, // new password
            true, // keep the user's tokens
            function (data) {
              console.log(JSON.stringify(data));
              popup('#infoBox', Successful_Change_Password_Message);

            },
            function (error) {
              popup('#errorBox', error.message);
            });
        });

      });
  }

  function getUserByUserName(username) {
    let filter = new Everlive.Query();
    filter.where().eq("Username", username);

    dataAccess.Users.get(filter)
      .then((data) => {
        let selectedUser = data.result[0];
        // TODO template for current user
        console.log(selectedUser)
      });
  }

  function deleteUser(context){
    templates.get('settings-delete-user')
      .then(function (template) {
        context.$element().html(template);
    });
    // TODO get from current table row username and id.
    dataAccess.Users.destroySingle({ Id: '' },
    function(){
        console.log('User successfully deleted.');
        popup('#infoBox', Successful_Delete_User_Message);
    },
    function(error){
        popup('#errorBox', error.message);
    })
  }

  function editUser(context){
    templates.get('settings-edit-user')
      .then(function (template) {
        context.$element().html(template);
    });
    // TODO get from current table row username and id.
    dataAccess.Users.updateSingle({ 'Id': '', 'DisplayName': '' },
    function(data){
      popup('#infoBox', Successful_Edit_User_Message);
    },
    function(error){
      popup('#errorBox', error.message);
    });
  }

  return {
    register: register,
    login: login,
    logout: logout,
    changePassword: changePassword,
    getUserByUserName: getUserByUserName,
    deleteUser: deleteUser,
    editUser: editUser
  };
} ();

export {usersController}
