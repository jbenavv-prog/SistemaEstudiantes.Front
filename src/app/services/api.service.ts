import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUsuarioDTO,  } from '../dtos/usuario/create-usuario.dto';
import { LoginUsuarioDTO } from '../dtos/usuario/login-usuario.dto';
import { ProgramaResponseDTO } from '../dtos/programa/programa-response.dto';
import {ApiResponse } from '../models/api-response.module'
import { SuscripcionProgramaUsuario } from '../dtos/usuario/suscripcion-programa-usuario.dto';
import { MateriaWithValidationsResponse } from '../dtos/materia/materia-with-validations-response.dto';

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

    getMateriasWithValidations(userId: number):Observable<ApiResponse<MateriaWithValidationsResponse[]>>
    {
      return this.http.post<ApiResponse<MateriaWithValidationsResponse[]>>(`${this.apiUrl}/materia/getWithValidations`, userId);
    }

    getProgramas(): Observable<ApiResponse<ProgramaResponseDTO[]>> {
      return this.http.get<ApiResponse<ProgramaResponseDTO[]>>(`${this.apiUrl}/programa/getAll`);
    }

    getProgramaById(idPrograma: number): Observable<ApiResponse<ProgramaResponseDTO>> {
      return this.http.post<ApiResponse<ProgramaResponseDTO>>(`${this.apiUrl}/programa/getById`, idPrograma);
    }

    suscribirPrograma(suscripcionProgramaUsuario: SuscripcionProgramaUsuario): Observable<ApiResponse<ProgramaResponseDTO>> {
      return this.http.post<ApiResponse<ProgramaResponseDTO>>(`${this.apiUrl}/usuario/suscribirPrograma`, suscripcionProgramaUsuario);
    }
}
