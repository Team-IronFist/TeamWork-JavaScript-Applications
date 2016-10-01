import {createUser} from './models/user.js'
import {createCar} from './models/car.js'

const Authentication_Key = 'zhumgwq8m2cn6p2e';
const Administrator_Role_Hash = '372d6b60-8102-11e6-9eb4-3157f6092d16';

let dataAccess = new Everlive({
    appId: Authentication_Key,
    token: localStorage.accessToken
});

function registerUser(username, password, attributes){
    return new Promise((resolve, reject) => {
        dataAccess.Users.register(username, password, attributes,
            function (data) {
                let id = data.result.Id;
                var module = createUser();
                let user = module.getUser(id, username, attributes.DisplayName, password, attributes.Email);

                console.log(user);
                resolve(data);
            },
            function (error) {
                console.log(error);
                reject(error);
            });
    });
}

function getCurrentUser() {
    return new Promise((resolve, reject) => {
        dataAccess.Users.currentUser()
            .then(resolve)
            .catch(reject);
    });
}

function logUser(username, password) {
    return new Promise((resolve, reject) => {
        dataAccess.authentication.login(username, password,
            function (data) {
                console.log(data.result);
                localStorage.setItem("accessToken", data.result.access_token);
                dataAccess.Users.currentUser()
                .then(function (data) {
                    localStorage.setItem("username", data.result.Username);
                    localStorage.setItem("displayName", data.result.DisplayName);
                    localStorage.setItem("authKey", data.result.Id);
                    console.log(data);
                    resolve(data);
                    },
                    function (error) {
                        console.log(error);
                        reject(error);
                });
            },
            function (error) {
                console.log(error);
                reject(error);
        });
    });
}

function userChangePassword(username, password, newPassword) {
    return new Promise((resolve, reject) => {
        dataAccess.Users.changePassword(username, // username
                password, // current password
                newPassword, // new password
                true, // keep the user's tokens
                function (data) {
                    console.log(data.result);
                    resolve(data);
                },
                function (error) {
                    console.log(error);
                    reject(error);
                });
    });
}

function userByUserName(username) {
    return new Promise((resolve, reject) => {
        let filter = new Everlive.Query();
        filter.where().eq("Username", username);

        dataAccess.Users.get(filter)
            .then((data) => {
                let selectedUser = data.result[0];
                console.log(selectedUser)
                resolve(selectedUser);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function userDelete(id) {
    return new Promise((resolve, reject) => {
        dataAccess.Users.destroySingle({ Id: id },
            function(){
                resolve();
            },
            function(error){
                reject(error);
            });
    });
}

function userEdit(id, displayName, email) {
    return new Promise((resolve, reject) => {
        dataAccess.Users.updateSingle({ 'Id': id, 'DisplayName': displayName, 'Email': email },
            function(){
                resolve();
            },
            function(error){
                reject(error);
            });
    });
}

function userLogOut() {
    dataAccess.authentication.clearAuthorization();
}

function getAllUsers() {
    return new Promise((resolve, reject) => {
        dataAccess.Users.get()
            .then(function (data) {
                console.log(data.result);
                resolve(data);
            },
            function (error) {
                console.log(error);
                reject(error);
            });
    });
}

function userGetById(id) {
    return new Promise((resolve, reject) => {
      dataAccess.Users.getById(id)
        .then(function (data) {
                console.log(data.result);
                resolve(data.result);
            },
            function (error) {
                console.log(error);
                reject(error);
            }
        );
    });
}

function postsGetAll() {
    let queryPosts = dataAccess.data('Post');
    return new Promise((resolve, reject) => {
        queryPosts.get()
            .then(function (data) {
                console.log(data.result);
                resolve(data.result);
            });
    });
}

function postCreate(title, description, author, authKey) {
    let queryPosts = dataAccess.data('Post');
    return new Promise((resolve, reject) => {
        queryPosts.create({
            'Title': title,
            'Description': description,
            'Author': author,
            'AuthorId': localStorage.authKey
            },
            function (data) {
                resolve(data);
            },
            function (error) {
                reject(error);
            });
    });
}

function carCreate(attributes) {
    let queryPosts = dataAccess.data('Car');
    var carModule = createCar();
    let car = carModule.getCar(
      attributes.Id,
      attributes.AuthorId,
      attributes.Make,
      attributes.Engine,
      attributes.Year,
      attributes.HorsePowers,
      attributes.Extras);
    return new Promise((resolve, reject) => {
        queryPosts.create(attributes,
            function (data) {

                resolve(data);
            },
            function (error) {
                reject(error);
            });
    });
}

function postGetById(id) {
    let queryPosts = dataAccess.data('Post');
    return new Promise((resolve, reject) => {
      queryPosts.getById(id)
        .then(function (data) {
                console.log(data.result);
                resolve(data.result);
            },
            function (error) {
                console.log(error);
                reject(error);
            }
        );
    });
}

function postDeleteById(id) {
    let queryPosts = dataAccess.data('Post');
    return new Promise((resolve, reject) => {
        queryPosts.destroySingle({ Id: id },
            function(){
                resolve();
            },
            function(error){
                console.log(error);
                reject(error);
            });
    });
}

function postEditById(id, postTitle, postDescription, author) {
    let queryPosts = dataAccess.data('Post');
    return new Promise((resolve, reject) => {
        queryPosts.updateSingle({ Id: id, Title: postTitle, Description: postDescription, Author: author },
            function(){
                resolve();
            },
            function(error){
                console.log(error);
                reject(error);
            });
    });
}

function carsGetAll() {
    let queryCars = dataAccess.data('Car');
    return new Promise((resolve, reject) => {
        queryCars.get()
            .then(function (data) {
                resolve(data.result);
            });
    });

    // return new Promise((resolve, reject) => {
    //     dataAccess.Car.get()
    //         .then(function (data) {
    //             console.log(data.result);
    //             resolve(data);
    //         },
    //         function (error) {
    //             console.log(error);
    //             reject(error);
    //         });
    // });
}

function getCarById(id){
    let queryCars = dataAccess.data('Car');
    return new Promise((resolve, reject) => {
      queryCars.getById(id)
        .then(function (data) {
                resolve(data.result);
            },
            function (error) {
                console.log(error);
                reject(error);
            }
        );
    });
}

function commentCreate(content, authKey) {
  let queryComments = dataAccess.data('Comment');
  return new Promise((resolve, reject) => {
      queryComments.create({
          'Content': content,
          'Owner': localStorage.authKey
          },
          function (data) {
              resolve(data);
          },
          function (error) {
              reject(error);
          });
  });
}
export {
    registerUser,
    logUser,
    getCurrentUser,
    userChangePassword,
    userGetById,
    userByUserName,
    userDelete,
    userEdit,
    userLogOut,
    getAllUsers,
    postsGetAll,
    postCreate,
    postGetById,
    postDeleteById,
    postEditById,
    carsGetAll,
    carCreate,
    getCarById,
    commentCreate,
    Administrator_Role_Hash
}
