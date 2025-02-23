import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private tokenKey = 'authToken';
  private userKey = 'userData';

  // Guardar el token en localStorage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Obtener el token almacenado
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Guardar los datos del usuario en localStorage
  setUserData(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  // Obtener los datos del usuario
  getUserData(): any | null {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  // Eliminar sesión
  clearSession(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }
}
