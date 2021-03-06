import {templates} from './../template.js'
import { settings } from '../data.js'

var settingsController = function () {

  function allUsers(context) {
    let allUsers = {};
    settings.getAllUsers()
        .then((data) => {
            allUsers = data.result;
            templates.get('settings-all-users')
            .then(function (template) {
                context.$element().html(template(allUsers));
            });
        })
        .catch((error) => {
            console.log(error);
        });
  }

  function allCars(context) {
    let allCars = {};
    settings.carsGetAll()
        .then((data) => {
            allCars = data;
            templates.get('settings-all-cars')
                .then(function (template) {
                        context.$element().html(template(allCars));
                    },
                    function (error) {
                        console.log(error);
                    });
        })
        .catch(console.log);
  }

  function allPosts(context) {
    let allPosts = {};
    settings.postsGetAll()
        .then((data) => {
            allPosts = data;
            templates.get('settings-all-posts')
                .then(function (template) {
                        context.$element().html(template(allPosts));
                    },
                    function (error) {
                        console.log(error);
                    });
        })
        .catch(console.log);
  }

  function allComments(context) {
    let allComments = {};
    settings.commentsGetAll()
        .then((data) => {
            allComments = data;
            templates.get('settings-all-comments')
                .then(function (template) {
                        context.$element().html(template(allComments));
                    },
                    function (error) {
                        console.log(error);
                    });
        })
        .catch(console.log);
  }
  return {
    allUsers: allUsers,
    allCars: allCars,
    allPosts: allPosts,
    allComments: allComments
  };
} ();

export {settingsController}
