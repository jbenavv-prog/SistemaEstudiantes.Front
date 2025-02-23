import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { LoginUsuarioDTO } from '../../../dtos/usuario/login-usuario.dto';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { SessionService } from '../../../services/session.service';
@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private sessionService: SessionService
  ) {}

  loginForm = new FormGroup({
    email: new FormControl(''),
    contrasena: new FormControl(''),
  });

  onSubmit() {
    console.warn(this.loginForm.value);
    if (this.loginForm.invalid) {
      return;
    }

    const loginUsuarioDTO: LoginUsuarioDTO = {
      email: this.loginForm.value.email ?? '',
      contrasena: this.loginForm.value.contrasena ?? '',
    };

    this.apiService.login(loginUsuarioDTO).subscribe({
      next: (response) => {
        console.log('Session establecida exitosamente:', response);
        this.sessionService.setToken(response.data.token);
        this.sessionService.setUserData(response.data);
        this.router.navigate(['/home']);
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
