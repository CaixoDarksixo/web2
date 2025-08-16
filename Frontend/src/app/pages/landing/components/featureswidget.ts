import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'features-widget',
    standalone: true,
    imports: [CommonModule],
    template: ` <div id="features" class="py-6 px-6 lg:px-20 mt-8 mx-0 lg:mx-20">
        <div class="grid grid-cols-12 gap-4 justify-center">
            <div class="col-span-12 text-center mt-20 mb-6">
                <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Gerencie Manutenções com Facilidade</div>
                <span class="text-muted-color text-2xl">Acompanhe solicitações, orçamentos e serviços em tempo real.</span>
            </div>

            <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                <div style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(237, 253, 165, 0.2), rgba(187, 199, 205, 0.2)), linear-gradient(180deg, rgba(207, 253, 165, 0.2), rgba(195, 187, 205, 0.2))">
                    <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                        <div class="flex items-center justify-center bg-emerald-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                            <i class="pi pi-fw pi-users text-2xl! text-emerald-700"></i>
                        </div>
                        <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Área do Funcionário</div>
                        <span class="text-surface-600 dark:text-surface-200">Gerencie solicitações abertas, crie orçamentos e finalize manutenções.</span>
                    </div>
                </div>
            </div>

            <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                <div style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(145, 203, 237, 0.2), rgba(230, 145, 251, 0.2)), linear-gradient(180deg, rgba(171, 165, 253, 0.2), rgba(172, 215, 223, 0.2))">
                    <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                        <div class="flex items-center justify-center bg-blue-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                            <i class="pi pi-fw pi-palette text-2xl! text-blue-700"></i>
                        </div>
                        <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Interface Moderna</div>
                        <span class="text-surface-600 dark:text-surface-200">Layout responsivo, modo escuro e usabilidade em qualquer dispositivo.</span>
                    </div>
                </div>
            </div>

            
            <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                <div style="height: 160px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(195, 187, 205, 0.2), rgba(246, 158, 188, 0.2)), linear-gradient(180deg, rgba(196, 145, 237, 0.2), rgba(250, 160, 160, 0.2))">
                    <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                        <div class="flex items-center justify-center bg-purple-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                            <i class="pi pi-fw pi-star text-2xl! text-purple-700"></i>
                        </div>
                        <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Solicitações Rápidas</div>
                        <span class="text-surface-600 dark:text-surface-200">Acompanhe os valores propostos e aprove ou rejeite em poucos cliques.</span>
                    </div>
                </div>
            </div>

        </div>
    </div>`
})
export class FeaturesWidget {}
