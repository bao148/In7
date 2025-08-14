// post.js
class Post {
    constructor(id, title, content, post_category_id, status, created_at, updated_at, image_url) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.post_category_id = post_category_id;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.image_url = image_url;
    }
}

module.exports = Post;
