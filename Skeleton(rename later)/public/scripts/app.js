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
    this.get('#/cars/all', console.log('#/cars/all'));
    this.get('#/cars/add', console.log('#/cars/add'));
    this.get('#/user-info', usersController.displayUser);
    this.get('#/posts', postController.all);
    this.get('#/posts/create', postController.create);
    this.get('#/posts/remove/:id', postController.remove);
    this.get('#/posts/edit/:id', postController.edit);

    //this.get('#/comment', commentsController.all);
    //this.get('#/comment/add', commentsController.add);
    //this.get('#/comment/delete', commentsController.delete);

    //this.get('#/events', eventsController.all);
    this.get('#/contact', contactController.all);
    this.get('#/settings/all-users', settingsController.allUsers);
    this.get('#/settings/delete-user', usersController.deleteUser);
    this.get('#/settings/edit-user', usersController.editUser);

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

  // event when refreshing page
  sessionStorage.setItem("is_reloaded", true);

  if (sessionStorage.getItem("is_reloaded")){
    let autoDisplayName = localStorage.displayName;
    if (autoDisplayName) {
      $('#link-register').addClass('hidden');
      $('#link-login').addClass('hidden');
      $('#logout').removeClass('hidden');
      $('#span-username').text(autoDisplayName);
    }
  };
  // event for logout
  $('#btn-logout').on('click', usersController.logout);

//   window.onbeforeunload = function() {
//       usersController.logout();
//   }
} ());
