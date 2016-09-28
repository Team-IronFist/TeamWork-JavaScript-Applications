import {homeController} from './controllers/home-controller.js'
import {contactController} from './controllers/contact-controller.js'
import {postController} from './controllers/post-controller.js'
import {settingsController} from './controllers/settings-controller.js'
import {usersController} from './controllers/users-controller.js'

(function () {
  var sammyApp = Sammy('#content', function () {

    this.get('#/', homeController.all);
    this.get('#/home', homeController.all);

    this.get('#/register', usersController.register);
    this.get('#/login', usersController.login);
    this.get('#/change-password', usersController.changePassword);


    this.get('#/posts', postController.all);
    this.get('#/posts/create', postController.create);
    //this.get('#/post/delete', postsController.delete);

    //this.get('#/comment', commentsController.all);
    //this.get('#/comment/add', commentsController.add);
    //this.get('#/comment/delete', commentsController.delete);

    //this.get('#/events', eventsController.all);
    this.get('#/contact', contactController.all);
    this.get('#/settings', settingsController.all);
    this.get('#/user/:username', function () {
      let username = this.params['username'];
      settingsController.getUserByUserName(username);
    })
    //this.get('#/settings', settingsController.users);
  });

  $(function () {
    sammyApp.run('#/');
  });

  function checkForLoggedUser() {
    dataAccess.Users.currentUser()
      .then((user) => {
        if (user) {
          $('#span-username').text(user);
          $('#logout').removeClass('hidden');
        }
      });
  };

  // event for logout
  $('#btn-logout').on('click', usersController.logout);
} ());
