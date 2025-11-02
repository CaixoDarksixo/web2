export interface Request {
    id?: number;
    clienteId: number;
    status: string;
    categoria: string;
    funcionarioAtualId?: number;
    dataHoraAbertura: string;
    descricaoEquipamento: string;
    descricaoProblema: string;
    descricaoManutencao?: string;
    orientacoesCliente?: string;
    dataHoraFechamento?: string;
}

export interface Orcamento {
    id: number;
    solicitacaoId: number;
    funcionario: string;
    valor: number;
    dataHora: string;
}
    