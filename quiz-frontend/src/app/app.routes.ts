import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/quizzes', pathMatch: 'full' },
  {
    path: 'quizzes',
    loadComponent: () =>
      import('./components/quiz-list/quiz-list.component').then(
        (m) => m.QuizListComponent
      ),
  },
  {
    path: 'quizzes/create',
    loadComponent: () =>
      import('./components/quiz-create/quiz-create.component').then(
        (m) => m.QuizCreateComponent
      ),
  },
  {
    path: 'quizzes/:id',
    loadComponent: () =>
      import('./components/quiz-detail/quiz-detail.component').then(
        (m) => m.QuizDetailComponent
      ),
  },
  {
    path: 'result',
    loadComponent: () =>
      import('./components/quiz-result/quiz-result.component').then(
        (m) => m.QuizResultComponent
      ),
  },
];
