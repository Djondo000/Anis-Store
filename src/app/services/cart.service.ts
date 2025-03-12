import { Injectable, signal } from '@angular/core';
import { Product } from '../pages/products-list/products-list.component';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<Product[]>([]);

  // Add to cart only if product is not already in the cart
  addToCart(product: Product) {
    const existingProduct = this.cart().find((p) => p.id === product.id);
    if (!existingProduct) {
      this.cart.set([...this.cart(), product]); // Add product to cart if not already there
    }
  }

  removeFromCart(product: Product) {
    this.cart.set(this.cart().filter((p) => p.id !== product.id)); // Remove product from cart
  }
  updateCart() {
    this.cart.set([...this.cart()]); 
  }
}
