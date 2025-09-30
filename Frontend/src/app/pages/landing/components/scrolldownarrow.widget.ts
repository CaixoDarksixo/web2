import { 
    Component, 
    Input, 
    HostListener, 
    OnInit 
} from '@angular/core';
import { CommonModule } from '@angular/common';

/*Efetuado atualização do scrolldown arrow widget
para que a seta apareça apenas após 3 segundos e
desapareça ao clicar nela ou ao rolar a página.
a seta havia sumido após a atualização do contactwidget */

@Component({

 selector: 'app-scroll-down-arrow',
 standalone: true,
 imports: [CommonModule],
 template: `
 @if (isVisible) {
  <div class="fixed bottom-10 left-0 right-0 z-40 flex justify-center">
    <button (click)="scrollTo(targetId)"
    class="animate-pulse bg-blue-600 text-white p-3 rounded-full shadow-xl hover:bg-blue-700 transition duration-300 ease-in-out border-2 border-white">
      <i class="pi pi-arrow-down text-xl"></i>
    </button>
  </div>
}
 `,
 styles: [`

.animate-pulse {
  animation: pulse-arrow 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-arrow {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}
 `]
})

export class ScrollDownArrowWidget implements OnInit {

 @Input() targetId!: string;
 
 isVisible: boolean = false; 


 @HostListener('window:scroll', ['$event'])
 onWindowScroll() {

  if (this.isVisible) {
   this.isVisible = window.scrollY < 100;
  }
 }
 
 ngOnInit(): void {

  setTimeout(() => {
   this.isVisible = true;
   this.onWindowScroll(); 
  }, 3000); 
 }
  
 scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {

    el.scrollIntoView({ behavior: 'smooth' });
    this.isVisible = false;
  }
 }
}
