import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private snackBar: MatSnackBar) { }

  handleHttpError(error: any): void {
    console.error('Error HTTP:', error);

    if (error.status === 400) {
      this.handleBadRequest(error);
    } else if (error.status === 401) {
      this.showSnackbar('No autorizado, revisar credenciales', 'Cerrar');
    } else if (error.status === 403) {
      this.showSnackbar('No tienes permisos para esta acción', 'Cerrar');
    } else if (error.status === 404) {
      this.showSnackbar('Recurso no encontrado', 'Cerrar');
    } else if (error.status === 500) {
      this.showSnackbar('Error interno del servidor', 'Cerrar');
    } else {
      this.showSnackbar('Ocurrió un error inesperado', 'Cerrar');
    }
  }

  private handleBadRequest(error: any): void {
    if (error.error.errors) {
      // 🔹 Si el backend envía un array de errores de validación
      const validationErrors = Object.values(error.error.errors).flat();
      validationErrors.forEach((msg: any) => this.showSnackbar(msg, 'Cerrar'));
    } else {
      // 🔹 Si el backend solo envía un mensaje
      this.showSnackbar(error.error.message || 'Solicitud incorrecta', 'Error 400');
    }
  }

  private showSnackbar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      horizontalPosition: 'right',
      duration: 7000,
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
    });
  }
}
