import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { FuncionarioComponent } from './app/pages/funcionario/funcionario.component';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';

export const appRoutes: Routes = [
    { path: '', component: Landing, pathMatch: 'full' },

    {
        path: 'dashboard',
        component: AppLayout,
        children: [
        { path: '', component: Dashboard, pathMatch: 'full' },
        { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
        { path: 'documentation', component: Documentation },
        { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
    { path: 'funcionario', component: FuncionarioComponent },

];
