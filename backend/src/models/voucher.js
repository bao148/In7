// voucher.js
class Voucher {
    constructor(id, voucher_code, price, discount_percent, valid_from, valid_to, status, quantity, created_at, updated_at) {
        this.id = id;
        this.voucher_code = voucher_code;
        this.price = price;
        this.discount_percent = discount_percent;
        this.valid_from = valid_from;
        this.valid_to = valid_to;
        this.status = status;
        this.quantity = quantity;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

module.exports = Voucher;
