import {templates} from './../template.js'
import {popup} from './popup-controller.js'
import { pagingItems } from '../data.js'

var homeController = function () {
  function all(context) {
    templates.get('home')
      .then(function (template) {
        return context.$element().html(template)
      })
      .then(()=>{
         return viewLastCars()
      })
      .then(()=>{
          return viewLastPosts()
      })
      .then(()=>{
          console.log('done')
      })
      .catch((error)=>{
          console.log(error)
      })
  }

function viewLastCars(){
  let filterCars = {};
  pagingItems('Car', 3)
      .then((data) => {
          filterCars = data;
          templates.get('all-cars')
              .then(function (template) {
                  $('#last-cars').html(template(filterCars));
              });
      })
      .catch((error) => {
          popup('#errorBox', error.message)
      });

}

function viewLastPosts(){
  let filterPosts = {};
  pagingItems('Post', 3)
      .then((data) => {
          filterPosts = data;
          templates.get('home-posts')
              .then(function (template) {
                  $('#last-posts').html(template(filterPosts));
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
