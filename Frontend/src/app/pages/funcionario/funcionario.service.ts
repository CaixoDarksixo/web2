import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  getFuncionario() {
    return {
      id: 1,
      nome: 'Thiago Sakuma',
      cargo: 'Técnico de Manutenção',
      setor: 'TI',
      dataAdmissao: '2023-01-15'
    };
  }

  getChamados() {
    return [
      { id: 101, titulo: 'Trocar HD do PC #23', prioridade: 'Alta', status: 'Em andamento' },
      { id: 102, titulo: 'Instalar antivírus no notebook #12', prioridade: 'Média', status: 'Pendente' },
      { id: 103, titulo: 'Configurar impressora do setor Financeiro', prioridade: 'Baixa', status: 'Concluído' },
      { id: 104, titulo: 'Formatar notebook #7', prioridade: 'Alta', status: 'Pendente' },
      { id: 105, titulo: 'Atualizar Windows no PC #9', prioridade: 'Média', status: 'Concluído' },
    ];
  }

  getEstatisticas() {
    return {
      total: 5,
      concluidos: 2,
      pendentes: 2,
      andamento: 1
    };
  }

  getHistorico() {
    return [
      { data: '2025-08-20', descricao: 'Chamado #103 concluído com sucesso.' },
      { data: '2025-08-18', descricao: 'Novo chamado #104 adicionado.' },
      { data: '2025-08-15', descricao: 'Chamado #102 atribuído ao funcionário.' },
    ];
  }

  getNotificacoes() {
    return [
      { tipo: 'alerta', mensagem: 'Backup do servidor agendado para hoje às 22h.' },
      { tipo: 'info', mensagem: 'Nova atualização de software disponível.' },
      { tipo: 'aviso', mensagem: 'Chamado #104 está atrasado.' },
    ];
  }
}