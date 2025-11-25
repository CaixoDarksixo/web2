import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {
    private readonly API = 'http://localhost:8080/categorias'; // LINK DA API

    http = inject(HttpClient);


    public getCategorias(): Observable<any[]> {
        return this.http.get<any[]>(this.API);
    }

    public createCategoria(nome: string): Observable<any> {
        return this.http.post<any>(this.API, { nome });
    } 

    public updateCategoria(id: number, nome: string): Observable<any> {
        return this.http.put<any>(`${this.API}/${id}`, { nome });
    }

    public deleteCategorias(ids: number[]): Observable<any> {
        const requisicoes = ids.map(id => this.http.delete<any>(`${this.API}/${id}`));
        return forkJoin(requisicoes);
    }
}
