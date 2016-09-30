import {templates} from './../template.js'
import {popup} from './popup-controller.js'
import {
    getCurrentUser, postsGetAll, postCreate, postGetById,
    postDeleteById, postEditById, Administrator_Role_Hash
} from '../data.js'
import {usersController} from './users-controller.js'

var postController = function () {
    const Successful_Deleted_Post = "You have deleted this post successfully";
    const Successful_Edited_Post = "You have edited this post successfully";
    const Not_Allowed_To_Delete_Or_Edit_Post = "You are not the author and cannot delete or edit this post";

    function all(context) {
        let allposts = [];
        postsGetAll()
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    if (localStorage.authKey === data[i].AuthorId) {
                        allposts.push(data[i]);
                    }
                }
                templates.get('posts')
                    .then(function (template) {
                            context.$element().html(template(allposts));
                        },
                        function (error) {
                            console.log(error);
                        });
            })
            .catch(console.log);
    }

//   function create(context) {
//     templates.get('post-create')
//       .then(function (template) {
//         context.$element().html(template)

//         $('#btn-create-post').on('click', function () {
//           let postTitle = $('#post-title').val();
//           let postDescription = $('#post-description').val();
//           let author = localStorage.displayName;

//           postCreate(postTitle, postDescription, author, localStorage.authKey)
//             .then((data) => {
//                 document.location = '#/posts';
//             })
//             .catch(console.log);
//         });
//       });
//   }
    function create(context) {
        getCurrentUser()
            .then((data) => {
                //Redirect to login
                if (!data.result) {
                    usersController.login(context);
                    //TODO Redirect back to create topic
                }
                else {
                    templates.get('post-create')
                        .then(function (template) {
                            context.$element().html(template);

                            $('#btn-create-post').on('click', function () {
                                let postTitle = $('#post-title').val();
                                let postDescription = $('#post-description').val();
                                let author = localStorage.displayName;

                                postCreate(postTitle, postDescription, author, localStorage.authKey)
                                    .then((data) => {
                                        document.location = '#/posts';
                                    })
                                    .catch(console.log);
                            });
                        });
                }
            });
    }

    function remove(context) {
        let id = context.path.substring(context.path.lastIndexOf('/') + 1);

        postGetById(id)
            .then((thisPost) => {
                console.log(thisPost.AuthorId);

                getCurrentUser()
                    .then((data) => {
                        console.log(data.result);
                        let currentUser = data.result;
                        if (!thisPost.AuthorId || (currentUser !== null && thisPost.AuthorId === currentUser.Id) ||
                            (currentUser !== null && currentUser.Role === Administrator_Role_Hash)) {
                            postDeleteById(id)
                                .then(() => {
                                    popup('#infoBox', Successful_Deleted_Post);
                                    document.location = '#/posts';
                                })
                                .catch((error) => {
                                    popup('#errorBox', error.message);
                                    document.location = '#/posts';
                                })
                        } else {
                            popup('#errorBox', Not_Allowed_To_Delete_Or_Edit_Post);
                            document.location = '#/posts';
                        }
                    })
                    .catch(console.log);
            })
            .catch(console.log);
    }

    function edit(context) {
        let id = context.path.substring(context.path.lastIndexOf('/') + 1);

        postGetById(id)
            .then((thisPost) => {
                console.log(thisPost.AuthorId);

                getCurrentUser()
                    .then((data) => {
                        console.log(data.result);
                        let currentUser = data.result;
                        if (!thisPost.AuthorId || (currentUser !== null && thisPost.AuthorId === currentUser.Id) ||
                            (currentUser !== null && currentUser.Role === Administrator_Role_Hash)) {

                            templates.get('post-edit')
                                .then(function (template) {
                                    context.$element().html(template)

                                    $('#post-title').val(thisPost.Title);
                                    $('#post-description').val(thisPost.Description);

                                    $('#btn-edit-post').on('click', function () {
                                        let postTitle = $('#post-title').val();
                                        let postDescription = $('#post-description').val();

                                        postEditById(id, postTitle, postDescription)
                                            .then(() => {
                                                popup('#infoBox', Successful_Edited_Post);
                                                document.location = '#/posts';
                                            })
                                            .catch((error) => {
                                                popup('#errorBox', error.message);
                                                document.location = '#/posts';
                                            })
                                    });
                                });
                        } else {
                            popup('#errorBox', Not_Allowed_To_Delete_Or_Edit_Post);
                            document.location = '#/posts';
                        }
                    })
                    .catch(console.log);
            })
            .catch(console.log);
    }

    return {
        all,
        create,
        remove,
        edit
    };
}();

export {postController}
