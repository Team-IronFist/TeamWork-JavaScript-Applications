import {templates} from './../template.js'

var postController = function () {
  const Authentication_Key = 'zhumgwq8m2cn6p2e';
  let dataAccess = new Everlive(Authentication_Key);

  function all(context) {
    let allposts = {};
    let queryPosts = dataAccess.data('Post');
    queryPosts.get()
      .then(function (data) {
        allposts = data.result;
        console.log(JSON.stringify(data.result));
        templates.get('posts')
          .then(function (template) {
            context.$element().html(template(allposts));
          },
          function (error) {
            console.log(JSON.stringify(error));
          });

      });
  }

  function create(context) {
    templates.get('post-create')
      .then(function (template) {
        context.$element().html(template)

        $('#btn-create-post').on('click', function () {
          let postTitle = $('#post-title').val();
          let postDescription = $('#post-description').val();
          let author = document.getElementById('span-username').innerHTML;

          let newPost = dataAccess.data('Post');
          newPost.create({
            'Title': postTitle,
            'Description': postDescription,
            'Author': author
          },
            function (data) {
              console.log(JSON.stringify(data));
              document.location = '#/posts';
            },
            function (error) {
              console.log(JSON.stringify(error));
            });
        });


      });
  }

  return {
    all: all,
    create: create
  };
} ();

export {postController}