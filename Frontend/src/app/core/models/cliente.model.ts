export interface Cliente {
    id: number;
    password: string | null;
    role: string;
    ativo: boolean;
    dataRegistro: string;
    cpf: string;
    nome: string;
    email: string;
    endereco: string;
    telefone: string;

    enabled: boolean;
    accountNonLocked: boolean;
    authorities: {
        authority: string;
    }[];
    username: string;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
}