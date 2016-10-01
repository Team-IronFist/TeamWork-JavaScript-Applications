import {templates} from './../template.js'
import {popup} from './popup-controller.js'
import { pagingItems } from '../data.js'

var homeController = function () {
  function all(context) {
    templates.get('home')
      .then(function (template) {
        context.$element().html(template)
      });
  }

function viewLastCars(context){
  let filterCars = {};
  pagingItems('Car', 1)
      .then((data) => {
          filterCars = data;
          templates.get('home')
              .then(function (template) {
                  console.log(JSON.stringify(filterCars));
                  context.$element().html(template(filterCars));
              });
      })
      .catch((error) => {
          popup('#errorBox', error.message)
      });

}

function viewLastPosts(context){
  let filterPosts = {};
  pagingItems('Post', 3)
      .then((data) => {
          filterPosts = data;
          templates.get('home')
              .then(function (template) {
                  console.log(JSON.stringify(filterPosts));
                  context.$element().html(template(filterPosts));
              });
      })
      .catch((error) => {
          popup('#errorBox', error.message)
      });

}
  return {
    all: all,
    viewLastCars: viewLastCars,
    viewLastPosts: viewLastPosts
  };
} ();

export {homeController}
