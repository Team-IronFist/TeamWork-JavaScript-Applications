import {templates} from './../template.js'
import {popup} from './popup-controller.js'
import {
    getCurrentUser, commentCreate, commentsGetAll
} from '../data.js'
import {usersController} from './users-controller.js'

var commentsController = function () {
  function all(context) {
    let allComments = {};
    commentsGetAll()
        .then((data) => {
            allComments = data;
            templates.get('all-comments')
                .then(function (template) {
                        context.$element().html(template(allComments));
                    },
                    function (error) {
                        console.log(error);
                    });
        })
        .catch(console.log);
  }


  function add(context) {
    getCurrentUser()
        .then((data) => {
            templates.get('comment-car')
                .then(function (template) {
                    context.$element().html(template);

                    $('#btn-comment-add').on('click', function () {
                        let commentContent = $('#comment-content').val();

                        commentCreate(commentContent, localStorage.authKey)
                            .then((data) => {
                                document.location = '#/cars/all';
                            })
                            .catch(console.log);
                    });
                });
        });
  }

  return {
    all: all,
    add: add
  };
} ();

export {commentsController}
