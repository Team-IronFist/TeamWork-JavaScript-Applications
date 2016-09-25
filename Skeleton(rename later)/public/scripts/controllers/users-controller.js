var usersController = function() {
  const authenticationKey = 'zhumgwq8m2cn6p2e';
  let dataAccess = new Everlive(authenticationKey);


  function login(context) {
    templates.get('login')
      .then(function(template){
        context.$element().html(template)
        $('#btn-login').on('click', function(){
          let username = $('#tb-login-username').val();
          let password = $('#tb-login-password').val();
          dataAccess.authentication.login(username, password,
            function (data) {
              const successfullLoginMessage = "Logged in successfully";
              $('#loadingBox').show();
              $('#infoBox').text(successfullLoginMessage)
                .show()
                .delay(5000)
                .fadeOut();
              $('#loadingBox').hide();

              //Display currentUser
              dataAccess.Users.currentUser()
                  .then(function (data) {
                    if (username) {
                      debugger;
                      $('#span-username').text(data.result.DisplayName);
                      $('#logout').addClass('hidden');
                      $('#logout').removeClass('hidden');
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
                const successfullRegistrationMessage = "Your registration was successful";
                $('#loadingBox').show();
                $('#infoBox').text(successfullRegistrationMessage)
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

  return {
    register: register,
    login: login
  };
}();
