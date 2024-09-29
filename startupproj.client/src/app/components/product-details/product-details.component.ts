// src/app/components/product-details/product-details.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  @Input() product: Product = { id: 0, name: '', description: '', price: 0, creationDate: new Date() };
  @Output() save = new EventEmitter<Product>();

  onSave() {
    this.save.emit(this.product);
  }

  onImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.product.imageUrl = e.target.result;
      };
      reader.readAsDataURL(inputElement.files[0]);
    }
  }
}