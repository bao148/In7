import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: any[] = [];
  private cartItemsSubject = new BehaviorSubject<any[]>(this.cartItems);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() { 
    this.loadCartFromLocalStorage();
  }

  // Lấy các sản phẩm trong giỏ hàng
  getCartItems() {
    return this.cartItems;
  }

  // Thông báo về sự thay đổi của giỏ hàng
  private updateCartItems() {
    this.cartItemsSubject.next([...this.cartItems]); // Sử dụng spread operator để tạo mảng mới
  }

  // Lưu giỏ hàng vào LocalStorage
  public saveCartToLocalStorage() {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
    this.updateCartItems(); // Thông báo về sự thay đổi sau khi lưu giỏ hàng
  }

  // Tải giỏ hàng từ LocalStorage
  private loadCartFromLocalStorage() {
    if (this.isLocalStorageAvailable()) {
      const cart = localStorage.getItem('cart');
      if (cart) {
        this.cartItems = JSON.parse(cart);
        this.updateCartItems(); // Thông báo về sự thay đổi khi tải giỏ hàng
      }
    }
  }

  // Thêm sản phẩm vào giỏ hàng
  addToCart(product: any, quantity: number): boolean {
    const existingItem = this.cartItems.find(item => item.id === product.id);
  
    if (existingItem) {
      // Kiểm tra số lượng sản phẩm trong giỏ hàng và tồn kho
      if (existingItem.quantity + quantity <= product.quantity) {
        // Cập nhật số lượng sản phẩm trong giỏ hàng với số lượng mới
        existingItem.quantity += quantity;
        this.saveCartToLocalStorage();
        return true;  // Sản phẩm được thêm thành công
      } else {
        // Nếu số lượng trong giỏ hàng cộng với số lượng người dùng chọn vượt quá tồn kho
        return false;  // Giỏ đầy hoặc sản phẩm vượt quá số lượng tồn kho
      }
    } else {
      // Nếu sản phẩm chưa có trong giỏ, thêm sản phẩm vào giỏ với số lượng người dùng chọn
      this.cartItems.push({ ...product, quantity: quantity });
      this.saveCartToLocalStorage();
      return true;  // Sản phẩm được thêm thành công
    }
  }
  
  

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.saveCartToLocalStorage();
  }

  // Xóa tất cả sản phẩm trong giỏ hàng
  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('appliedVoucher');
    this.saveCartToLocalStorage();
  }

  // Tính tổng tiền trong giỏ hàng
  getTotal() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Cập nhật số lượng của sản phẩm trong giỏ hàng
  updateQuantity(productId: number, quantity: number) {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      this.saveCartToLocalStorage();
    }
  }

  // Kiểm tra xem localStorage có sẵn không
  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}

