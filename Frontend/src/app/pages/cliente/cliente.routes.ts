import { Routes } from '@angular/router';
import { Solicitacoes } from './solicitacoes/solicitacoes';
import { VisualizarSolicitacao } from './visualizar-solicitacao/visualizar-solicitacao';
import { MostrarOrcamento } from './mostrar-orcamento/mostrar-orcamento';
import { PagarServico } from './pagar-servico/pagar-servico';

export default [
    { path: '', redirectTo: 'solicitacoes', pathMatch: 'full' },
    { path: 'solicitacoes', component: Solicitacoes },
    { path: 'solicitacoes/:id', component: VisualizarSolicitacao },
    { path: 'solicitacoes/:id/orcamento', component: MostrarOrcamento },
    { path: 'solicitacoes/:id/pagar', component: PagarServico }

] as Routes;
