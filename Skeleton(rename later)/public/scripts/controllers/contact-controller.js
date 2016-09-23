var contactController = function() {
  function all(context) {
    templates.get('contact')
      .then(function(template){
        context.$element().html(template)
      });
  }

  return {
    all: all
  };
}();
