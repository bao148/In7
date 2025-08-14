class Category {
    constructor(id, category_name, images, status, description, created_at, updated_at) {
        this.id = id;
        this.category_name = category_name;
        this.images = images;
        this.status = status;
        this.description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

module.exports = Category;
