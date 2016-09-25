var postController = function() {
  const authenticationKey = 'zhumgwq8m2cn6p2e';
  let dataAccess = new Everlive(authenticationKey);



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

        $('#btn-create-post').on('click', function(){
          let postTitle = $('#post-title').val();
          let postDescription = $('#post-description').val();
          let author = document.getElementById('span-username').innerHTML;
          
          let newPost = dataAccess.data('Post');
          newPost.create({
              'Title' : postTitle,
              'Description': postDescription,
              'Author': author },
              function(data){
                  console.log(JSON.stringify(data));
              },
              function(error){
                  console.log(JSON.stringify(error));
              });
        });


      });
  }

  return {
    all: all,
    create: create
  };
}();
