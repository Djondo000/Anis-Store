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
<div class="p-2 text-center">
  <div class="flex flex-col md:flex-row gap-4 mt-4 mx-auto">

    <!-- Thumbnail and Main Image Container -->
    <div class="flex flex-row gap-4 relative">
      <!-- Thumbnail Selector on the Left -->
      <div class="flex flex-col gap-2 w-[50px]">
        <img 
          *ngFor="let img of product?.images; let i = index" 
          [src]="img" 
          (click)="selectedImage = img" 
          class="w-16 h-16 object-cover rounded-lg border cursor-pointer hover:border-green-500"
        />
      </div>

      <!-- Main Image Display with Description and Price Positioned at the Top -->
      <div class="flex flex-col flex-1 relative">
        <!-- Product details card (description, price, etc.) -->
        
        <img 
          [src]="selectedImage ?? 'assets/default-image.jpg'" 
          class="w-full object-contain rounded-lg"
        />
        <div class="bg-white shadow-md border rounded-xl p-4 mt-4 md:mt-0 flex flex-col items-center w-fit">
  <span class="text-2xl font-bold">{{ product?.title }}</span>
  <span class="text-xl text-green-600 font-bold">{{ product?.price + ' DA' }}</span>
</div>


      </div>
    </div>

    <app-order-form [showQuantity]="true"></app-order-form>
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
    // this.productsService.getProductById(this.productId).subscribe(product => {
    //   if (product) {
    //     this.product = product; // Assign the product only if it's not undefined
    //   } else {
    //     console.error('Product not found');
    //   }
    // });
    
    this.selectedImage = this.product?.images?.[0]; // Set default image
  }
  
}
