import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'features-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
<div id="features" class="py-6 px-6 lg:px-20 mt-8 mx-0 lg:mx-20">
    <div class="grid grid-cols-12 gap-6 justify-center">
    <div class="col-span-12 text-center mt-20 mb-6">
    <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">
    Gerencie Manutenções com Facilidade
    </div>
    <span class="text-muted-color text-2xl">
    Acompanhe solicitações, orçamentos e serviços em tempo real.
    </span>
</div>


<div class="col-span-12 md:col-span-6 lg:col-span-4">
    <div
    class="h-64 p-1 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50
        transform transition duration-300 hover:scale-105 hover:shadow-xl"
    >
    <div class="p-6 bg-surface-0 dark:bg-surface-900 h-full rounded-lg flex flex-col">
    <div
    class="flex items-center justify-center bg-emerald-200 mb-4"
    style="width: 3.5rem; height: 3.5rem; border-radius: 10px"
    >
    <i class="pi pi-fw pi-users text-2xl text-emerald-700"></i>
</div>
    <div class="mt-2 mb-2 text-surface-900 dark:text-surface-0 text-xl font-semibold">
    Área do Funcionário
    </div>
    <span class="text-surface-600 dark:text-surface-200">
    Gerencie solicitações abertas, crie orçamentos e finalize manutenções.
    </span>
    </div>
    </div>
</div>


<div class="col-span-12 md:col-span-6 lg:col-span-4">
    <div
    class="h-64 p-1 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-50
    transform transition duration-300 hover:scale-105 hover:shadow-xl"
    >
    <div class="p-6 bg-surface-0 dark:bg-surface-900 h-full rounded-lg flex flex-col">
    <div
    class="flex items-center justify-center bg-blue-200 mb-4"
    style="width: 3.5rem; height: 3.5rem; border-radius: 10px"
    >
    <i class="pi pi-fw pi-palette text-2xl text-blue-700"></i>
</div>
    <div class="mt-2 mb-2 text-surface-900 dark:text-surface-0 text-xl font-semibold">
    Interface Moderna
    </div>
    <span class="text-surface-600 dark:text-surface-200">
    Layout responsivo, modo escuro e usabilidade em qualquer dispositivo.
    </span>
    </div>
    </div>
</div>


<div class="col-span-12 md:col-span-6 lg:col-span-4">
    <div
    class="h-64 p-1 rounded-xl bg-gradient-to-br from-purple-100 to-pink-50
    transform transition duration-300 hover:scale-105 hover:shadow-xl"
    >
    <div class="p-6 bg-surface-0 dark:bg-surface-900 h-full rounded-lg flex flex-col">
<div
    class="flex items-center justify-center bg-purple-200 mb-4"
    style="width: 3.5rem; height: 3.5rem; border-radius: 10px"
    >
    <i class="pi pi-fw pi-star text-2xl text-purple-700"></i>
</div>
    <div class="mt-2 mb-2 text-surface-900 dark:text-surface-0 text-xl font-semibold">
                Solicitações Rápidas
    </div>
    <span class="text-surface-600 dark:text-surface-200">
    Acompanhe os valores propostos e aprove ou rejeite em poucos cliques.
    </span>
    </div>
    </div>
</div>
</div>
</div>
  `
})
export class FeaturesWidget {}
