import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order-summary',
  imports: [],
  template: `
    <div class="bg-slate-100 p-6 rounded-xl shadow-xl border">
      <h2 class="text-2xl">Votre Commande:</h2>
      <div class="flex flex-col gap-4">
        <div class="flex gap-4">
          <span class="text-lg">Total</span>
          <span class="text-xl text-green-600 font-bold">{{ total() + ' DA' }}</span>
        </div>
        <!-- <app-primary-button *ngIf="icon" label="Commander" /> -->
      </div>
    </div>
  `,
  styles: ``,
})
export class OrderSummaryComponent {
  cartService = inject(CartService);
  faCartPlus = faCartPlus;

  // Updated computed property for total calculation
  total = computed(() => {
    let total = 0;
    for (const item of this.cartService.cart()) {
      total += item.price * item.quantity; // Multiply by quantity
    }
    return total;
  });
}
