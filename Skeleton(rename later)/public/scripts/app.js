(function() {
var sammyApp = Sammy('#content', function() {

  this.get('#/home', homeController.all);

  this.get('#/login', usersController.login);
  this.get('#/change-password', usersController.changePassword);

  this.get('#/register', usersController.register);

  this.get('#/posts', postController.all);
  this.get('#/posts/create', postController.create);
  //this.get('#/post/delete', postsController.delete);

  //this.get('#/comment', commentsController.all);
  //this.get('#/comment/add', commentsController.add);
  //this.get('#/comment/delete', commentsController.delete);

  //this.get('#/events', eventsController.all);
  this.get('#/contact', contactController.all);
});

$(function() {
  sammyApp.run('#/');
});

function checkForLoggedUser() {
    dataAccess.Users.currentUser()
      .then((user) => {
        if (user) {
          $('#span-username').text(user);
          $('#logout').addClass('hidden');
          $('#logout').removeClass('hidden');
        }
      });
    };

  // event for logout
  $('#btn-logout').on('click', function(){
    $('#logout').addClass('hidden');
    const successfulLogoutMessage = "You have Logged out successfully";
    $('#loadingBox').show();
    $('#infoBox').text(successfulLogoutMessage)
      .show()
      .delay(5000)
      .fadeOut();
    $('#loadingBox').hide();
  });
}());
