import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent, RouterLink],
  template: `
    <div
      class="bg-slate-100 mt-1 px-4 py-3 shadow-md flex justify-between items-center"
    >
    <button class="text-2xl font-black uppercase tracking-wide" routerLink="/">anis store</button>

      <app-primary-button label="{{ cartLabel() }}" routerLink="/cart" [icon]="faCartShopping"  />
    </div>
  `,
  styles: ``,
})
export class HeaderComponent {
  cartService = inject(CartService);
  faCartShopping = faCartShopping;
  cartLabel = computed(() => `Panier (${this.cartService.cart().length})`);
}
