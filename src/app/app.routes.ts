import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'signup',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        canActivate: [authGuard]
    },
    
];
