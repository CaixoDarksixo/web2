import { Cliente } from "./cliente.model";
import { Funcionario } from "./funcionario.model";

export interface Request {
    id?: number;
    dataInicio?: string;
    dataFim?: string | null;
    status?: string;

    descEquipamento: string;
    categoriaEquipamento: {
        id: number;
        nome?: string;
    };

    descDefeito: string;
    observacao?: string | null;

    cliente?: Cliente;

    descRejeicao?: string | null;
    descManutencao?: string | null;

    funcionario?: any | null;
    orcamento?: any | null;
    pagamento?: any | null;

    ativo?: boolean;
}

export interface Orcamento {
    id: number;
    solicitacaoId: number;
    funcionario: Funcionario;
    valor: number;
    dataHora: string;
}
    