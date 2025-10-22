import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  http = inject(HttpClient);
  public getFuncionarios(): Observable<any[]> {
      return this.http.get<any[]>(`http://localhost:3000/usuarios?roles=FUNCIONARIO`);
  }
}
