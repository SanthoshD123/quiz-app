import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-quiz-result',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-5">
      <div class="card text-center shadow">
        <div class="card-header bg-primary text-white">
          <h3 class="mb-0">Quiz Results</h3>
        </div>
        <div class="card-body py-5">
          <h4 class="card-title mb-4">{{ quizTitle }}</h4>
          
          <div class="display-1 mb-4">
            {{ score }}/{{ total }}
          </div>
          
          <div class="progress mb-4" style="height: 30px;">
            <div class="progress-bar" 
                 [ngClass]="{
                   'bg-danger': percentScore < 40,
                   'bg-warning': percentScore >= 40 && percentScore < 70,
                   'bg-success': percentScore >= 70
                 }"
                 [style.width.%]="percentScore">
              {{ percentScore.toFixed(0) }}%
            </div>
          </div>
          
          <p class="card-text mb-4" 
             [ngClass]="{
               'text-danger': percentScore < 40,
               'text-warning': percentScore >= 40 && percentScore < 70,
               'text-success': percentScore >= 70
             }">
            <span *ngIf="percentScore < 40">Better luck next time!</span>
            <span *ngIf="percentScore >= 40 && percentScore < 70">Good job!</span>
            <span *ngIf="percentScore >= 70">Excellent work!</span>
          </p>
          
          <a routerLink="/quizzes" class="btn btn-primary">Back to Quizzes</a>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class QuizResultComponent implements OnInit {
  score: number = 0;
  total: number = 0;
  quizTitle: string = '';
  percentScore: number = 0;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      score: number,
      total: number,
      quizTitle: string
    };

    if (state) {
      this.score = state.score;
      this.total = state.total;
      this.quizTitle = state.quizTitle;
      this.percentScore = this.total > 0 ? (this.score / this.total) * 100 : 0;
    }
  }

  ngOnInit(): void {
    // If navigated directly to this page without state, redirect to quiz list
    if (!this.quizTitle) {
      this.router.navigate(['/quizzes']);
    }
  }
}