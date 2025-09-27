import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  featuredProducts: Product[] = [];
  categories: string[] = [];
  loading = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadFeaturedProducts();
    this.loadCategories();
  }

  loadFeaturedProducts() {
    this.productService.getFeaturedProducts().subscribe(products => {
      this.featuredProducts = products;
      this.loading = false;
    });
  }

  loadCategories() {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  goToProducts() {
    this.router.navigate(['/tabs/products']);
  }

  goToCategory(category: string) {
    this.router.navigate(['/tabs/products'], { queryParams: { category } });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  viewProduct(product: Product) {
    // Navegar a detalle del producto (implementar después)
    console.log('Ver producto:', product.name);
  }
}