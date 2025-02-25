import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { SessionService } from '../../services/session.service';
import { ProgramaResponseDTO } from '../../dtos/programa/programa-response.dto';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SuscripcionProgramaUsuario } from '../../dtos/usuario/suscripcion-programa-usuario.dto';
import { MateriaWithValidationsResponse } from '../../dtos/materia/materia-with-validations-response.dto';
import { MatTableModule } from '@angular/material/table';
import { CreateUsuarioMateriaDTO } from '../../dtos/usuario-materia/create-usuario-materia.dto';
import { UsuarioDTO } from '../../dtos/usuario/usuario.dto';
@Component({
  selector: 'app-materias',
  imports: [MatButtonModule, MatCardModule, MatTableModule],
  templateUrl: './materias.component.html',
  styleUrl: './materias.component.scss',
})
export class MateriasComponent {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private sessionService: SessionService
  ) {}

  programas = new Array();
  programa: ProgramaResponseDTO = {} as ProgramaResponseDTO;
  materiasWithValidations: MateriaWithValidationsResponse[] = new Array();
  displayedColumns: string[] = ['idMateria', 'nombre', 'puedeIngresar'];

  ngOnInit() {
    this.getPrograma();
    this.getProgramas();
    this.getMateriasWithValidations();
  }

  getProgramas() {
    this.apiService.getProgramas().subscribe({
      next: (response) => {
        console.log('Respuesta obtenida', response);
        this.programas = response.data;
      },
      error: (err) => {
        this.errorHandler.handleHttpError(err);
      },
    });
  }

  getPrograma(){
    const idPrograma = this.sessionService.getUserData()?.IdPrograma;
    this.apiService.getProgramaById(idPrograma).subscribe({
      next: (response) => {
        console.log('Programa obtenido exitosamente:', response);
        this.programa = response.data;
      },
      error: (err) => {
        this.errorHandler.handleHttpError(err);
      },
    });
  }

  suscribirPrograma(){
    const suscripcionProgramaUsuario: SuscripcionProgramaUsuario = 
      {
        idUsuario: this.sessionService.getUserData()?.idUsuario,
        idPrograma: this.programa.idPrograma.toString(),
      }

      this.apiService.suscribirPrograma(suscripcionProgramaUsuario).subscribe({
        next: (response) => {
          console.log('Suscripción exitosa:', response);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errorHandler.handleHttpError(err);
        },
      });
  }

  getMateriasWithValidations(){
    const usuario: UsuarioDTO = {
      idUsuario: this.sessionService.getUserData()?.idUsuario,
      nombre: "",
      email: "",
    }
    this.apiService.getMateriasWithValidations(usuario).subscribe({
      next: (response) => {
        console.log('Materias obtenidas:', response);
        this.materiasWithValidations = response.data;
      },
      error: (err) => {
        this.errorHandler.handleHttpError(err);
      },
    });
  }

  routeMateria(idMateria: number){
    this.router.navigate(['/materias', idMateria]);
  }

  suscribirMateria(idMateria: number){
    const createUsuarioMateria: CreateUsuarioMateriaDTO = 
    {
      idUsuario: this.sessionService.getUserData()?.idUsuario,
      idMateria: idMateria,
    }

    this.apiService.suscribirMateria(createUsuarioMateria).subscribe({
      next: (response) => {
        console.log('Suscripción exitosa:', response);
        this.getMateriasWithValidations();
      },
      error: (err) => {
        this.errorHandler.handleHttpError(err);
      },
    });

  }
}
