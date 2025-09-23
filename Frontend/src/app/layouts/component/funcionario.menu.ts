import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'funcionario-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem [item]="item" [index]="i" [root]="true"></li>
        </ng-container>
    </ul> `
})
export class FuncionarioMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Início',
                items: [{ label: 'Visão Geral', icon: 'pi pi-fw pi-home', routerLink: ['/funcionario'] }]
            },
            {
                label: 'Principal',
                items: [
                    { label: 'Todas as Solicitações', icon: 'pi pi-fw pi-th-large', routerLink: ['/funcionario/solicitacoes'] },
                    { label: 'Relatórios', icon: 'pi pi-fw pi-file', routerLink: ['/funcionario/relatorios'] },
                ]
            },
            {
                label: 'Administrativo',
                items: [
                    { label: 'Gerenciar Categorias', icon: 'pi pi-fw pi-tags', routerLink: ['/funcionario/categorias'] },
                    { label: 'Gerenciar Funcionários', icon: 'pi pi-fw pi-briefcase', routerLink: ['/funcionario/funcionarios'] },
                ]
            }
        ];
    }
}
