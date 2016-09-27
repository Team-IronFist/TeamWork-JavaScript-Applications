import {templates} from './../template.js'

var settingsController = function () {
  const Authentication_Key = 'zhumgwq8m2cn6p2e';
  let dataAccess = new Everlive(Authentication_Key);

  function all(context) {
    let allUsers = {};
    dataAccess.Users.get()
      .then(function (data) {
        allUsers = data.result;
        templates.get('settings')
          .then(function (template) {
            context.$element().html(template(allUsers));
          });
        console.log(JSON.stringify(allUsers));
      },
      function (error) {
        console.log(JSON.stringify(error));
      });
  }


  function getUserByUserName(username) {
    let filter = new Everlive.Query();
    filter.where().eq("Username", username);

    dataAccess.Users.get(filter)
      .then((data) => {
        let selectedUser = data.result[0];
        // TODO template for current user 
        console.log(selectedUser)
      });
  }


  return {
    all: all,
    getUserByUserName: getUserByUserName
  };
} ();

export {settingsController}