var settingsController = function() {
  const Authentication_Key = 'zhumgwq8m2cn6p2e';
  let dataAccess = new Everlive(Authentication_Key);
  function all(context) {
    templates.get('settings')
      .then(function(template){
        context.$element().html(template)
      });
  }

  return {
    all: all,
  };
}();
