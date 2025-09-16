import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'transition-overlay',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-1000"
      [class]="isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    >
      <div class="text-center text-white">
        <h1 class="text-5xl md:text-6xl font-bold mb-6 animate-pulse">Bem-vindo ao FixSys</h1>
        <p class="text-xl md:text-2xl">Sistema de controle de manutenção simplificado</p>
      </div>
    </div>
  `,
})
export class TransitionOverlay implements OnInit {
  isVisible = true;

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = false;
    }, 2000);
  }
}