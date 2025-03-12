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
      class="bg-white shadow-md border rounded-xl p-6 flex flex-col gap-6 relative cursor-pointer" 
      [routerLink]="['/detail', product().id]"
    >
      <div class="mx-auto mt-2">
        <img
          [src]="product().images[0]"
          class="w-full h-[260px] object-cover rounded-lg"  
        />
      </div>

      <div class="flex flex-col">
        <span class="text-md font-bold">{{ product().title }}</span>
        <span class="text-sm"> {{ product().price + ' DA ' }}</span>
        
        <!-- This div will hold the button and it will not affect the routerLink -->
        <div (click)="$event.stopPropagation()"> 
          <app-primary-button
            (btnClicked)="addToCart()"
            class="mt-2"
            label="Ajouter au panier"
            [icon]="faCartPlus"
          />
        </div>
      </div>

      <span
        class="absolute top-2 right-3 text-sm font-bold bg-white shadow-md border rounded-xl p-2 flex flex-col gap-6"
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
