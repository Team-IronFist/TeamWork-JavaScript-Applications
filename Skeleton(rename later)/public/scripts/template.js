var templates = (function () {
  'use strict';
  let handlebars = window.handlebars || window.Handlebars;

  function get(name) {
    const promise = new Promise(function(resolve, reject) {
      const url = 'scripts/templates/' + name + '.handlebars';
      $.get(url, function(html) {
        var template = handlebars.compile(html);
        resolve(template);
      });
    });
    return promise;
  }

  return {
    get: get
  };
}());
