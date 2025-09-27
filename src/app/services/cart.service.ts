import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCartFromStorage();
  }

  addToCart(product: Product, quantity: number = 1, selectedSize: string = '', selectedColor: string = ''): void {
    const existingItemIndex = this.cartItems.findIndex(item => 
      item.product.id === product.id && 
      item.selectedSize === selectedSize && 
      item.selectedColor === selectedColor
    );

    if (existingItemIndex > -1) {
      this.cartItems[existingItemIndex].quantity += quantity;
    } else {
      const newItem: CartItem = {
        product,
        quantity,
        selectedSize,
        selectedColor
      };
      this.cartItems.push(newItem);
    }

    this.updateCart();
  }

  removeFromCart(productId: number, selectedSize: string = '', selectedColor: string = ''): void {
    this.cartItems = this.cartItems.filter(item => 
      !(item.product.id === productId && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor)
    );
    this.updateCart();
  }

  updateQuantity(productId: number, quantity: number, selectedSize: string = '', selectedColor: string = ''): void {
    const itemIndex = this.cartItems.findIndex(item => 
      item.product.id === productId && 
      item.selectedSize === selectedSize && 
      item.selectedColor === selectedColor
    );

    if (itemIndex > -1) {
      if (quantity <= 0) {
        this.removeFromCart(productId, selectedSize, selectedColor);
      } else {
        this.cartItems[itemIndex].quantity = quantity;
        this.updateCart();
      }
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cart$;
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getCartItemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  private updateCart(): void {
    this.cartSubject.next([...this.cartItems]);
    this.saveCartToStorage();
  }

  private saveCartToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next([...this.cartItems]);
    }
  }
}