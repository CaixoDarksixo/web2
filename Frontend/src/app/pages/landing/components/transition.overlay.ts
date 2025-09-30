// components/transition.overlay.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'transition-overlay',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary-900 to-purple-900 transition-all duration-1000 ease-in-out"
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
          <svg viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg" class="mb-8 w-40 shrink-0 mx-auto">
            <path d="M26.8414 30.472L52.0329 56.52L55.1818 53.3627L29.2031 28.104L34.7138 23.368L26.8414 21L18.1818 29.6827L22.9052 34.4187L26.8414 30.472Z" fill="#ffffff"/>
            <path d="M44.6747 33.5972L22.9294 54.0659L26.8164 57.998L47.0069 35.9565L54.778 38.3129L60.2133 31.2287L56.3263 27.2966L52.4442 32.8064L49.3358 32.0212L48.5568 28.0874L53.9941 24.9373L50.1071 21.0052L42.3396 25.7302L44.6747 33.5972Z" fill="#ffffff"/>
            <mask id="mask0_4_30" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="78" height="78">
              <path d="M38.8623 19.127C36.2706 19.127 33.704 19.6372 31.3096 20.6289C28.9151 21.6207 26.7389 23.0746 24.9062 24.9072C23.0736 26.7399 21.6197 28.916 20.6279 31.3105C19.6361 33.705 19.126 36.2715 19.126 38.8633C19.1263 44.0974 21.206 49.1174 24.9072 52.8184C28.6084 56.5193 33.6282 58.5986 38.8623 58.5986C44.0961 58.5983 49.1155 56.5191 52.8164 52.8184C56.5174 49.1174 58.5973 44.0972 58.5977 38.8633C58.5977 33.6292 56.5182 28.6094 52.8174 24.9082C49.1164 21.2069 44.0965 19.1273 38.8623 19.127ZM33.4287 68.2295L31.8975 67.8604C28.8587 67.1285 25.9532 65.9239 23.2881 64.291L21.9443 63.4678L16.6396 68.7725L8.9541 61.0869L13.1338 56.9072L14.248 55.7939L13.4268 54.4502C11.7958 51.7818 10.5935 48.8736 9.86523 45.832L9.49805 44.2979H2V33.4287H9.49707L9.86621 31.8975C10.5981 28.8587 11.8017 25.9532 13.4346 23.2881L14.2588 21.9443L8.9541 16.6396L16.6396 8.9541L20.8193 13.1338L21.9326 14.248L23.2764 13.4268C25.9447 11.7959 28.8529 10.5938 31.8936 9.86523L33.4277 9.49805V2.00488H44.2998V9.50098L45.832 9.87012C48.8711 10.6019 51.7761 11.8066 54.4414 13.4395L55.7861 14.2627L56.9004 13.1484L61.0898 8.95801L68.7764 16.6426L64.5938 20.8184L63.4775 21.9316L64.2998 23.2773C65.9306 25.9453 67.1321 28.8533 67.8604 31.8945L68.2285 33.4287H75.7266V44.2969H68.2295L67.8604 45.8291C67.1285 48.8682 65.9239 51.7732 64.291 54.4385L63.4678 55.7832L64.583 56.8975L68.7715 61.0859L61.0859 68.7715L55.793 63.4785L54.4492 64.2998C51.7813 65.9306 48.8733 67.132 45.832 67.8604L44.2979 68.2285V75.7266H33.4287V68.2295Z" stroke="black" stroke-width="4"/>
            </mask>
            <g mask="url(#mask0_4_30)">
              <circle cx="38.5" cy="38.5" r="31.5" stroke="#ffffff" stroke-width="18"/>
            </g>
          </svg>
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
      from { transform: rotate(-90deg); }
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