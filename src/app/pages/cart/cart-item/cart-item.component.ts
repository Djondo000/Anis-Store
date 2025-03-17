import { Component, inject, input } from '@angular/core';
import { Product } from '../../products-list/products-list.component';
import { CartService } from '../../../services/cart.service';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
@Component({
  selector: 'app-cart-item',
  imports: [PrimaryButtonComponent],
  template: `
   <div class="bg-white shadow-md border rounded-xl p-2 flex items-center gap-x-4 justify-between">
  <!-- Product Image -->
  <img [src]="item().images[0]" class="h-[100px] border rounded-xl" />

  <!-- Product Info + Quantity Controls (Stacked) -->
  <div class="flex flex-1 flex-col items-start min-w-0">
    <span class="text-md font-bold truncate">{{ item().title }}</span>
    <span class="text-sm">{{ item().price + ' DA' }}</span>

    <!-- Quantity Controls (Now below the title) -->
    <div class="flex items-center gap-2 mt-2">
      <button
        class="bg-white shadow-md border px-2 py-1 rounded-lg hover:bg-gray-300 text-lg font-bold"
        (click)="decreaseQuantity(item())"
      >
        -
      </button>
      <span class="text-m font-bold">{{ item().quantity }}</span>
      <button
        class="bg-white shadow-md border px-2 py-1 rounded-lg hover:bg-gray-300 text-lg font-bold"
        (click)="increaseQuantity(item())"
      >
        +
      </button>
    </div>
  </div>

  <!-- "Enlever" Button (Always aligned to the right) -->
  <app-primary-button
    class="shrink-0 w-fit ml-3"
    label="Enlever"
    (btnClicked)="cartService.removeFromCart(item())"
    [icon]="faTrashCan"
  />
</div>

  `,
  styles: ``,
})
export class CartItemComponent {
  item = input.required<Product>();
  faTrashCan = faTrashCan;
  cartService = inject(CartService);
  increaseQuantity(item: any) {
    item.quantity = (item.quantity || 1) + 1;
    this.cartService.updateCart();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateCart();
    }
  }
}
