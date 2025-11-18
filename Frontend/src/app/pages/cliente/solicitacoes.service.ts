import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SolicitacaoDTO {
    equipdesc: string;
    dataabertura: date;
    estadoid: int;
    categoriaid: int;
    probdesc: string;
  
}

@Injectable({
    providedIn: 'root'
})
  
export class SolicitacaoService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/api/clientes/solicitacoes'; // LINK DA API 

    ClienteRegister(payload: ClienteRegisterDTO): Observable<any> {
        return this.http.post(this.apiUrl, payload);
    }
}
