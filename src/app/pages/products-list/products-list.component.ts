import { Component, Input, inject, signal, OnInit, OnChanges, SimpleChanges, effect, ChangeDetectionStrategy } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsService } from '../../services/products.service';
import { NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

export type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  stock?: number;
  quantity: number;
  category: string;
};

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush, // Improves performance
  template: `
  <!-- PRODUCTS LIST -->
  <div class="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <ng-container *ngFor="let product of products(); trackBy: trackById">
      <app-product-card [product]="product" class="w-full" />
    </ng-container>
  </div>
  `,
  styles: [],
})
export class ProductsListComponent {
  private productsService = inject(ProductsService);
  products = signal<Product[]>([]);
  lastDoc: any = null;
  isLoading = false;

  @Input() selectedCategory: string = 'categoriesH';
  @Input() selectedSubcategory: string | null = null;

  constructor(private ngZone: NgZone) {
    effect(() => {
      const subcategory = this.productsService.selectedSubCategory();
      if (subcategory !== null) {
        this.ngZone.run(() => {
          this.fetchProducts(subcategory);
        });
      }
    });
  }

  private fetchProducts(subcategory: string) {
    if (!this.selectedCategory) return;

    this.products.set([]); 
    this.lastDoc = null;
    this.loadProducts(subcategory);
  }

  private loadProducts(subcategory: string) {
    if (this.isLoading) return;
    this.isLoading = true;

    this.productsService.getProducts(this.selectedCategory, subcategory, this.lastDoc).subscribe({
      next: (newProducts) => {
        if (newProducts.length > 0) {
          this.products.set([...this.products(), ...newProducts]);
          this.lastDoc = newProducts[newProducts.length - 1];
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.isLoading = false;
      }
    });
  }
  // Track by function for better performance when rendering products
  trackById(index: number, item: Product): number {
    return item.id;
  }
}
