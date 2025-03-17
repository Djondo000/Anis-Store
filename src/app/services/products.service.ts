import { Injectable, signal } from '@angular/core';
import { Firestore, collection, getDocs, query, where, limit, startAfter, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../pages/products-list/products-list.component';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsCollection = 'products';
  public selectedSubCategory = signal<string | null>(null);

  constructor(private firestore: Firestore) {}

  getProducts(category: string, subCategory: string | null, lastDoc: any): Observable<Product[]> {
    // Create the base query
    let q = query(
      collection(this.firestore, this.productsCollection),
      where('category', '==', subCategory), 
      limit(10)
    );
    
    console.log('Firestore query:', q);

    return new Observable<Product[]>(observer => {
      getDocs(q)
        .then(snapshot => {
          console.log('Fetched documents:', snapshot.docs); // Log fetched docs
          
          if (snapshot.empty) {
            console.log('No products found for the query');
          }
          // Map the data to Product type
          const products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          } as unknown as Product));
          observer.next(products);
          observer.complete();
        })
        .catch(error => {
          console.error('Error fetching products:', error);
          observer.error(error);
        });
    });
  }
getSubCategories(subCategoryKey: string): Observable<{ id: string; name: string }[]> {
    const categoriesRef = collection(this.firestore, subCategoryKey);
    return collectionData(categoriesRef, { idField: 'id' }) as Observable<{ id: string; name: string }[]>;
  }

  setSelectedSubCategory(subCategoryId: string) {
    this.selectedSubCategory.set(subCategoryId);
  }
  getSelectedSubCategory(): string | null {
    return this.selectedSubCategory();
  }
}
