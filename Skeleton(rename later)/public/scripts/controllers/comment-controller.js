import {templates} from './../template.js'

var commentsController = function () {
  function all(context) {
    templates.get('all-comments')
      .then(function (template) {
        context.$element().html(template)
        console.log('TODO');
      });
  }


  function add(context) {
    templates.get('comment-car')
      .then(function (template) {
        context.$element().html(template)
      });
  }

  return {
    all: all,
    add: add
  };
} ();

export {commentsController}
