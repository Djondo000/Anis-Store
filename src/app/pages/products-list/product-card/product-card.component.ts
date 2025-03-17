import { Component, inject, input } from '@angular/core'; 
import { RouterLink } from '@angular/router';
import { Product } from '../products-list.component';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent, RouterLink],
  template: `
    <div 
  class="bg-white shadow-md border rounded-xl p-4 flex flex-col gap-4 relative cursor-pointer w-full max-w-[280px] mx-auto"
  [routerLink]="['/detail', product().id]"
>
  <!-- Image Container --> 
  <div class="w-full h-[300px] flex justify-center items-center overflow-hidden">
    <img
      [src]="product().images[0]"
      class="w-full h-full object-cover rounded-lg"
      style="object-fit: cover;object-position: top;"
    />
  </div>

  <!-- Product Info -->
  <div class="flex flex-col">
    <span class="text-md font-bold text-center">{{ product().title }}</span>
    <span class="text-sm text-center">{{ product().price + ' DA ' }}</span>

    <!-- Add to Cart Button -->
    <div (click)="$event.stopPropagation()" class="mt-2 flex justify-center">
      <app-primary-button
        (btnClicked)="addToCart()"
        label="Ajouter au panier"
        [icon]="faCartPlus"
      />
    </div>
  </div>

  <!-- Stock Label -->
  <span
    class="absolute top-2 right-3 text-xs font-bold bg-white shadow-md border rounded-xl p-1"
    [class]="product().stock ? 'text-green-700' : 'text-red-700'"
  >
    {{ product().stock ? product().stock + ' left' : 'Out of stock' }}
  </span>
</div>

  `,
  styles: [],
})
export class ProductCardComponent {
  cartService = inject(CartService);
  faCartPlus = faCartPlus;
  product = input.required<Product>();

  // Add to cart logic
  addToCart() {
    this.cartService.addToCart(this.product());
  }
}
