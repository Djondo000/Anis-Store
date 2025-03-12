import { Injectable } from '@angular/core';
import { Product } from '../pages/products-list/products-list.component';

@Injectable({
  providedIn: 'root', // Makes this service globally available
})
export class ProductsService {
  private productsList: Product[] = [
    {
      id: 1,
      title: 'قميص أفغاني',
      price: 4999.95,
      images:  ['images/chemiseB.jpeg', 'images/chemiseBleu.jpeg','images/chemiseG.jpeg','images/chemise beige.jpeg','images/chemise beige.jpeg','images/chemise beige.jpeg','images/default-image.png'],
      stock: 10,
      quantity: 1
    },
    {
      id: 2,
      title: 'قميص كويتي',
      price: 2500,
      images: ['images/chemiseBleu.jpeg'],
      stock: 0,
      quantity: 1
    },
    {
      id: 3,
      title: 'قميص سعودي',
      price: 3000,
      images: ['images/chemiseG.jpeg'],
      stock: 5,
      quantity: 1
    },
    {
      id: 4,
      title: 'قميص إماراتي',
      price: 4000,
      images: ['images/chemise beige.jpeg'],
      stock: 7,
      quantity: 1
    },
    {
      id: 5,
      title: 'قميص أفغاني',
      price: 4999.95,
      images: ['images/chemiseB.jpeg'],
      stock: 10,
      quantity: 1
    },
    {
      id: 6,
      title: 'قميص كويتي',
      price: 2500,
      images: ['images/chemiseBleu.jpeg'],
      stock: 0,
      quantity: 1
    },
    {
      id: 7,
      title: 'قميص سعودي',
      price: 3000,

      images: ['images/chemiseG.jpeg'],
      stock: 5,
      quantity: 1
    },
    {
      id: 8,
      title: 'قميص إماراتي',
      price: 4000,
      images: ['images/chemise beige.jpeg'],
      stock: 7,
      quantity: 1
    },
  ];

  // Method to get all products
  getProducts(): Product[] {
    return this.productsList;
  }

  // Method to get a product by ID
  getProductById(id: number): Product | undefined {
    return this.productsList.find(p => p.id === id);
  }
}
