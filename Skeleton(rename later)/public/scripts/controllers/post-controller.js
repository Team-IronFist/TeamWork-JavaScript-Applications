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
    const Edited_By_Admin = "</br><em>EDITED by</em> <strong>Admin</strong>";
    const No_Posts_From_This_User = `There are no posts published by this user`;

    function allFromUser(context) {
        let allUserPosts = [];
        postsGetAll()
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    if (localStorage.authKey === data[i].AuthorId) {
                        allUserPosts.push(data[i]);
                    }
                }
                if (allUserPosts.length === 0) {
                    popup('#errorBox', No_Posts_From_This_User);
                    document.location = "#/posts/user";
                    return;
                }
                ;

                templates.get('posts')
                    .then(function (template) {
                            context.$element().html(template(allUserPosts));
                        },
                        function (error) {
                            console.log(error);
                        });
            })
            .catch(console.log);
    }

    function all(context) {
        let allposts = {};
        postsGetAll()
            .then((data) => {
                allposts = data;
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

    function create(context) {
        console.log('poop');
        getCurrentUser()
            .then((data) => {
                templates.get('post-create')
                    .then(function (template) {
                        context.$element().html(template);

                        $('#btn-create-post').on('click', function () {
                            let postTitle = $('#post-title').val();
                            let postDescription = $('#post-description').val();
                            let author = localStorage.displayName;

                            postCreate(postTitle, postDescription, author, localStorage.authKey)
                                .then((data) => {
                                    document.location = '#/posts/user';
                                })
                                .catch(console.log);
                        });
                    });
            });
    }

    function isAuthorized(id) {
        return new Promise((resolve, reject) => {
            if (!id) {
                resolve({authorized: false});
            }
            ;

            getCurrentUser()
                .then((data) => {
                    console.log(data.result);
                    let currentUser = data.result;
                    if (currentUser === null) {
                        resolve({authorized: false});
                    }

                    if (id === currentUser.Id) {
                        resolve({
                            authorized: true,
                            role: 'regular'
                        });
                    }

                    if (currentUser.Role === Administrator_Role_Hash) {
                        resolve({
                            authorized: true,
                            role: 'admin'
                        });
                    }

                    resolve({authorized: false});
                })
                .catch(reject);
        });
    }

    function remove(context) {
        let id = context.path.substring(context.path.lastIndexOf('/') + 1);

        postGetById(id)
            .then((thisPost) => {
                console.log(thisPost.AuthorId);

                isAuthorized(thisPost.AuthorId)
                    .then((data) => {
                        console.log(data);
                        if (!data.authorized) {
                            popup('#errorBox', Not_Allowed_To_Delete_Or_Edit_Post);
                            document.location = '#/posts/all';
                        } else {
                            postDeleteById(id)
                                .then(() => {
                                    popup('#infoBox', Successful_Deleted_Post);
                                    document.location = '#/posts/user';
                                })
                                .catch((error) => {
                                    popup('#errorBox', error.message);
                                    document.location = '#/posts/all';
                                })
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
                isAuthorized(thisPost.AuthorId)
                    .then((data) => {
                        console.log(data.result);
                        if (!data.authorized) {
                            popup('#errorBox', Not_Allowed_To_Delete_Or_Edit_Post);
                            document.location = '#/posts/all';
                        } else {
                            templates.get('post-edit')
                                .then(function (template) {
                                    context.$element().html(template)

                                    $('#post-title').val(thisPost.Title);
                                    $('#post-description').val(thisPost.Description);

                                    $('#btn-edit-post').on('click', function () {
                                        let postTitle = $('#post-title').val();
                                        let postDescription = $('#post-description').val();
                                        if (postTitle === thisPost.Title && postDescription === thisPost.Description) {
                                            document.location = '#/posts/user';
                                            return;
                                        }

                                        let author = thisPost.Author;
                                        if (data.role === 'admin' && author.lastIndexOf(Edited_By_Admin) < 0) {
                                            author += Edited_By_Admin;
                                        }

                                        postEditById(id, postTitle, postDescription, author)
                                            .then(() => {
                                                popup('#infoBox', Successful_Edited_Post);
                                                document.location = '#/posts/user';
                                            })
                                            .catch((error) => {
                                                popup('#errorBox', error.message);
                                                document.location = '#/posts/all';
                                            })
                                    });
                                });
                        }

                    })
                    .catch(console.log);
            })
            .catch(console.log);
    }

    return {
        all,
        allFromUser,
        create,
        remove,
        edit
    };
}();

export {postController}
