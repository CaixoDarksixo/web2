import { Routes } from '@angular/router';
import { FuncionarioLayout } from './app/layouts/component/funcionario.layout';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { ClienteLayout } from './app/layouts/component/cliente.layout';

export const appRoutes: Routes = [
    { path: '', loadComponent: () => import('./app/pages/landing/landing').then(m => m.Landing), pathMatch: 'full' },

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
    
    { path: '**', loadComponent: () => import('./app/pages/notfound/notfound').then(m => m.Notfound) },

];
