import { homeController } from './controllers/home-controller.js'
import { contactController } from './controllers/contact-controller.js'
import { postController } from './controllers/post-controller.js'
import { settingsController } from './controllers/settings-controller.js'
import { usersController } from './controllers/users-controller.js'
import { carController } from './controllers/car-controller.js'
import { popup } from './controllers/popup-controller.js'
import { validator } from './validator.js'
import { posts, users } from './data.js'
import { commentsController } from './controllers/comment-controller.js'

(function () {
  const Edited_By_Admin = "</br><em>EDITED by</em> <strong>Admin</strong>";
  const Successful_Edited_Post = "You have edited this post successfully";
  const Successful_Edit_User_Message = "You have edited this user successfully";
  const Successful_Change_Password_Message = "Your password has been changed successfully";
  const Successful_Registration_Message = "Your registration was successful";
  const Successful_Login_Message = "Logged in successfully";

  var sammyApp = Sammy('#content', function () {

    this.get('#/', homeController.all);

    this.get('#/register', function (context) {
      usersController.register()
        .then((html) => {
            context.$element().html(html);
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
                    .catch((error) => {
                        popup('#errorBox', error.message);
                    });
            });
        })
        .catch(console.log);
    });
    this.get('#/login', function (context) {
      usersController.login()
        .then((html) => {
            context.$element().html(html);
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
        })
        .catch(console.log);
    });
    this.get('#/change-password', function (context) {
      usersController.changePassword()
        .then((html) => {
            context.$element().html(html);

            $('#btn-change-password').on('click', function () {
                let username = $('#tb-current-username').val(),
                    password = $('#tb-current-password').val(),
                    newPassword = $('#tb-new-password').val();
                users.userChangePassword(username, password, newPassword)
                    .then(() => {
                        popup('#infoBox', Successful_Change_Password_Message);
                    })
                    .catch((error) => {
                        popup('#errorBox', error.message);
                    });
            });
        })
        .catch(console.log);
    });
    this.get('#/cars/all', carController.all);
    this.get('#/cars/add', carController.add);
    this.get('#/cars/:id', function (context) {
      let id = this.params['id'];
      carController.showSingle(context, id);
    });

    this.get('#/user-info', function(context) {
        usersController.displayUser()
            .then((html) => {
                context.$element().html(html);
            })
            .catch(console.log);
    });
    this.get('#/posts/all', function(context) {
        postController.all()
            .then((html) => {
                context.$element().html(html);
            })
            .catch(console.log);
    });
    this.get('#/posts/user', function(context) {
        postController.allFromUser()
            .then((html) => {
                context.$element().html(html);
            })
            .catch(console.log);
    });
    this.get('#/posts/create', function (context) {
      validator.isUserLogged()
        .then(
        function (loggedIn) {
          if (loggedIn) {
             postController.create()
                .then((html) => {
                    context.$element().html(html);
                    $('#btn-create-post').on('click', function () {
                        let postTitle = $('#post-title').val();
                        let postDescription = $('#post-description').val();
                        let author = localStorage.displayName;

                        posts.postCreate(postTitle, postDescription, author, localStorage.authKey)
                            .then((data) => {
                                document.location = '#/posts/user';
                            })
                            .catch(console.log);
                    });
                })
                .catch(console.log);
          }
          else {
            document.location = '#/login';
          }
        }
        );
    });
    this.get('#/posts/remove/:id', function(context) {
        let id = context.path.substring(context.path.lastIndexOf('/') + 1);
        postController.remove(id)
            .then(console.log('successfully deleted post'))
            .catch(console.log);
    });
    this.get('#/posts/edit/:id', function(context) {
        let id = context.path.substring(context.path.lastIndexOf('/') + 1);
        postController.edit(id)
            .then((result) =>{
              context.$element().html(result.html);

              $('#post-title').val(result.Title);
              $('#post-description').val(result.Description);

              $('#btn-edit-post').on('click', function () {
                  let postTitle = $('#post-title').val();
                  let postDescription = $('#post-description').val();
                  if (postTitle === result.Title && postDescription === result.Description) {
                      document.location = '#/posts/user';
                      return;
                  }

                  let author = result.Author;
                  if (result.Role === 'admin' && author.lastIndexOf(Edited_By_Admin) < 0) {
                      author += Edited_By_Admin;
                  }

                  posts.postEditById(id, postTitle, postDescription, author)
                      .then(() => {
                          popup('#infoBox', Successful_Edited_Post);
                          document.location = '#/posts/user';
                          console.log('successfully edited post');
                      })
                      .catch((error) => {
                          popup('#errorBox', error.message);
                          document.location = '#/posts/all';
                      })
              });
            })
            .catch(console.log);
    });

    this.get('#/comment/all', commentsController.all);
    this.get('#/comment/add', commentsController.add);
    //this.get('#/comment/delete', commentsController.delete);

    //this.get('#/events', eventsController.all);
    this.get('#/contact', contactController.all);
    this.get('#/settings/all-users', settingsController.allUsers);
    this.get('#/settings/delete-user/:id', function(context) {
        let id = idFromUrl(context);;
        usersController.deleteUser(id)
            .then(console.log('successfully deleted user'))
            .catch(console.log);
    });
    this.get('#/settings/edit-user/:id', function(context) {
        let id = idFromUrl(context);;
        usersController.editUser(id)
            .then((result) => {
                context.$element().html(result.html);
                $('#tb-edit-email').val(result.Email);
                $('#tb-edit-displayName').val(result.DisplayName);

                $('#btn-edit').on('click', function () {
                let email = $('#tb-edit-email').val();
                let displayName = $('#tb-edit-displayName').val();
                if (email === result.Email && displayName === result.DisplayName) {
                    document.location = '#/settings/all-users';
                    return;
                }

                users.userEdit(id, displayName, email)
                    .then(() => {
                        popup('#infoBox', Successful_Edit_User_Message);
                        document.location = '#/settings/all-users';
                    })
                    .catch((error) => {
                        popup('#errorBox', error.message);
                        document.location = '#/settings/all-users';
                    });
                });
            })
            .catch(console.log);
    });

    this.get('#/settings/all-cars', settingsController.allCars);
    this.get('#/settings/all-posts', settingsController.allPosts);
    this.get('#/settings/all-comments', settingsController.allComments);

    this.get('#/user/:username', function (context) {
      let username = this.params['username'];
      usersController.getUserByUserName(username)
        .then((html) => {
            context.$element().html(html);
        })
        .catch(console.log);
    })
    //this.get('#/settings', settingsController.users);
  });

  $(function () {
    sammyApp.run('#/');
  });

  function idFromUrl(url) {
    return url.path.substring(url.path.lastIndexOf('/') + 1);
  }

  function tryToLog(username, password) {
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
    if (autoDisplayName === 'Admin') {
      $('#link-settings').removeClass('hidden');
    }
  };
  // event for logout
  $('#btn-logout').on('click', usersController.logout);
} ());
