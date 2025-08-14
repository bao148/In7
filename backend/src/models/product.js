// product.js
class Product {
    constructor(id, name, price, image, description, discount, quantity, status, categories_id, created_at, updated_at) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
        this.discount = discount;
        this.quantity = quantity;
        this.status = status;
        this.categories_id = categories_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

module.exports = Product;
