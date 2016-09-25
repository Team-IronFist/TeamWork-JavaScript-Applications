var postController = function() {
  function all(context) {
    templates.get('posts')
      .then(function(template){
        context.$element().html(template)
      });
  }

  function create(context) {
    templates.get('post-create')
      .then(function(template){
        context.$element().html(template)
      });
  }

  return {
    all: all,
    create: create
  };
}();
