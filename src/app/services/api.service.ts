import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUsuarioDTO,  } from '../dtos/usuario/create-usuario.dto';
import { LoginUsuarioDTO } from '../dtos/usuario/login-usuario.dto';
import { ProgramaResponseDTO } from '../dtos/programa/programa-response.dto';
import {ApiResponse } from '../models/api-response.module'
import { SuscripcionProgramaUsuarioDTO } from '../dtos/usuario/suscripcion-programa-usuario.dto';
import { MateriaWithValidationsResponse } from '../dtos/materia/materia-with-validations-response.dto';
import { UsuarioMateriaResponse } from '../dtos/usuario-materia/usuario-materia-response.dto';
import { CreateUsuarioMateriaDTO } from '../dtos/usuario-materia/create-usuario-materia.dto';
import { UsuarioDTO } from '../dtos/usuario/usuario.dto';
import { UsuarioMateriaDTO } from '../dtos/usuario-materia/usuario-materia.dto';
import { DetalleMateriaConEstudiantesResponseDTO } from '../dtos/materia/detalle-materia-con-estudiantes';
import { ProgramaDTO } from '../dtos/programa/programa.dto';


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

    getMateriasWithValidations(usuario: UsuarioDTO):Observable<ApiResponse<MateriaWithValidationsResponse[]>>
    {
      return this.http.post<ApiResponse<MateriaWithValidationsResponse[]>>(`${this.apiUrl}/materia/getWithValidations`, usuario);
    }

    getProgramas(): Observable<ApiResponse<ProgramaResponseDTO[]>> {
      return this.http.get<ApiResponse<ProgramaResponseDTO[]>>(`${this.apiUrl}/programa/getAll`);
    }

    getProgramaById(programa: ProgramaDTO): Observable<ApiResponse<ProgramaResponseDTO>> {
      return this.http.post<ApiResponse<ProgramaResponseDTO>>(`${this.apiUrl}/programa/getById`, programa);
    }

    suscribirPrograma(suscripcionProgramaUsuario: SuscripcionProgramaUsuarioDTO): Observable<ApiResponse<ProgramaResponseDTO>> {
      return this.http.post<ApiResponse<ProgramaResponseDTO>>(`${this.apiUrl}/usuario/suscribirPrograma`, suscripcionProgramaUsuario);
    }

    suscribirMateria(createUsuarioMateria: CreateUsuarioMateriaDTO): Observable<ApiResponse<UsuarioMateriaResponse>> {
      return this.http.post<ApiResponse<UsuarioMateriaResponse>>(`${this.apiUrl}/usuarioMateria/suscribirMateria`, createUsuarioMateria);
    }

    getDetalleMateriaConEstudiantes(usuarioMateria: UsuarioMateriaDTO): Observable<ApiResponse<DetalleMateriaConEstudiantesResponseDTO>> {
      return this.http.post<ApiResponse<DetalleMateriaConEstudiantesResponseDTO>>(`${this.apiUrl}/materia/getDetalleMateriaConEstudiantes`, usuarioMateria);
    }
}
