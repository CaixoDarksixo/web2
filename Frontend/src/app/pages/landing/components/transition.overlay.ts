// components/transition.overlay.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'transition-overlay',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-black transition-all duration-1000 ease-in-out"
      [class]="isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    >
      <!-- Background animation -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full opacity-20 animate-pulse-slow"></div>
        <div class="absolute bottom-1/3 right-1/3 w-48 h-48 bg-purple-500 rounded-full opacity-30 animate-float"></div>
        <div class="absolute top-1/3 right-1/4 w-32 h-32 bg-indigo-500 rounded-full opacity-25 animate-bounce-slow"></div>
      </div>

      <!-- Main content -->
      <div class="relative text-center text-white z-10 transform transition-all duration-1000"
           [class]="isVisible ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'">
        
        <!-- Logo -->
        <div class="mb-8 animate-spin-slow">
          <div class="w-24 h-24 mx-auto bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <span class="text-3xl font-bold text-white">FS</span>
          </div>
        </div>

        <!-- Title with gradient -->
        <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
          Bem-vindo ao FixSys
        </h1>
        
        <!-- Subtitle -->
        <p class="text-xl md:text-2xl mb-8 text-gray-200 font-light">
          Sistema de controle de manutenção simplificado
        </p>

        <!-- Counter -->
        <p class="text-sm text-gray-400 mt-4">
          Carregando... {{ loadingProgress }}%
        </p>
      </div>
    </div>
  `,
  styles: [`
    @keyframes pulse-slow {
      0%, 100% { transform: scale(1); opacity: 0.2; }
      50% { transform: scale(1.1); opacity: 0.3; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    @keyframes bounce-slow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-30px); }
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-pulse-slow {
      animation: pulse-slow 4s ease-in-out infinite;
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    .animate-bounce-slow {
      animation: bounce-slow 5s ease-in-out infinite;
    }
    .animate-spin-slow {
      animation: spin-slow 8s linear infinite;
    }
  `]
})
export class TransitionOverlay implements OnInit {
  isVisible = true;
  loadingProgress = 0;

  ngOnInit() {
    const interval = setInterval(() => {
      this.loadingProgress += 5;
      if (this.loadingProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          this.isVisible = false;
        }, 500);
      }
    }, 100);
  }
}