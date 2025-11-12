import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ClienteRegisterDTO {
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    endereco: string;
}

@Injectable({
    providedIn: 'root'
})

export class RegistrationService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/api/clientes/autocadastro'; // LINK DA API 

    ClienteRegister(payload: ClienteRegisterDTO): Observable<any> {
        return this.http.post(this.apiUrl, payload);
    }
}