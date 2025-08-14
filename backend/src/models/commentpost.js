class CommentPost {
    constructor(id, posts_id, users_id, comment, status, created_at, updated_at) {
        this.id = id;
        this.posts_id = posts_id;
        this.users_id = users_id;
        this.comment = comment;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

module.exports = CommentPost;
