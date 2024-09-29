// src/app/components/product-item/product-item.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product: Product = { id: 0, name: '', description: '', price: 0, creationDate: new Date() };
  @Output() delete = new EventEmitter<number>();

  onDelete() {
    this.delete.emit(this.product.id);
  }
}