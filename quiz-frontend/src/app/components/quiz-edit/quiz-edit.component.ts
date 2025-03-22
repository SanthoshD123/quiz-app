import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../../models/quiz.model';
import { Question } from '../../models/question.model';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <h2>Edit Quiz</h2>

      <div *ngIf="loading" class="text-center my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div *ngIf="error" class="alert alert-danger mt-3">
        {{ error }}
      </div>

      <div *ngIf="quiz && !loading">
        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <div class="mb-3">
              <label for="quizTitle" class="form-label">Quiz Title</label>
              <input
                type="text"
                class="form-control"
                id="quizTitle"
                [(ngModel)]="quiz.title"
                placeholder="Enter quiz title"
                required
              />
            </div>

            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                (click)="saveQuizTitle()"
                class="btn btn-primary me-md-2"
                [disabled]="!quiz.title || savingTitle"
              >
                <span
                  *ngIf="savingTitle"
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Save Title
              </button>
              <button
                (click)="addQuestion()"
                class="btn btn-outline-primary"
                [disabled]="!quiz.title"
              >
                Add Question
              </button>
            </div>
          </div>
        </div>

        <h3 class="mb-3">Existing Questions</h3>
        <div *ngIf="quiz.questions && quiz.questions.length > 0">
          <div
            class="card shadow-sm mb-3"
            *ngFor="let question of quiz.questions; let i = index"
          >
            <div class="card-header bg-light">
              <h5 class="mb-0">Question {{ i + 1 }}</h5>
            </div>
            <div class="card-body">
              <p class="mb-2">
                <strong>Question:</strong> {{ question.questionText }}
              </p>
              <p class="mb-1"><strong>A:</strong> {{ question.optionA }}</p>
              <p class="mb-1"><strong>B:</strong> {{ question.optionB }}</p>
              <p class="mb-1"><strong>C:</strong> {{ question.optionC }}</p>
              <p class="mb-1"><strong>D:</strong> {{ question.optionD }}</p>
              <p class="mb-0">
                <strong>Correct Answer:</strong> {{ question.correctAnswer }}
              </p>
            </div>
          </div>
        </div>

        <div
          *ngIf="!quiz.questions || quiz.questions.length === 0"
          class="alert alert-info"
        >
          No questions added yet.
        </div>

        <h3 *ngIf="newQuestions.length > 0" class="mb-3">New Questions</h3>
        <div
          class="card shadow-sm mb-3"
          *ngFor="let question of newQuestions; let i = index"
        >
          <div
            class="card-header bg-light d-flex justify-content-between align-items-center"
          >
            <h5 class="mb-0">New Question {{ i + 1 }}</h5>
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

        <div
          *ngIf="newQuestions.length > 0"
          class="d-grid gap-2 d-md-flex justify-content-md-end mb-4"
        >
          <button (click)="cancel()" class="btn btn-outline-secondary me-md-2">
            Cancel
          </button>
          <button
            (click)="saveQuestions()"
            class="btn btn-primary"
            [disabled]="!areQuestionsValid() || savingQuestions"
          >
            <span
              *ngIf="savingQuestions"
              class="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Save Questions
          </button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class QuizEditComponent implements OnInit {
  quiz: Quiz | null = null;
  newQuestions: Question[] = [];
  loading = true;
  error = '';
  savingTitle = false;
  savingQuestions = false;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router
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

  saveQuizTitle(): void {
    if (!this.quiz || !this.quiz.id) return;

    this.savingTitle = true;
    this.error = '';

    const updatedQuiz = {
      id: this.quiz.id,
      title: this.quiz.title,
    };

    this.quizService.updateQuiz(this.quiz.id, updatedQuiz).subscribe({
      next: (data) => {
        this.savingTitle = false;
        this.quiz = data;
        // Keep the questions that came from the server
        if (!this.quiz.questions && data.questions) {
          this.quiz.questions = data.questions;
        }
      },
      error: (err) => {
        this.error = 'Failed to update quiz title. Please try again.';
        this.savingTitle = false;
        console.error('Error updating quiz:', err);
      },
    });
  }

  addQuestion(): void {
    this.newQuestions.push({
      questionText: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: '',
    });
  }

  removeQuestion(index: number): void {
    this.newQuestions.splice(index, 1);
  }

  areQuestionsValid(): boolean {
    if (this.newQuestions.length === 0) {
      return false;
    }

    return this.newQuestions.every(
      (q) =>
        q.questionText &&
        q.optionA &&
        q.optionB &&
        q.optionC &&
        q.optionD &&
        q.correctAnswer
    );
  }

  saveQuestions(): void {
    if (!this.quiz || !this.quiz.id || !this.areQuestionsValid()) return;

    this.savingQuestions = true;
    this.error = '';

    // Add questions one by one
    const addQuestionPromises = this.newQuestions.map((question) =>
      this.quizService.addQuestionToQuiz(this.quiz!.id!, question)
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
        this.savingQuestions = false;
        // Reload the quiz to get the updated questions
        this.loadQuiz();
        // Clear the new questions
        this.newQuestions = [];
      })
      .catch((err) => {
        this.error = 'Failed to add questions. Please try again.';
        this.savingQuestions = false;
        console.error('Error adding questions:', err);
      });
  }

  cancel(): void {
    this.router.navigate(['/admin']);
  }
}
