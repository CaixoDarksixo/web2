import { Routes } from '@angular/router';
import { Solicitacoes } from './solicitacoes';
import { VisualizarSolicitacao } from './visualizarSolicitacao';
import { MostrarOrcamento } from './mostrarOrcamento';

export default [
    { path: '', redirectTo: 'solicitacoes', pathMatch: 'full' },
    { path: 'solicitacoes', component: Solicitacoes },
    { path: 'solicitacoes/:id', component: VisualizarSolicitacao },
    { path: 'solicitacoes/:id/orcamento', component: MostrarOrcamento }

] as Routes;
