import { Routes } from '@angular/router';
import { FuncionarioComponent } from './funcionario';
import { GerenciarCategorias } from './gerenciarCategorias';
import { GerenciarFuncionarios } from './gerenciarFuncionarios';
import { Solicitacoes } from './solicitacoes';
import { Relatorios } from './relatorios';

export default [
    { path: '', pathMatch: 'full', component: FuncionarioComponent },
    { path: 'solicitacoes', component: Solicitacoes},
    { path: 'categorias', component: GerenciarCategorias},
    { path: 'funcionarios', component: GerenciarFuncionarios},
    { path: 'relatorios', component: Relatorios}
] as Routes;
