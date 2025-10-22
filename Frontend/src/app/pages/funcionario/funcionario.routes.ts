import { Routes } from '@angular/router';
import { VisaoGeral } from './visaoGeral';
import { GerenciarCategorias } from './gerenciar-categorias/gerenciar-categorias';
import { GerenciarFuncionarios } from './gerenciar-funcionarios/gerenciar-funcionarios';
import { Solicitacoes } from './solicitacoes';
import { Relatorios } from './relatorios';
import { RealizarOrcamento } from './realizarOrcamento';

export default [
    { path: '', pathMatch: 'full', component: VisaoGeral },
    { path: 'solicitacoes', component: Solicitacoes},
    { path: 'categorias', component: GerenciarCategorias},
    { path: 'funcionarios', component: GerenciarFuncionarios},
    { path: 'relatorios', component: Relatorios},
    { path: 'solicitacoes/:id/orcamento', component: RealizarOrcamento},
] as Routes;
