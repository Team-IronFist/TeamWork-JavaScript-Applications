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
              console.log((JSON.stringify(data)));
            },
            function(error){
              console.log((JSON.stringify(data)));
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
            var module = createUser();
            let user = module.getUser(username, password, displayName, email);
            let attributes = {
                  Email: user.EMail,
                  DisplayName: user.DisplayName
            };
            dataAccess.Users.register(username, password, attributes,
              function(data) {
                console.log((JSON.stringify(data)));
              },
              function(error) {
                console.log((JSON.stringify(error)));
              });
          });
        });
  }

  return {
    register: register,
    login: login
  };
}();
