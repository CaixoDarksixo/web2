import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API = 'http://localhost:8080/api';
  http = inject(HttpClient);

  public getClienteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API}/clientes/${id}`);
  }
}
