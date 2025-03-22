import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Quiz } from '../../models/quiz.model';
import { Question } from '../../models/question.model';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <h2>Create New Quiz</h2>

      <div class="card shadow-sm mb-4">
        <div class="card-body">
          <div class="mb-3">
            <label for="quizTitle" class="form-label">Quiz Title</label>
            <input
              type="text"
              class="form-control"
              id="quizTitle"
              [(ngModel)]="newQuiz.title"
              placeholder="Enter quiz title"
              required
            />
          </div>

          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              (click)="addQuestion()"
              class="btn btn-outline-primary"
              [disabled]="!newQuiz.title"
            >
              Add Question
            </button>
          </div>
        </div>
      </div>

      <div *ngIf="questions.length > 0">
        <div
          class="card shadow-sm mb-3"
          *ngFor="let question of questions; let i = index"
        >
          <div
            class="card-header bg-light d-flex justify-content-between align-items-center"
          >
            <h5 class="mb-0">Question {{ i + 1 }}</h5>
            <button
              class="btn btn-sm btn-outline-danger"
              (click)="removeQuestion(i)"
            >
              <i class="bi bi-trash"></i> Remove
            </button>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label [for]="'questionText' + i" class="form-label"
                >Question Text</label
              >
              <input
                type="text"
                class="form-control"
                [id]="'questionText' + i"
                [(ngModel)]="question.questionText"
                placeholder="Enter question"
                required
              />
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label [for]="'optionA' + i" class="form-label">Option A</label>
                <input
                  type="text"
                  class="form-control"
                  [id]="'optionA' + i"
                  [(ngModel)]="question.optionA"
                  placeholder="Option A"
                  required
                />
              </div>
              <div class="col-md-6">
                <label [for]="'optionB' + i" class="form-label">Option B</label>
                <input
                  type="text"
                  class="form-control"
                  [id]="'optionB' + i"
                  [(ngModel)]="question.optionB"
                  placeholder="Option B"
                  required
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label [for]="'optionC' + i" class="form-label">Option C</label>
                <input
                  type="text"
                  class="form-control"
                  [id]="'optionC' + i"
                  [(ngModel)]="question.optionC"
                  placeholder="Option C"
                  required
                />
              </div>
              <div class="col-md-6">
                <label [for]="'optionD' + i" class="form-label">Option D</label>
                <input
                  type="text"
                  class="form-control"
                  [id]="'optionD' + i"
                  [(ngModel)]="question.optionD"
                  placeholder="Option D"
                  required
                />
              </div>
            </div>

            <div class="mb-3">
              <label [for]="'correctAnswer' + i" class="form-label"
                >Correct Answer</label
              >
              <select
                class="form-select"
                [id]="'correctAnswer' + i"
                [(ngModel)]="question.correctAnswer"
                required
              >
                <option value="" disabled selected>
                  Select correct answer
                </option>
                <option [value]="question.optionA">
                  Option A: {{ question.optionA }}
                </option>
                <option [value]="question.optionB">
                  Option B: {{ question.optionB }}
                </option>
                <option [value]="question.optionC">
                  Option C: {{ question.optionC }}
                </option>
                <option [value]="question.optionD">
                  Option D: {{ question.optionD }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-4">
          <button (click)="cancel()" class="btn btn-outline-secondary me-md-2">
            Cancel
          </button>
          <button
            (click)="saveQuiz()"
            class="btn btn-primary"
            [disabled]="!isQuizValid() || saving"
          >
            <span
              *ngIf="saving"
              class="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Save Quiz
          </button>
        </div>
      </div>

      <div *ngIf="error" class="alert alert-danger">
        {{ error }}
      </div>
    </div>
  `,
  styles: ``,
})
export class QuizCreateComponent {
  newQuiz: Quiz = { title: '' };
  questions: Question[] = [];
  saving = false;
  error = '';

  constructor(private quizService: QuizService, private router: Router) {}

  addQuestion(): void {
    this.questions.push({
      questionText: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: '',
    });
  }

  removeQuestion(index: number): void {
    this.questions.splice(index, 1);
  }

  isQuizValid(): boolean {
    if (!this.newQuiz.title || this.questions.length === 0) {
      return false;
    }

    return this.questions.every(
      (q) =>
        q.questionText &&
        q.optionA &&
        q.optionB &&
        q.optionC &&
        q.optionD &&
        q.correctAnswer
    );
  }

  saveQuiz(): void {
    if (!this.isQuizValid()) return;

    this.saving = true;
    this.error = '';

    // First create the quiz
    this.quizService.createQuiz(this.newQuiz).subscribe({
      next: (createdQuiz) => {
        // Then add questions one by one
        const addQuestionPromises = this.questions.map((question) =>
          this.quizService.addQuestionToQuiz(createdQuiz.id!, question)
        );

        // Using Promise.all to wait for all questions to be added
        Promise.all(
          addQuestionPromises.map(
            (observable) =>
              new Promise<void>((resolve, reject) => {
                observable.subscribe({
                  next: () => resolve(),
                  error: (err) => reject(err),
                });
              })
          )
        )
          .then(() => {
            this.saving = false;
            this.router.navigate(['/quizzes']);
          })
          .catch((err) => {
            this.error = 'Failed to add questions. Please try again.';
            this.saving = false;
            console.error('Error adding questions:', err);
          });
      },
      error: (err) => {
        this.error = 'Failed to create quiz. Please try again.';
        this.saving = false;
        console.error('Error creating quiz:', err);
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/quizzes']);
  }
}
