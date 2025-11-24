export interface Funcionario {
        id: number;
        password: string | null;
        role: string;
        ativo: boolean;
        dataRegistro: string;
        dataNascimento: string;
        nome: string;
        email: string;
        enabled: boolean;
        accountNonLocked: boolean;
        authorities: {
            authority: string;
        }[];
        username: string;
        accountNonExpired: boolean;
        credentialsNonExpired: boolean;
}