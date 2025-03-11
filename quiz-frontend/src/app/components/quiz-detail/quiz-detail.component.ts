import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Quiz } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <div *ngIf="loading" class="text-center my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div *ngIf="error" class="alert alert-danger">
        {{ error }}
      </div>

      <div *ngIf="quiz && !loading">
        <h2>{{ quiz.title }}</h2>

        <form (ngSubmit)="submitQuiz()">
          <div
            class="card mb-4 shadow-sm"
            *ngFor="let question of quiz.questions; let i = index"
          >
            <div class="card-header bg-light">
              <h5 class="mb-0">Question {{ i + 1 }}</h5>
            </div>
            <div class="card-body">
              <p class="card-text">{{ question.questionText }}</p>

              <div class="list-group mt-3">
                <button
                  type="button"
                  class="list-group-item list-group-item-action"
                  [class.active]="isSelected(question.id, question.optionA)"
                  (click)="setAnswer(question.id, question.optionA)"
                >
                  A. {{ question.optionA }}
                </button>
                <button
                  type="button"
                  class="list-group-item list-group-item-action"
                  [class.active]="isSelected(question.id, question.optionB)"
                  (click)="setAnswer(question.id, question.optionB)"
                >
                  B. {{ question.optionB }}
                </button>
                <button
                  type="button"
                  class="list-group-item list-group-item-action"
                  [class.active]="isSelected(question.id, question.optionC)"
                  (click)="setAnswer(question.id, question.optionC)"
                >
                  C. {{ question.optionC }}
                </button>
                <button
                  type="button"
                  class="list-group-item list-group-item-action"
                  [class.active]="isSelected(question.id, question.optionD)"
                  (click)="setAnswer(question.id, question.optionD)"
                >
                  D. {{ question.optionD }}
                </button>
              </div>
            </div>
          </div>

          <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-4">
            <button
              type="submit"
              class="btn btn-primary"
              [disabled]="!allQuestionsAnswered() || submitted"
            >
              <span
                *ngIf="submitted"
                class="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Submit Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: ``,
})
export class QuizDetailComponent implements OnInit {
  quiz: Quiz | null = null;
  userAnswers: { [questionId: number]: string } = {};
  loading = true;
  error = '';
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.loadQuiz();
  }

  loadQuiz(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.quizService.getQuizById(id).subscribe({
      next: (data) => {
        this.quiz = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load quiz. Please try again later.';
        this.loading = false;
        console.error('Error fetching quiz:', err);
      },
    });
  }

  setAnswer(questionId: number | undefined, answer: string): void {
    if (questionId !== undefined) {
      this.userAnswers[questionId] = answer;
    }
  }

  isSelected(questionId: number | undefined, option: string): boolean {
    if (questionId === undefined) return false;
    return this.userAnswers[questionId] === option;
  }

  submitQuiz(): void {
    if (!this.quiz || !this.quiz.id) return;

    this.submitted = true;

    this.quizService.submitQuiz(this.quiz.id, this.userAnswers).subscribe({
      next: (result) => {
        // Extract score from string response
        const scoreMatch = result.match(/Your score: (\d+)/);
        const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;

        this.router.navigate(['/result'], {
          state: {
            score: score,
            total: this.quiz?.questions?.length || 0,
            quizTitle: this.quiz?.title,
          },
        });
      },
      error: (err) => {
        this.error = 'Failed to submit quiz. Please try again.';
        this.submitted = false;
        console.error('Error submitting quiz:', err);
      },
    });
  }

  allQuestionsAnswered(): boolean {
    if (!this.quiz || !this.quiz.questions) return false;

    return this.quiz.questions.every(
      (q) => q.id !== undefined && this.userAnswers[q.id] !== undefined
    );
  }
}
