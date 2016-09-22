(function() {
var sammyApp = Sammy('#content', function() {

  this.get('#/', homeController.all);

  this.get('#/login', usersController.login);
  this.get('#/register', usersController.register);

  //this.get('#/post', postsController.all);
  //this.get('#/post/add', postsController.add);
  //this.get('#/post/delete', postsController.delete);

  //this.get('#/comment', commentsController.all);
  //this.get('#/comment/add', commentsController.add);
  //this.get('#/comment/delete', commentsController.delete);

  //this.get('#/events', eventsController.all);
});

$(function() {
  sammyApp.run('#/');
});
}());
