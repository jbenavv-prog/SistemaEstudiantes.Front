import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { SessionService } from '../../services/session.service';
import { UsuarioMateriaDTO } from '../../dtos/usuario-materia/usuario-materia.dto';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-detalle-materia',
  imports: [],
  templateUrl: './detalle-materia.component.html',
  styleUrl: './detalle-materia.component.scss',
})
export class DetalleMateriaComponent {
  idMateria!: number;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private sessionService: SessionService,
    private errorHandler: ErrorHandlerService,
  ) {}

  ngOnInit(): void {
    this.idMateria = Number(this.route.snapshot.paramMap.get('id'));

    this.route.paramMap.subscribe((params) => {
      this.idMateria = Number(params.get('id'));
      console.log('ID de la materia:', this.idMateria);

      this.getDetalleMateriaConEstudiantes();
    });
  }

  getDetalleMateriaConEstudiantes() {
    const usuarioMateria: UsuarioMateriaDTO = {
      idUsuario: this.sessionService.getUserData()?.idUsuario,
      idMateria: this.idMateria,
    };
    this.apiService.getDetalleMateriaConEstudiantes(usuarioMateria).subscribe({
      next: (response) => {
        console.log('Detalle de la materia con estudiantes:', response.data);
      },
      error: (err) => {
        this.errorHandler.handleHttpError(err);
      },
    });
  }
}

