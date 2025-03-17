import { Component, computed, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PrimaryButtonComponent, RouterLink, CommonModule],
  template: `
    <div class="bg-slate-100 mt-1 px-4 py-3 shadow-md flex justify-between items-center">
      <div class="flex items-center gap-3">
        <button class="text-2xl font-black uppercase tracking-wide" routerLink="/">ANIS STORE</button>
        <div class="h-6 w-[1px] bg-gray-400"></div>

        <div class="flex items-center gap-0">
          <ng-container *ngFor="let category of categories(); let last = last">
            <button 
              class="px-4 py-2 rounded-xl font-normal flex items-center gap-2 transition-all duration-300"
              [ngClass]="{ 'font-bold': category.key === selectedCategoryKey(), 'font-normal': category.key !== selectedCategoryKey() }"
              (click)="selectCategory(category.key)"
            >
              <img [src]="'icons/' + category.name.toLowerCase() + '.png'" alt="{{ category.name }} icon" class="w-5 h-5" />
              {{ category.name }}
            </button>
            <div *ngIf="!last" class="h-6 w-[1px] bg-gray-400"></div>
          </ng-container>
        </div>
      </div>

      <app-primary-button label="{{ cartLabel() }}" routerLink="/cart" [icon]="faCartShopping" />
    </div>

    <!-- Subcategories -->
<div class="w-full px-4" *ngIf="(subCategoryList$ | async)?.length">
  <div class="flex gap-2 overflow-x-auto scrollbar-hide w-full">
    <ng-container *ngFor="let subCategory of subCategoryList$ | async">
      <button
        class="px-4 py-2 rounded-xl transition-all uppercase flex-shrink-0"
        [ngClass]="{ 'bg-blue-950 text-white font-bold': subCategory.id === selectedSubCategory }"
        (click)="selectSubCategory(subCategory.id)"
      >
        {{ subCategory.name }}
      </button>
    </ng-container>
  </div>
</div>


  `,
  styles: [`
    .font-bold {
      font-weight: bold;
    }
  `],
})
export class HeaderComponent {
  private productsService = inject(ProductsService);
  private cartService = inject(CartService);

  categories = signal<{ name: string, key: string }[]>([
    { name: 'HOMME', key: 'categoriesH' },
    { name: 'FEMME', key: 'categoriesF' },
    { name: 'ENFANT', key: 'categoriesE' }
  ]);

  selectedCategoryKey = signal<string>('categoriesH'); // Default to HOMME
  subCategoryList$: Observable<{ id: string; name: string }[]> = this.productsService.getSubCategories(this.selectedCategoryKey());

  selectedSubCategory: string | null = null;
  
  constructor() {
    this.selectCategory(this.selectedCategoryKey());
  }

  selectCategory(categoryKey: string) {
  this.selectedCategoryKey.set(categoryKey);
  this.subCategoryList$ = this.productsService.getSubCategories(categoryKey);
  
  // Subscribe to fetch the first subcategory
  this.subCategoryList$.subscribe(subCategories => {
    if (subCategories.length > 0 && this.selectedSubCategory !== subCategories[0].id) {
      this.selectedSubCategory = subCategories[0].id; // Select the first subcategory
      this.productsService.setSelectedSubCategory(this.selectedSubCategory);
    } else {
      this.selectedSubCategory = null;
    }
  });
}

  selectSubCategory(subCategoryId: string) {
    this.selectedSubCategory = subCategoryId;
    this.productsService.setSelectedSubCategory(subCategoryId); // Notify ProductListComponent
  }

  faCartShopping = faCartShopping;
  cartLabel = computed(() => `PANIER (${this.cartService.cart().length})`);
}
