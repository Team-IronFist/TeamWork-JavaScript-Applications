import {templates} from './../template.js'
import { getAllUsers } from '../data.js'

var settingsController = function () {

  function allUsers(context) {
    let allUsers = {};
    getAllUsers()
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

  return {
    allUsers: allUsers
  };
} ();

export {settingsController}
