import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaAgrupada, Receita } from './receita.model';

// serviço injetável para as chamadas HTTP.

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  
private http = inject(HttpClient);
  
// Endpoint do RestController no Spring

private readonly API_URL = '/api/receitas';

  
// Busca receitas no backend, filtrando por data
// O backend recebe via @RequestParam.
   
getReceitas(dataInicial?: string, dataFinal?: string): Observable<Receita[]> {
    let params = new HttpParams();
    
// no formato que o input type="date" fornece.
if (dataInicial) {
    params = params.set('dataInicial', dataInicial);
}
if (dataFinal) {
    params = params.set('dataFinal', dataFinal);
}

return this.http.get<Receita[]>(this.API_URL, { params });
}

  
//Busca dados já agrupados por categoria do backend
//Deixar o back fazer o GROUP BY.
    
getReceitasAgrupadasPorCategoria(): Observable<CategoriaAgrupada[]> {
    return this.http.get<CategoriaAgrupada[]>(`${this.API_URL}/por-categoria`);
  }
}