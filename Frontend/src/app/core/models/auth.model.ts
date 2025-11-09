export interface Usuario {
  id: number;
  nome: string;
  email: string;
  roles: string[];
}

export interface LoginResponse {
  token?: string;
  role?: string[];
}

export interface LoginError {
  error?: {
    message?: string;
  };
}
