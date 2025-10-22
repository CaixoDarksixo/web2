import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);

  public getUserById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/usuarios/${id}`);
  }
}
