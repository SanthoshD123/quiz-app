// src/app/app.routes.ts (updated)
import { Routes } from '@angular/router';
import { AuthGuard, AdminGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/quizzes', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'quizzes',
    loadComponent: () =>
      import('./components/quiz-list/quiz-list.component').then(
        (m) => m.QuizListComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'quizzes/create',
    loadComponent: () =>
      import('./components/quiz-create/quiz-create.component').then(
        (m) => m.QuizCreateComponent
      ),
    canActivate: [AdminGuard],
  },
  {
    path: 'quizzes/:id',
    loadComponent: () =>
      import('./components/quiz-detail/quiz-detail.component').then(
        (m) => m.QuizDetailComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'result',
    loadComponent: () =>
      import('./components/quiz-result/quiz-result.component').then(
        (m) => m.QuizResultComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./components/admin/admin-dashboard.component').then(
        (m) => m.AdminDashboardComponent
      ),
    canActivate: [AdminGuard],
  },
];
