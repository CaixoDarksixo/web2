import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  // Dados do funcionário
  getFuncionario() {
    return {
      id: 1,
      nome: 'Thiago Sakuma',
      cargo: 'Técnico de Manutenção',
      setor: 'TI',
      dataAdmissao: '2023-01-15'
    };
  }

  // Lista de chamados/tarefas
  getChamados() {
    return [
      { id: 101, titulo: 'Trocar HD do PC #23', prioridade: 'Alta', status: 'Em andamento' },
      { id: 102, titulo: 'Instalar antivírus no notebook #12', prioridade: 'Média', status: 'Pendente' },
      { id: 103, titulo: 'Configurar impressora do setor Financeiro', prioridade: 'Baixa', status: 'Concluído' },
      { id: 104, titulo: 'Formatar notebook #7', prioridade: 'Alta', status: 'Pendente' },
    ];
  }

  // Estatísticas gerais
  getEstatisticas() {
    return {
      total: 4,
      concluidos: 1,
      pendentes: 2,
      andamento: 1
    };
  }
}