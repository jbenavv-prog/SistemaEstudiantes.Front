import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { CreateUsuarioDTO } from '../../../dtos/usuario/create-usuario.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  constructor(private apiService: ApiService, private errorHandler: ErrorHandlerService, private router: Router) {}

  loginForm = new FormGroup({
    nombre: new FormControl(''),
    email: new FormControl(''),
    contrasena: new FormControl(''),
  });

  onSubmit() {
    console.warn(this.loginForm.value);
    if (this.loginForm.invalid) {
      return;
    }

    const createUsuarioDTO: CreateUsuarioDTO = {
      email: this.loginForm.value.email ?? '',
      nombre: this.loginForm.value.nombre ?? '',
      contrasena: this.loginForm.value.contrasena ?? '',
    };

    this.apiService.register(createUsuarioDTO).subscribe({
      next: (response) => {
        console.log('Usuario registrado exitosamente:', response);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorHandler.handleHttpError(err);
      },
    });
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
