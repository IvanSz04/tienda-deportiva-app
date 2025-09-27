import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() showAddToCart: boolean = true;
  @Input() showFavorite: boolean = true;
  @Input() isFavorite: boolean = false;

  @Output() addToCart = new EventEmitter<Product>();
  @Output() viewProduct = new EventEmitter<Product>();
  @Output() toggleFavorite = new EventEmitter<Product>();

  onAddToCart() {
    if (this.product.inStock) {
      this.addToCart.emit(this.product);
    }
  }

  onViewProduct() {
    this.viewProduct.emit(this.product);
  }

  onToggleFavorite() {
    this.toggleFavorite.emit(this.product);
  }

  getStarArray(): number[] {
    const rating = Math.floor(this.product.rating);
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }
}