import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from './cart-item/cart-item.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CommonModule } from '@angular/common';
import { OrderFormComponent } from '../product-detail/order-form.component'; 
@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, OrderSummaryComponent, OrderFormComponent, CommonModule],
  template: `
   <div class="p-6 flex flex-col gap-4">
  <h2 class="text-xl bg-slate-100 font-bold mt-1 px-4 py-3 shadow-md flex justify-between items-center">
    PANIER D'ACHAT
  </h2>

  <!-- Cart Layout: Responsive (Column on small screens, Row on large screens) -->
  <div class="flex flex-col md:flex-row gap-6">
    <!-- Left Side: Cart Items (Takes all available space) -->
    <div class="flex-1 flex flex-col gap-4">
      <app-order-summary />
      <div *ngFor="let item of cartService.cart(); trackBy: trackById" class="flex justify-between items-center w-full">
        <app-cart-item [item]="item" class="w-full" />
      </div>
    </div>

    <!-- Right Side: Order Form -->
    <div class="md:w-[350px] w-full">
      <app-order-form [showQuantity]="false"></app-order-form>
    </div>
  </div>
</div>




  `,
  styles: [],
})
export class CartComponent {
  cartService = inject(CartService);

  // Define the trackById method to track items by their id
  trackById(index: number, item: any): number {
    return item.id;
  }

  // Method to update the quantity and ensure it doesn't exceed stock
  updateQuantity(item: any): void {
    if (item.quantity > item.stock) {
      item.quantity = item.stock; // Limit quantity to stock
    }
    //this.cartService.updateCart(item); // Update the cart service if necessary
  }
}
