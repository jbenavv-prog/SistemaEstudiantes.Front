import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MainLayoutComponent } from './layout/main/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth/auth-layout/auth-layout.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    {
      path: '',
      component: MainLayoutComponent,
      children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' }, // ✅ Redirige correctamente a home
        { path: 'home', component: HomeComponent },
      ],
    },
    {
      path: 'auth', // ✅ Evita conflicto con ""
      component: AuthLayoutComponent,
      children: [
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
      ],
    },
    { path: '**', component: PageNotFoundComponent }, // Página 404
  ];