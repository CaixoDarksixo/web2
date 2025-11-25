import { Funcionario } from "./funcionario.model";

export interface Orcamento {
    id: number;
    solicitacaoId: number;
    funcionario: Funcionario;
    valor: number;
    dataHora: string;
}