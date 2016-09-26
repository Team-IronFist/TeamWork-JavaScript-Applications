var usersController = function() {
  const Authentication_Key = 'zhumgwq8m2cn6p2e';
  const Administrator_Role_Hash = '372d6b60-8102-11e6-9eb4-3157f6092d16';
  let dataAccess = new Everlive(Authentication_Key);


  function login(context) {
    templates.get('login')
      .then(function(template){
        context.$element().html(template)
        $('#btn-login').on('click', function(){
          let username = $('#tb-login-username').val();
          let password = $('#tb-login-password').val();

          dataAccess.authentication.login(username, password,
            function (data) {
              const Successful_Login_Message = "Logged in successfully";
              $('#loadingBox').show();
              $('#infoBox').text(Successful_Login_Message)
                .show()
                .delay(5000)
                .fadeOut();
              $('#loadingBox').hide();

              //Display currentUser
              dataAccess.Users.currentUser()
                  .then(function (data) {
                    localStorage.setItem("username", data.result.Username);
                    localStorage.setItem("authKey", data.result.Id);
                    if (username) {
                      $('#span-username').text(data.result.DisplayName);
                      $('#logout').addClass('hidden');
                      $('#link-register').addClass('hidden');
                      $('#link-login').addClass('hidden');
                      $('#logout').removeClass('hidden');
                    }
                    if (data.result.Role === Administrator_Role_Hash) {
                      $('#link-settings').removeClass('hidden');
                    }
                  },
                  function(error){
                      console.log(JSON.stringify(error));
                  });

              console.log((JSON.stringify(data)));
            },
            function(error){
              let errorMessage = error.message;
              $('#errorBox').text(errorMessage)
              .show();
            });
        });
      });
  };

  function register(context) {
      templates.get('register')
        .then(function(template){
          context.$element().html(template);

          $('#btn-register').on('click', function(){
            let username = $('#tb-username').val();
            let password = $('#tb-password').val();
            let displayName = $('#tb-display-name').val();
            let email = $('#tb-email').val();

            let attributes = {
                Email: email,
                DisplayName: displayName
            };
            dataAccess.Users.register(username, password, attributes,
              function(data) {
                let id = data.result.Id;
                var module = createUser();
                let user = module.getUser(id, username, displayName, password, email);
                console.log(user);
                const Successful_Registration_Message = "Your registration was successful";
                $('#loadingBox').show();
                $('#infoBox').text(Successful_Registration_Message)
                  .show()
                  .delay(5000)
                  .fadeOut();
                $('#loadingBox').hide();
              },
              function(error) {
                let errorMessage = error.message;
                $('#errorBox').text(errorMessage)
                .show();
              });
          });
        });
  }

  function facebookLogin(context){

  }

  function changePassword(context) {
    templates.get('change-password')
      .then(function(template){
        context.$element().html(template);
      let username,
          password,
          newPassword;

      $('#btn-change-password').on('click', function(){
            username = $('#tb-current-username').val();
            password = $('#tb-current-password').val();
            newPassword = $('#tb-new-password').val();
        dataAccess.Users.changePassword(username, // username
            password, // current password
            newPassword, // new password
            true, // keep the user's tokens
            function (data) {
                console.log(JSON.stringify(data));
                const Successful_Change_Password_Message = "Your password has been changed successfully";
                $('#loadingBox').show();
                $('#infoBox').text(Successful_Change_Password_Message)
                  .show()
                  .delay(5000)
                  .fadeOut();
                $('#loadingBox').hide();
            },
            function(error){
                console.log(JSON.stringify(error));
            });
      });

    });
  }
  return {
    register: register,
    login: login,
    changePassword: changePassword
  };
}();
