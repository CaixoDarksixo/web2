import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';



interface Feature {
id: number;
title: string;
description: string;
details: string;
icon: string;
colorClass: string;
textColor: string;
bgColor: string;
}

@Component({
selector: 'features-widget',
standalone: true,
imports: [CommonModule, NgClass],
template: `
<div 
id="features" 
class="py-20 px-6 lg:px-20 mt-16 mb-16 mx-0 lg:mx-20 min-h-[80vh] flex flex-col justify-center">
<div class="grid grid-cols-12 gap-6 justify-center transition-all duration-500">
<div class="col-span-12 text-center mt-20 mb-6 
            transition-opacity duration-300"
            [ngClass]="{'opacity-0 h-0': activeFeatureId !== null, 'opacity-100 h-auto': activeFeatureId === null}">
    <div class="text-surface-900 dark:text-surface-0 font-normal mb-6 text-5xl">
    Gerencie Manutenções com Facilidade
    </div>
    <span class="text-surface-600 dark:text-surface-200 text-2xl">
    Acompanhe solicitações, orçamentos e serviços em tempo real.
    </span>
</div>

@for (feature of features; track feature.id) {
    
    <div 
    [ngClass]="{
        'col-span-12': activeFeatureId === feature.id, 
        'hidden': activeFeatureId !== null && activeFeatureId !== feature.id, 
        'lg:col-span-4 md:col-span-6': activeFeatureId === null
    }"
    class="col-span-12 md:col-span-6 lg:col-span-4 transition-all duration-500 ease-in-out">
        

    <div
    (click)="toggleFeature(feature.id)"
    [ngClass]="{
    'h-auto': activeFeatureId === feature.id, 
    'h-64': activeFeatureId !== feature.id,
    
    'scale-[1.02] shadow-2xl ring-2 ring-offset-4 ring-opacity-50': activeFeatureId === feature.id,
    
    'hover:scale-[1.01] hover:shadow-xl': activeFeatureId === null
    }"
    class="p-1 rounded-xl cursor-pointer shadow-xl 
            transition-all duration-500 overflow-hidden 
            transform origin-top"
    [class]="feature.colorClass">
    <div class="p-6 bg-surface-0 dark:bg-surface-900 h-full rounded-lg flex flex-col">
    

    
    <div class="flex items-center justify-between mb-4">
        <div
            class="flex items-center justify-center mb-0"
            [class]="feature.bgColor"
            style="width: 3.5rem; height: 3.5rem; border-radius: 10px"
        >
            <i [class]="feature.icon" class="pi pi-fw text-2xl" [ngClass]="feature.textColor"></i>
        </div>

        
    <i 
    class="pi text-xl text-surface-500 dark:text-surface-400 transition-transform duration-300"
    [ngClass]="{
        'pi-chevron-up': activeFeatureId === feature.id,
        'pi-chevron-down': activeFeatureId !== feature.id
    }"
        ></i>
    </div>

    
    <div class="mt-2 mb-2 text-surface-900 dark:text-surface-0 text-xl font-semibold">
        {{ feature.title }}
    </div>
    <span class="text-surface-600 dark:text-surface-200"
            [ngClass]="{'line-clamp-3': activeFeatureId !== feature.id}">
        {{ feature.description }}
    </span>
            
            
@if (activeFeatureId === feature.id) {
    <div class="pt-4 mt-auto border-t border-surface-200 dark:border-surface-700 mt-4">
        <p class="text-sm text-surface-700 dark:text-surface-300 font-medium">
            Detalhes Completos:
        </p>
        <p class="text-sm text-surface-600 dark:text-surface-400">
            {{ feature.details }}
        </p>
    </div>
}
</div>
</div>
</div>
    }
    </div>
</div>
  `,
styles: [`

.from-green-100 { --tw-gradient-from: #d1fae5; }
.to-green-50 { --tw-gradient-to: #f0fdf4; }
.from-blue-100 { --tw-gradient-from: #dbeafe; }
.to-indigo-50 { --tw-gradient-to: #f5f3ff; }
.from-purple-100 { --tw-gradient-from: #f3e8ff; }
.to-pink-50 { --tw-gradient-to: #fdf2f8; }

/*
.text-green { color: #047857; }
.text-blue { color: #1d4ed8; }
.text-purple { color: #6d28d9; }
*/

.text-muted-color {
    color: #6b7280;
}
  `]
})
export class FeaturesWidget implements OnInit {

  activeFeatureId: number | null = null;
  
  features: Feature[] = [];

ngOnInit() {
this.features = [
{
id: 1,
title: 'Área do Funcionário',
description: 'Gerencie solicitações abertas, crie orçamentos e finalize manutenções.',
details: 'O painel do funcionário oferece uma visão organizada de todas as tarefas pendentes e concluídas.',
icon: 'pi-users',
colorClass: 'bg-gradient-to-br from-emerald-100 to-emerald-50 ring-emerald-400',
textColor: 'text-green-700',
bgColor: 'bg-emerald-200',
},
{
id: 2,
title: 'Interface Moderna',
description: 'Layout responsivo, modo escuro e usabilidade em qualquer dispositivo.',
details: 'O sistema se adapta perfeitamente a desktops, tablets e smartphones. O modo escuro reduz a fadiga ocular e aumenta o conforto visual.',
icon: 'pi-palette',
colorClass: 'bg-gradient-to-br from-blue-100 to-indigo-50 ring-blue-400',
textColor: 'text-blue-700',
bgColor: 'bg-blue-200',
},
{
id: 3,
title: 'Solicitações Rápidas',
description: 'Acompanhe os valores propostos e aprove ou rejeite em poucos cliques.',
details: 'O processo de solicitação é intuitivo e permite que o cliente anexe fotos e descrições detalhadas.',
icon: 'pi-star',
colorClass: 'bg-gradient-to-br from-purple-100 to-pink-50 ring-purple-400',
textColor: 'text-purple-700',
bgColor: 'bg-purple-200',
},
];
  }

/**
* @param featureId
*/
  toggleFeature(featureId: number): void {
    if (this.activeFeatureId === featureId) {
      this.activeFeatureId = null;
    } else {
      this.activeFeatureId = featureId;
    }
  }
}