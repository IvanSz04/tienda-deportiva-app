import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  searchTerm: string = '';
  loading = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
    
    // Check for category filter from route params
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
        this.filterProducts();
      }
    });
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
      this.loading = false;
      this.filterProducts();
    });
  }

  loadCategories() {
    this.productService.getCategories().subscribe(categories => {
      this.categories = ['Todos', ...categories];
    });
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
    this.filterProducts();
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.detail.value;
    this.filterProducts();
  }

  filterProducts() {
    let filtered = [...this.products];

    // Filter by category
    if (this.selectedCategory && this.selectedCategory !== 'Todos') {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    // Filter by search term
    if (this.searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredProducts = filtered;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  viewProduct(product: Product) {
    // Navigate to product detail (implement later)
    console.log('Ver producto:', product.name);
  }
}