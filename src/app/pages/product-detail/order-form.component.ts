import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white shadow-md border rounded-xl p-6 flex flex-col gap-4 w-[350px]">
      <h3 class="text-xl font-semibold text-center">Détails de la commande</h3>
      <form>
        <div class="flex flex-col mt-2">
          <label for="name" class="text-sm font-semibold">Nom</label>
          <input id="name" type="text" class="border p-2 rounded-lg" placeholder="Entrez votre nom" name="name" required />
        </div>

        <div class="flex flex-col mt-2">
          <label for="phone" class="text-sm font-semibold">Numéro de téléphone</label>
          <input id="phone" type="text" class="border p-2 rounded-lg" placeholder="Entrez votre numéro de téléphone" name="phone" required />
        </div>

        <div class="flex flex-col mt-2">
          <label for="email" class="text-sm font-semibold">Email</label>
          <input id="email" type="email" class="border p-2 rounded-lg" placeholder="Entrez votre email" name="email" required />
        </div>

        <div class="flex flex-col mt-2" *ngIf="showQuantity">
          <label for="quantity" class="text-sm font-semibold">Quantité</label>
          <input id="quantity" type="number" class="border p-2 rounded-lg" name="quantity" min="1" value="1" required />
        </div>

        <div class="flex flex-col mt-2" *ngIf="showQuantity" >
          <label for="size" class="text-sm font-semibold">Taille</label>
          <select id="size" class="border p-2 rounded-lg" name="size" required>
            <option value="S">Petit</option>
            <option value="M">Moyenne</option>
            <option value="L">Grande</option>
            <option value="XL">Très grande</option>
          </select>
        </div>

        <div class="flex flex-col mt-2">
          <label for="address" class="text-sm font-semibold">Adresse</label>
          <input id="address" type="text" class="border p-2 rounded-lg" placeholder="Entrez votre adresse" name="address" required />
        </div>

        <div class="flex flex-col mt-2">
          <label for="wilaya" class="text-sm font-semibold">Wilaya</label>
          <select id="wilaya" class="border p-2 rounded-lg" name="wilaya" required>
            <option value="Alger">Alger</option>
          </select>
        </div>

        <div class="mt-4">
          <button type="submit" class="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700">
            Passer la commande
          </button>
        </div>
      </form>
    </div>
  `,
  styles: []
})
export class OrderFormComponent {
    @Input() showQuantity: boolean = false;
}
