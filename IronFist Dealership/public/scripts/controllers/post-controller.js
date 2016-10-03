import {templates} from './../template.js'
import {popup} from './popup-controller.js'
import { posts } from '../data.js'
import {validator} from '../validator.js'
import {usersController} from './users-controller.js'


var postController = function () {
    const Successful_Deleted_Post = "You have deleted this post successfully";
    const Not_Allowed_To_Delete_Or_Edit_Post = "You are not the author and cannot delete or edit this post";
    const No_Posts_From_This_User = `There are no posts published by this user`;
    
    function allFromUser() {
        let allUserPosts = [];
        return new Promise((resolve, reject) => {
            posts.postsGetAll()
                .then((data) => {
                    for (let i = 0; i < data.length; i++) {
                        if (localStorage.authKey === data[i].AuthorId) {
                            allUserPosts.push(data[i]);
                        }
                    }
                    
                    if (allUserPosts.length === 0) {
                        popup('#errorBox', No_Posts_From_This_User);
                        document.location = "#/posts/all";
                        resolve();
                        return;
                    }

                    templates.get('posts')
                        .then(function (template) {
                                resolve(template(allUserPosts));
                            },
                            function (error) {
                                reject(error);
                            });
                })
                .catch(reject);
        });
    }
    
    function all() {
        let allposts = {};
        return new Promise((resolve, reject) => {
            posts.postsGetAll()
                .then((data) => {
                    allposts = validator.parseDate(data);

                    templates.get('posts')
                        .then(function (template) {
                                resolve(template(allposts));
                            },
                            function (error) {
                                reject(error);
                            });
                })
                .catch(reject);
        });
    }

    function create() {
        return new Promise((resolve, reject) => {
            posts.getCurrentUser()
                .then((data) => {
                    templates.get('post-create')
                        .then(function (template) {
                            resolve(template());
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }

    function isAuthorized(id) {
        return new Promise((resolve, reject) => {
            if (!id) {
                resolve({authorized: false});
            }

            posts.getCurrentUser()
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

                    if (currentUser.Role === posts.Administrator_Role_Hash) {
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

    function remove(id) {
        return new Promise((resolve, reject) => {
            posts.postGetById(id)
                .then((thisPost) => {
                    isAuthorized(thisPost.AuthorId)
                        .then((data) => {
                            if (!data.authorized) {
                                popup('#errorBox', Not_Allowed_To_Delete_Or_Edit_Post);
                                document.location = '#/posts/all';
                                resolve();
                            } else {
                                posts.postDeleteById(id)
                                    .then(() => {
                                        popup('#infoBox', Successful_Deleted_Post);
                                        document.location = '#/posts/user';
                                        resolve();
                                    })
                                    .catch((error) => {
                                        popup('#errorBox', error.message);
                                        document.location = '#/posts/all';
                                        reject(error);
                                    })
                            }
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }

    function edit(id) {
        return new Promise((resolve, reject) => {
            posts.postGetById(id)
                .then((thisPost) => {
                    isAuthorized(thisPost.AuthorId)
                        .then((data) => {
                            if (!data.authorized) {
                                popup('#errorBox', Not_Allowed_To_Delete_Or_Edit_Post);
                                document.location = '#/posts/all';
                                resolve();
                            } else {
                                templates.get('post-edit')
                                    .then(function (template) {
                                        let result = {};
                                        result.html = template();
                                        result.Title = thisPost.Title;
                                        result.Description = thisPost.Description;
                                        result.Author = thisPost.Author;
                                        result.Role = data.role;

                                        resolve(result);
                                    })
                                    .catch(reject);
                            }
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
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
