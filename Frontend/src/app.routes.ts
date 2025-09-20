import { Routes } from '@angular/router';
import { FuncionarioLayout } from './app/layouts/component/funcionario.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { ClienteLayout } from './app/layouts/component/cliente.layout';

export const appRoutes: Routes = [
    { path: '', component: Landing, pathMatch: 'full' },
    
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },

    {   
        path: 'cliente', 
        component: ClienteLayout, 
        children: [
            { path: '', loadChildren: () => import('./app/pages/cliente/cliente.routes') }
        ]
    },
    {   
        path: 'funcionario', 
        component: FuncionarioLayout, 
        children: [
            { path: '', loadChildren: () => import('./app/pages/funcionario/funcionario.routes') }
        ]
    },
    { path: '**', redirectTo: '/notfound' },

];
