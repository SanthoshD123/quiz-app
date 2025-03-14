// src/app/components/header/header.component.ts (updated)
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
          <a class="navbar-brand" routerLink="/">Quiz Application</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
              <li class="nav-item" *ngIf="isLoggedIn()">
                <a
                  class="nav-link"
                  routerLink="/quizzes"
                  routerLinkActive="active"
                >
                  Quizzes
                </a>
              </li>
              <li class="nav-item" *ngIf="isAdmin()">
                <a
                  class="nav-link"
                  routerLink="/admin"
                  routerLinkActive="active"
                >
                  Admin
                </a>
              </li>
              <li class="nav-item" *ngIf="!isLoggedIn()">
                <a
                  class="nav-link"
                  routerLink="/login"
                  routerLinkActive="active"
                >
                  Login
                </a>
              </li>
              <li class="nav-item" *ngIf="!isLoggedIn()">
                <a
                  class="nav-link"
                  routerLink="/register"
                  routerLinkActive="active"
                >
                  Register
                </a>
              </li>

              <li class="nav-item" *ngIf="isLoggedIn()">
                <span class="nav-link text-light me-3">
                  Welcome, {{ currentUser.username }}!
                </span>
              </li>
              <li class="nav-item" *ngIf="isLoggedIn()">
                <a class="nav-link" (click)="logout()" style="cursor: pointer">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: ``,
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  get currentUser() {
    return this.authService.currentUserValue;
  }

  isLoggedIn() {
    return this.authService.currentUserValue;
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
    window.location.href = '/login';
  }
}
