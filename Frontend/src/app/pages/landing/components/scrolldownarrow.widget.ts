import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-down-arrow',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="flex justify-center mt-10">
    <button (click)="scrollTo(targetId)"
    class="animate-bounce bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition">
    <i class="pi pi-arrow-down text-xl"></i>
    </button>
</div>
  `,
styles: [`
.animate-bounce {
    animation: bounce 1.5s infinite;
}
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(10px); }
}
  `]
})
export class ScrollDownArrowWidget {
@Input() targetId!: string;

scrollTo(id: string) {
const el = document.getElementById(id);
if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
}
}
}
