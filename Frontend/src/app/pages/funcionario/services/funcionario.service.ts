import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Funcionario } from '@/core/models/funcionario.model';

@Injectable({
  providedIn: 'root'
})

export class FuncionarioService {
    private readonly API = 'http://localhost:8080/funcionarios'; // LINK DA API

    http = inject(HttpClient);


    public getFuncionarios(): Observable<Funcionario[]> {
        return this.http.get<Funcionario[]>(this.API);
    }

    public createFuncionario(nome: string, email: string, dataString: string, password: string): Observable<Funcionario> {
      const dataNascimento = `${dataString}T00:00:00`;
      const body = { nome, email, dataNascimento, password };
      return this.http.post<Funcionario>(this.API, body);
    } 

    public updateFuncionario(id: number, nome: string, email: string, dataString: string, password: string): Observable<Funcionario> {
        const dataNascimento = `${dataString}T00:00:00`;
        const body = { id, nome, email, dataNascimento, password };
        return this.http.put<Funcionario>(`${this.API}/${id}`, body);
    }

    public deleteFuncionarios(ids: number[]): Observable<Funcionario[]> {
        const funcionarios = ids.map(id => this.http.delete<Funcionario>(`${this.API}/${id}`));
        return forkJoin(funcionarios);
    }
}
