import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'hero-widget',
    imports: [RouterModule, ButtonModule, RippleModule],
    template: `
        <div
            id="hero"
            class="flex flex-col pt-6 px-6 lg:px-20 overflow-hidden"
            style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgba(194, 175, 239, 1) 0%, rgba(233, 195, 250, 1) 100%); clip-path: ellipse(150% 87% at 93% 13%)"
        >
            <div class="mx-6 md:mx-20 mt-0 md:mt-6">
                <h1 class="text-6xl font-bold text-gray-900 leading-tight dark:!text-gray-700"><span class="font-light block">FixSys,</span>O seu sistema de controle de manutenção simplificado.</h1>
                <p class="font-normal text-2xl leading-normal md:mt-4 text-gray-700 dark:text-gray-700">Clientes acompanham o status em tempo real e funcionários têm todas as ferramentas para organizar o fluxo de trabalho.</p>
                <button pButton pRipple [rounded]="true" type="button" label="Acessar Agora" class="text-xl! mt-8 px-4!" routerLink="/auth/login"></button>
            </div>
            <div class="flex justify-center md:justify-end">
                <img src="https://media.discordapp.net/attachments/1236531266845671494/1406093598008545340/Projeto_Remover_fundo_2.png?ex=68a13635&is=689fe4b5&hm=8b96d3087dbc31b4ee21bdba14623be7b96f2086c06652dc926bee34aca34626&=&format=webp&quality=lossless" alt="Hero Image" class="w-9/12 md:w-auto" />
            </div>
        </div>
    `
})
export class HeroWidget {}
