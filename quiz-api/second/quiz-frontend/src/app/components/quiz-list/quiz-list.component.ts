import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Quiz } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Available Quizzes</h2>
        <a routerLink="/quizzes/create" class="btn btn-success">
          <i class="bi bi-plus-circle me-2"></i> Create New Quiz
        </a>
      </div>

      <div *ngIf="loading" class="text-center my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div *ngIf="error" class="alert alert-danger mt-3">
        {{ error }}
      </div>

      <div
        *ngIf="!loading && !error && quizzes.length === 0"
        class="alert alert-info mt-3"
      >
        No quizzes available at the moment. Create your first quiz!
      </div>

      <div class="row row-cols-1 row-cols-md-3 g-4 mt-3">
        <div class="col" *ngFor="let quiz of quizzes">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">{{ quiz.title }}</h5>
              <p class="card-text" *ngIf="quiz.questions">
                {{ quiz.questions.length }} Questions
              </p>
            </div>
            <div class="card-footer bg-transparent border-0">
              <a
                [routerLink]="['/quizzes', quiz.id]"
                class="btn btn-primary w-100"
                >Take Quiz</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class QuizListComponent implements OnInit {
  quizzes: Quiz[] = [];
  loading = true;
  error = '';

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.quizService.getAllQuizzes().subscribe({
      next: (data) => {
        this.quizzes = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load quizzes. Please try again later.';
        this.loading = false;
        console.error('Error fetching quizzes:', err);
      },
    });
  }
}
