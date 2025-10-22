import { Component, ElementRef } from '@angular/core';
import { FuncionarioMenu } from './funcionario.menu';

@Component({
    selector: 'funcionario-sidebar',
    standalone: true,
    imports: [FuncionarioMenu],
    template: ` <div class="layout-sidebar">
        <funcionario-menu></funcionario-menu>
    </div>`
})
export class FuncionarioSidebar {
    constructor(public el: ElementRef) {}
}
