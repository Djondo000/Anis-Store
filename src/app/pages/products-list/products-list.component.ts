import { Component, inject, signal } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsService } from '../../services/products.service';

export type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  stock?: number;
  quantity: number;
};

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductCardComponent],
  template: `
    <div class="p-8 grid grid-cols-4 gap-4">
      @for (product of products(); track product.id) {
        <app-product-card [product]="product" />
      }
    </div>
  `,
  styles: [],
})
export class ProductsListComponent {
  private productsService = inject(ProductsService);
  products = signal<Product[]>([]);

  constructor() {
    this.loadProducts();
  }

  loadProducts() {
    this.products.set(this.productsService.getProducts());
  }
}
