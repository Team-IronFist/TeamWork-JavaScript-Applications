function createPost()){
  class Post {
    constructor(id, authorId, author, title, description) {
      this._comments = [];

      this._id = id;
      this._authorId = authorId;
      this._author = author;
      this._title = title;
      this._description = description;
    }

    get Id(){
      return this._id;
    }

    get PostId(){
      return this._postId;
    }

    get Description(){
      return this._description;
    }
    set Description(value){
      this._description = value;
    }

  }
  return {
    getPost: function (id, authorId, author, title, description){
      return new Post(id, authorId, author, title, description)
      }
    }
}

export {createPost}
