import { Component, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ClienteTopbar } from './cliente.topbar';
import { AppSidebar } from './app.sidebar';
import { LayoutService } from '../service/layout.service';

@Component({
    selector: 'cliente-layout',
    standalone: true,
    imports: [CommonModule, ClienteTopbar, RouterModule],
    template: `<div class="layout-wrapper">
        <cliente-topbar></cliente-topbar>
        <div class="layout-main-container">
            <div class="layout-main">
                <router-outlet></router-outlet>
            </div>
        </div>
    </div> 
    `
})

export class ClienteLayout {}