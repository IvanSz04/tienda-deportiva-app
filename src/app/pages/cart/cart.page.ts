import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, OnDestroy {

  cartItems: CartItem[] = [];
  total: number = 0;
  itemCount: number = 0;
  private cartSubscription: Subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.cartSubscription = this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getCartTotal();
      this.itemCount = this.cartService.getCartItemCount();
    });
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  updateQuantity(item: CartItem, newQuantity: number) {
    if (newQuantity > 0) {
      this.cartService.updateQuantity(
        item.product.id, 
        newQuantity, 
        item.selectedSize, 
        item.selectedColor
      );
    }
  }

  async removeItem(item: CartItem) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que quieres eliminar "${item.product.name}" del carrito?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.cartService.removeFromCart(
              item.product.id, 
              item.selectedSize, 
              item.selectedColor
            );
          }
        }
      ]
    });

    await alert.present();
  }

  async clearCart() {
    const alert = await this.alertController.create({
      header: 'Vaciar carrito',
      message: '¿Estás seguro de que quieres vaciar todo el carrito?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Vaciar',
          handler: () => {
            this.cartService.clearCart();
          }
        }
      ]
    });

    await alert.present();
  }

  goToProducts() {
    this.router.navigate(['/tabs/products']);
  }

  async checkout() {
    const alert = await this.alertController.create({
      header: 'Checkout',
      message: `Total a pagar: $${this.total.toLocaleString()}`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Proceder al pago',
          handler: () => {
            // Simulate checkout process
            this.processCheckout();
          }
        }
      ]
    });

    await alert.present();
  }

  async processCheckout() {
    const alert = await this.alertController.create({
      header: '¡Compra exitosa!',
      message: 'Tu pedido ha sido procesado correctamente. Recibirás un email de confirmación.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.cartService.clearCart();
            this.router.navigate(['/tabs/home']);
          }
        }
      ]
    });

    await alert.present();
  }

  getItemSubtotal(item: CartItem): number {
    return item.product.price * item.quantity;
  }
}