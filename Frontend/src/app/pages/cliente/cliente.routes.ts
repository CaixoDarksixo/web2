import { Routes } from '@angular/router';
import { Solicitacoes } from './solicitacoes';
import { VisualizarSolicitacao } from './visualizarSolicitacao';

export default [
    { path: '', redirectTo: 'solicitacoes', pathMatch: 'full' },
    { path: 'solicitacoes', component: Solicitacoes },
    { path: 'solicitacoes/:id', component: VisualizarSolicitacao }

] as Routes;
