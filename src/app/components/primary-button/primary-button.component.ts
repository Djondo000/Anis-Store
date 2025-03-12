import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-primary-button',
  standalone: true, // For standalone components in Angular 14+
  imports: [CommonModule, FaIconComponent],
  template: `
    <button
      class="bg-blue-950 text-white w-full border px-5 py-2 rounded-xl shadow-md hover:opacity-90"
      (click)="btnClicked.emit()"
    >
      <!-- Only render the icon if it's provided -->
      <fa-icon *ngIf="icon" [icon]="icon" class="mr-2"></fa-icon>
      <span class="text-md ">{{ label }}</span>
    </button>
  `,
  styles: [],
})
export class PrimaryButtonComponent {
  @Input() label: string = '';
  @Input() icon: IconProp | null = null; 
  @Output() btnClicked = new EventEmitter<void>();
}
