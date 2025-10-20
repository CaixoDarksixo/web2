export interface Usuario {
  id: number;
  nome: string;
  email: string;
  roles: string[];
}

export interface LoginResponse {
  token?: string;
  usuario?: Usuario;
}

export interface LoginError {
  error?: {
    message?: string;
  };
}
