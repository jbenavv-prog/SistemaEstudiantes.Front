import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { SessionService } from '../../services/session.service';
import { ProgramaResponseDTO } from '../../dtos/programa/programa-response.dto';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SuscripcionProgramaUsuario } from '../../dtos/usuario/suscripcion-programa-usuario.dto';

@Component({
  selector: 'app-materias',
  imports: [MatButtonModule, MatCardModule],
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
  
  ngOnInit() {
    this.getPrograma();
    this.getProgramas();
  }

  getProgramas() {
    this.apiService.getProgramas().subscribe({
      next: (response) => {
        console.log('Programas obtenidos exitosamente:', response);
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
        idUsuario: this.sessionService.getUserData()?.IdUsuario,
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
}
