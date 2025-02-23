import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUsuarioDTO,  } from '../dtos/usuario/create-usuario.dto';
import { LoginUsuarioDTO } from '../dtos/usuario/login-usuario.dto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5281/api';

  constructor(private http: HttpClient) { }
    // Método para hacer login
    login(loginUsuarioDTO: LoginUsuarioDTO): Observable<any> {
      return this.http.post(`${this.apiUrl}/auth/login`, loginUsuarioDTO);
    }
    // Método para registrar un usuario
    register(createUsuarioDTO: CreateUsuarioDTO): Observable<any> {
      return this.http.post(`${this.apiUrl}/auth/register`, createUsuarioDTO);
    }
}
