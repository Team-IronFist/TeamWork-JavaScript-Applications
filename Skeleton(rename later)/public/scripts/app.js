import {homeController} from './controllers/home-controller.js'
import {contactController} from './controllers/contact-controller.js'
import {postController} from './controllers/post-controller.js'
import {settingsController} from './controllers/settings-controller.js'
import {usersController} from './controllers/users-controller.js'
import {carController} from './controllers/car-controller.js'
import {validator} from './validator.js'
import {commentsController} from './controllers/comment-controller.js'


(function () {
  var sammyApp = Sammy('#content', function () {

    this.get('#/', homeController.all);
    this.get('#/home', homeController.all);

    this.get('#/register', usersController.register);
    this.get('#/login', usersController.login);
    this.get('#/change-password', usersController.changePassword);

    this.get('#/cars/all', carController.all);
    this.get('#/cars/add', carController.add);
    this.get('#/cars/:id', function (context) {
      let id = this.params['id'];
      carController.showSingle(context, id);
    });

    this.get('#/user-info', usersController.displayUser);
    this.get('#/posts/all', postController.all);
    this.get('#/posts/user', postController.allFromUser);
    this.get('#/posts/create', function (context) {
      validator.isUserLogged()
        .then(
        function (loggedIn) {
          if (loggedIn) {
            postController.create(context);
          }
          else {
            document.location = '#/login';
          }
        }
        );
    });
    this.get('#/posts/remove/:id', postController.remove);
    this.get('#/posts/edit/:id', postController.edit);

    this.get('#/comment/all', commentsController.all);
    this.get('#/comment/add', commentsController.add);
    //this.get('#/comment/delete', commentsController.delete);

    //this.get('#/events', eventsController.all);
    this.get('#/contact', contactController.all);
    this.get('#/settings/all-users', settingsController.allUsers);
    this.get('#/settings/delete-user/:id', usersController.deleteUser);
    this.get('#/settings/edit-user/:id', usersController.editUser);

    this.get('#/settings/all-cars', settingsController.allCars);
    this.get('#/settings/all-posts', settingsController.allPosts);
    this.get('#/settings/all-comments', settingsController.allComments);

    this.get('#/user/:username', function (context) {
      let username = this.params['username'];
      usersController.getUserByUserName(context, username);
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
          $('#user-posts').removeClass('hidden');
          //$('#link-addcar').removeClass('hidden');
        }
      });
  };

  // event when refreshing page
  sessionStorage.setItem("is_reloaded", true);

  if (sessionStorage.getItem("is_reloaded")) {
    let autoDisplayName = localStorage.displayName;
    if (autoDisplayName) {
      $('#link-register').addClass('hidden');
      $('#link-login').addClass('hidden');
      $('#logout').removeClass('hidden');
      $('#user-posts').removeClass('hidden');
      $('#link-addcar').removeClass('hidden');
      $('#span-username').text(autoDisplayName);
    }
  };
  // event for logout
  $('#btn-logout').on('click', usersController.logout);

  //   window.onbeforeunload = function() {
  //       usersController.logout();
  //   }
} ());
