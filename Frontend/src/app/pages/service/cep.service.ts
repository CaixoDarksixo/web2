import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface CepResponse {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    estado: string;
    erro?: boolean;
}

@Injectable({
    providedIn: 'root',
})

export class CepService {
    private readonly apiUrl = 'https://viacep.com.br/ws';
    private http = inject(HttpClient);

    public getAddressByCep(cep: string): Observable<CepResponse | null> {
        const cleanedCep = cep.replace(/[^\d]/g, ''); 
        if (cleanedCep.length !== 8) {
            return of(null);
        }
        return this.http.get<CepResponse>(`${this.apiUrl}/${cleanedCep}/json/`).pipe(
        map((response) => (response.erro ? null : response)),
        catchError(() => of(null))
        );
    }
    }