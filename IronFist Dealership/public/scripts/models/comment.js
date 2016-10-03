function createComment(){
  class Comment {
    constructor(id, authorId, postId, content) {
      this._id = id;
      this._authorId = authorId;
      this._postId = postId;
      this._content = content;
    }

    get Id(){
      return this._id;
    }

    get PostId(){
      return this._postId;
    }

    get Content(){
      return this._content;
    }
    set Content(value){
      this._content = value;
    }

  }
  return {
    getComment: function (id, authorId, postId, content){
      return new Comment(id, authorId, postId, content);
      }
    }
}

export {createComment}
