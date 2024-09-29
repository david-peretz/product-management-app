// src/app/components/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products$?: Observable<Product[]>;
  searchQuery$: Observable<string>;
  currentPage$: Observable<number>;
  totalPages$: Observable<number>;
  currentPage: number=0;
  totalPages: number=0;
  selectedProduct: Product | null = null;

  constructor(private productService: ProductService) {
    this.searchQuery$ = this.productService.searchQuery$;
    this.currentPage$ = this.productService.currentPage$;
    this.totalPages$ = this.productService.currentPage$.pipe(
      map(() => this.productService.getTotalPages())
    );
  }

  ngOnInit() {
    this.products$ = this.currentPage$.pipe(
      map(() => this.productService.getFilteredProducts())
    );

    this.currentPage$.subscribe(page => this.currentPage = page);
    this.totalPages$.subscribe(pages => this.totalPages = pages);
  }

  onDelete(id: number) {
    this.productService.deleteProduct(id);
  }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.productService.setSearchQuery(inputElement.value);
  }

  onSortOrderChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.productService.setSortOrder(selectElement.value);
  }

  onPageChange(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.productService.setCurrentPage(page);
    }
  }

  onSelectProduct(product: Product) {
    this.selectedProduct = product;
  }

  onAddProduct() {
    this.selectedProduct = { id: 0, name: '', description: '', price: 0, creationDate: new Date() };
  }

  onSave(product: Product) {
    if (product.id === 0) {
      // Assign a new ID
      const products = this.productService.getProductsValue();
      product.id = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
      this.productService.addProduct(product);
    } else {
      this.productService.updateProduct(product);
    }
    this.selectedProduct = null;
  }
}