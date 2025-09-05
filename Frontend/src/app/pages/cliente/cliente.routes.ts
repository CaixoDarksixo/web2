import { Routes } from '@angular/router';
import { Solicitacoes } from './solicitacoes';

export default [
    // rota vazia redireciona para 'solicitacoes'
    { path: '', redirectTo: 'solicitacoes', pathMatch: 'full' },
    { path: 'solicitacoes', component: Solicitacoes }

] as Routes;
