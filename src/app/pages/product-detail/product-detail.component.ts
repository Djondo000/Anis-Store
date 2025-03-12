import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../products-list/products-list.component';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { OrderFormComponent } from './order-form.component';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, OrderFormComponent],
  template: `
<div class="p-8 text-center">
  
  <div class="flex gap-4 mt-4 mx-auto">

    <!-- Thumbnail Selector on the Left -->
    <div class="flex flex-col gap-2 w-[80px]">
      <img 
        *ngFor="let img of product?.images; let i = index" 
        [src]="img" 
        (click)="selectedImage = img" 
        class="w-16 h-16 object-cover rounded-lg border cursor-pointer hover:border-green-500"
      />
    </div>

    <!-- Product details card taking half screen width -->
    <div class="bg-white shadow-md border rounded-xl p-4 flex flex-col justify-center items-center flex-1">
      <!-- Main Image Display -->
      <div class="flex flex-col">
        <span class="text-2xl font-bold">{{ product?.title }}</span>
        <span class="text-xl text-green-600 font-bold">{{ product?.price + ' DA' }}</span>
      </div>
      <div class="mx-auto mt-2">
        <img 
          [src]="selectedImage ?? 'assets/default-image.jpg'" 
          class="w-full object-contain rounded-lg"
        />
      </div>
    </div>
    <app-order-form [showQuantity]="true"> </app-order-form>
  </div>
</div>

  `,
  styles: []
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  
  productId = Number(this.route.snapshot.paramMap.get('id')); 
  product: Product | undefined;
  selectedImage: string | undefined; // Selected image for preview

  constructor() {
    this.loadProduct();
  }

  private loadProduct() {
    this.product = this.productsService.getProductById(this.productId);
    this.selectedImage = this.product?.images?.[0]; // Set default image
  }
}
