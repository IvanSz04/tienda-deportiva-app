import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    {
      id: 1,
      name: 'Camiseta Nike Dri-FIT',
      description: 'Camiseta deportiva de alta tecnología con tecnología Dri-FIT para mantenerte seco y cómodo.',
      price: 45000,
      image: 'assets/products/nike-shirt.jpg',
      category: 'Camisetas',
      brand: 'Nike',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Negro', 'Blanco', 'Azul'],
      inStock: true,
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2,
      name: 'Zapatillas Adidas Ultraboost',
      description: 'Zapatillas de running con tecnología Boost para máximo retorno de energía.',
      price: 180000,
      image: 'assets/products/adidas-shoes.jpg',
      category: 'Calzado',
      brand: 'Adidas',
      sizes: ['38', '39', '40', '41', '42', '43'],
      colors: ['Negro', 'Blanco', 'Gris'],
      inStock: true,
      rating: 4.8,
      reviews: 256
    },
    {
      id: 3,
      name: 'Shorts Under Armour',
      description: 'Shorts deportivos con tecnología HeatGear para entrenamientos intensos.',
      price: 35000,
      image: 'assets/products/ua-shorts.jpg',
      category: 'Shorts',
      brand: 'Under Armour',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Negro', 'Gris', 'Azul marino'],
      inStock: true,
      rating: 4.3,
      reviews: 89
    },
    {
      id: 4,
      name: 'Chaqueta Puma Training',
      description: 'Chaqueta ligera perfecta para entrenamientos al aire libre.',
      price: 85000,
      image: 'assets/products/puma-jacket.jpg',
      category: 'Chaquetas',
      brand: 'Puma',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Negro', 'Azul', 'Rojo'],
      inStock: true,
      rating: 4.2,
      reviews: 67
    },
    {
      id: 5,
      name: 'Leggings Nike Pro',
      description: 'Leggings de compresión para máximo rendimiento y comodidad.',
      price: 55000,
      image: 'assets/products/nike-leggings.jpg',
      category: 'Pantalones',
      brand: 'Nike',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Negro', 'Gris', 'Azul marino'],
      inStock: true,
      rating: 4.6,
      reviews: 194
    },
    {
      id: 6,
      name: 'Sudadera Adidas Essentials',
      description: 'Sudadera clásica con capucha, perfecta para el día a día.',
      price: 75000,
      image: 'assets/products/adidas-hoodie.jpg',
      category: 'Sudaderas',
      brand: 'Adidas',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Negro', 'Gris', 'Blanco'],
      inStock: false,
      rating: 4.4,
      reviews: 156
    }
  ];

  constructor() { }

  getAllProducts(): Observable<Product[]> {
    return of(this.products).pipe(delay(500));
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product).pipe(delay(300));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const filteredProducts = this.products.filter(p => p.category === category);
    return of(filteredProducts).pipe(delay(400));
  }

  searchProducts(query: string): Observable<Product[]> {
    const searchResults = this.products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase())
    );
    return of(searchResults).pipe(delay(600));
  }

  getFeaturedProducts(): Observable<Product[]> {
    const featured = this.products.filter(p => p.rating >= 4.5);
    return of(featured).pipe(delay(400));
  }

  getCategories(): Observable<string[]> {
    const categories = [...new Set(this.products.map(p => p.category))];
    return of(categories).pipe(delay(200));
  }
}