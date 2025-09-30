import { Component, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClienteTopbar } from './cliente.topbar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'cliente-layout',
    standalone: true,
    imports: [CommonModule, ClienteTopbar, RouterModule, ToastModule],
    providers: [MessageService],
    template: `<div class="layout-wrapper">
        <cliente-topbar></cliente-topbar>
        <div class="layout-main-container">
            <div class="layout-main">
                <p-toast></p-toast>
                <router-outlet></router-outlet>
            </div>
        </div>
    </div> 
    `
})

export class ClienteLayout {}