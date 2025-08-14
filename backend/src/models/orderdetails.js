class OrderDetail {
    constructor(
        id, 
        order_id, 
        product_id, 
        product_name, 
        quantity, 
        unit_price, 
        total_price, 
        voucher_code, 
        voucher_discount,
        created_at, 
        updated_at, 

    ) {
        this.id = id;
        this.order_id = order_id;
        this.product_id = product_id;
        this.product_name = product_name;
        this.quantity = quantity;
        this.unit_price = unit_price;
        this.total_price = total_price;
        this.voucher_code = voucher_code;
        this.voucher_discount = voucher_discount;
        this.created_at = created_at;
        this.updated_at = updated_at;
        
    }
}

module.exports = OrderDetail;
