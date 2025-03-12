import { Component, inject, input } from '@angular/core';
import { Product } from '../../products-list/products-list.component';
import { CartService } from '../../../services/cart.service';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { PrimaryButtonComponent } from "../../../components/primary-button/primary-button.component";
@Component({
  selector: 'app-cart-item',
  imports: [PrimaryButtonComponent],
  template: `
    <div class="bg-white shadow-md border rounded-xl p-2 flex gap-6 items-center">
  <!-- Product Image -->
  <img [src]="item().images[0]" class="h-[100px] border rounded-xl" />

  <!-- Product Info -->
  <div class="flex flex-col">
    <span class="text-md font-bold">{{ item().title }}</span>
    <span class="text-sm"> {{ item().price + ' DA'}}</span>
  </div>

  <!-- Quantity Controls -->
  <div class="flex items-center gap-3 ml-5">
  <button 
  class="bg-white shadow-md border px-3 py-2 rounded-lg hover:bg-gray-300 text-lg font-bold"
  (click)="decreaseQuantity(item())"
>
  -
</button>
    <span class="text-m font-bold">{{ item().quantity }}</span>
    <button 
  class="bg-white shadow-md border px-3 py-2 rounded-lg hover:bg-gray-300 text-lg font-bold"
  (click)="increaseQuantity(item())"
>
      +
    </button>
  </div>
  <!-- <div class="flex flex-col mt-2 w-fit">
    <label for="quantity" class="text-sm font-semibold">Quantité</label>
      <input 
        id="quantity" 
        type="number" 
        class="border p-1 rounded-lg text-center w-16" 
        name="quantity"
        min="1"
        value="1"
        required
      />
  </div> -->

  <div class="flex-1"></div>

  <!-- Remove Button -->
  <app-primary-button
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
