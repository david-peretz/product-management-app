// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  creationDate: Date;
  imageUrl?: string; // Add this line
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([
    { id: 1, name: 'Product 1', description: 'This is product 1', price: 10, creationDate: new Date('2022-01-01') },
    { id: 2, name: 'Product 2', description: 'This is product 2', price: 20, creationDate: new Date('2022-02-01') },
    // Add more products for testing pagination
    { id: 3, name: 'Product 3', description: 'This is product 3', price: 30, creationDate: new Date('2022-03-01') },
    { id: 4, name: 'Product 4', description: 'This is product 4', price: 40, creationDate: new Date('2022-04-01') },
    { id: 5, name: 'Product 5', description: 'This is product 5', price: 50, creationDate: new Date('2022-05-01') },
    { id: 6, name: 'Product 6', description: 'This is product 6', price: 60, creationDate: new Date('2022-06-01') },
    { id: 7, name: 'Product 7', description: 'This is product 7', price: 70, creationDate: new Date('2022-07-01') },
    { id: 8, name: 'Product 8', description: 'This is product 8', price: 80, creationDate: new Date('2022-08-01') },
    { id: 9, name: 'Product 9', description: 'This is product 9', price: 90, creationDate: new Date('2022-09-01') },
    { id: 10, name: 'Product 10', description: 'This is product 10', price: 100, creationDate: new Date('2022-10-01') },
  ]);

  private searchQuerySubject = new BehaviorSubject<string>('');
  private currentPageSubject = new BehaviorSubject<number>(1);
  private sortOrderSubject = new BehaviorSubject<string>(''); // Add this line
  private itemsPerPage = 5;

  products$ = this.productsSubject.asObservable();
  searchQuery$ = this.searchQuerySubject.asObservable();
  currentPage$ = this.currentPageSubject.asObservable();
  sortOrder$ = this.sortOrderSubject.asObservable(); // Add this line

  addProduct(product: Product) {
    const products = this.productsSubject.value;
    this.productsSubject.next([...products, product]);
  }

  updateProduct(updatedProduct: Product) {
    const products = this.productsSubject.value.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    this.productsSubject.next(products);
  }

  deleteProduct(id: number) {
    const products = this.productsSubject.value.filter(product => product.id !== id);
    this.productsSubject.next(products);
  }

  setSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
    this.setCurrentPage(1); // Reset to first page on new search
  }

  setSortOrder(order: string) {
    this.sortOrderSubject.next(order);
    this.setCurrentPage(1); // Reset to first page on new sort
  }

  setCurrentPage(page: number) {
    this.currentPageSubject.next(page);
  }

  getFilteredProducts(): Product[] {
    const query = this.searchQuerySubject.value.toLowerCase();
    const sortOrder = this.sortOrderSubject.value;
    let products = this.productsSubject.value.filter(product =>
      product.name.toLowerCase().includes(query) || (product.description && product.description.toLowerCase().includes(query))
    );

    if (sortOrder === 'recentlyAdded') {
      products = products.sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime());
    }

    const start = (this.currentPageSubject.value - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    return products.slice(start, end);
  }

  getTotalPages(): number {
    const query = this.searchQuerySubject.value.toLowerCase();
    const products = this.productsSubject.value.filter(product =>
      product.name.toLowerCase().includes(query) || (product.description && product.description.toLowerCase().includes(query))
    );
    return Math.ceil(products.length / this.itemsPerPage);
  }

  // Add this method to get the current value of products
  getProductsValue(): Product[] {
    return this.productsSubject.value;
  }
}