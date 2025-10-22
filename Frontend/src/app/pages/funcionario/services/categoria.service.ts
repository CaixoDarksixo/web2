import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  http = inject(HttpClient);

  public getCategorias(): Observable<any[]> {
        return this.http.get<any[]>(`http://localhost:3000/categorias`);
    }

    public createCategoria(body: { nome: string; descricao?: string }): Observable<any> {
        return this.http.post<any>(`http://localhost:3000/categorias`, body);
    } 

    public updateCategoria(id: number, body: { nome: string; descricao?: string }): Observable<any> {
        return this.http.put<any>(`http://localhost:3000/categorias/${id}`, body);
    }

    public deleteCategoria(id: number): Observable<any> {
        return this.http.delete<any>(`http://localhost:3000/categorias/${id}`);
    }
}
