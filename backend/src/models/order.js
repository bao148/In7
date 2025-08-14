class Order {
    constructor(id, user_id, total_amount, payment_method, status, address, phone_number, note, voucher_code, voucher_discount, voucher_id, transIdMomo, orderId, created_at, updated_at) {
        this.id = id;
        this.user_id = user_id;
        this.total_amount = total_amount;
        this.payment_method = payment_method;
        this.status = status;
        this.address = address;
        this.phone_number = phone_number;
        this.note = note;
        this.voucher_code = voucher_code;
        this.voucher_discount = voucher_discount;
        this.voucher_id = voucher_id;
        this.transIdMomo = transIdMomo;
        this.orderId = orderId;
        this.created_at = created_at;
        this.updated_at = updated_at;
}
}
module.exports = Order;
