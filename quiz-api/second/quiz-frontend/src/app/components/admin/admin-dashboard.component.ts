// src/app/components/admin/admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-4">
      <h2>Admin Dashboard</h2>

      <div class="row mt-4">
        <div class="col-md-6 mb-4">
          <div class="card shadow-sm h-100">
            <div class="card-header">
              <h4>User Management</h4>
            </div>
            <div class="card-body">
              <div *ngIf="loadingUsers" class="text-center">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>

              <div
                *ngIf="users.length === 0 && !loadingUsers"
                class="alert alert-info"
              >
                No users found.
              </div>

              <div class="table-responsive" *ngIf="users.length > 0">
                <table class="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let user of users">
                      <td>{{ user.id }}</td>
                      <td>{{ user.username }}</td>
                      <td>{{ user.email }}</td>
                      <td>{{ user.role }}</td>
                      <td>
                        <button
                          class="btn btn-sm btn-danger"
                          (click)="deleteUser(user.id)"
                          [disabled]="user.role === 'ADMIN'"
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6 mb-4">
          <div class="card shadow-sm h-100">
            <div class="card-header">
              <h4>Quiz Management</h4>
            </div>
            <div class="card-body">
              <div class="d-grid mb-3">
                <a routerLink="/quizzes/create" class="btn btn-success">
                  <i class="bi bi-plus-circle me-2"></i> Create New Quiz
                </a>
              </div>

              <div *ngIf="loadingQuizzes" class="text-center">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>

              <div
                *ngIf="quizzes.length === 0 && !loadingQuizzes"
                class="alert alert-info"
              >
                No quizzes found.
              </div>

              <div class="table-responsive" *ngIf="quizzes.length > 0">
                <table class="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Questions</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let quiz of quizzes">
                      <td>{{ quiz.id }}</td>
                      <td>{{ quiz.title }}</td>
                      <td>{{ quiz.questions?.length || 0 }}</td>
                      <td>
                        <div class="btn-group">
                          <a
                            [routerLink]="['/quizzes', quiz.id]"
                            class="btn btn-sm btn-primary me-1"
                          >
                            <i class="bi bi-eye"></i>
                          </a>
                          <button
                            class="btn btn-sm btn-danger"
                            (click)="deleteQuiz(quiz.id)"
                          >
                            <i class="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  quizzes: any[] = [];
  loadingUsers = true;
  loadingQuizzes = true;
  error = '';

  constructor(
    private adminService: AdminService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadQuizzes();
  }

  loadUsers(): void {
    this.loadingUsers = true;
    this.adminService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loadingUsers = false;
      },
      error: (err) => {
        this.error = 'Failed to load users';
        this.loadingUsers = false;
        console.error(err);
      },
    });
  }

  loadQuizzes(): void {
    this.loadingQuizzes = true;
    this.adminService.getAllQuizzes().subscribe({
      next: (data) => {
        this.quizzes = data;
        this.loadingQuizzes = false;
      },
      error: (err) => {
        this.error = 'Failed to load quizzes';
        this.loadingQuizzes = false;
        console.error(err);
      },
    });
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(userId).subscribe({
        next: () => {
          this.users = this.users.filter((user) => user.id !== userId);
        },
        error: (err) => {
          this.error = 'Failed to delete user';
          console.error(err);
        },
      });
    }
  }

  deleteQuiz(quizId: number): void {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.adminService.deleteQuiz(quizId).subscribe({
        next: () => {
          this.quizzes = this.quizzes.filter((quiz) => quiz.id !== quizId);
        },
        error: (err) => {
          this.error = 'Failed to delete quiz';
          console.error(err);
        },
      });
    }
  }
}
