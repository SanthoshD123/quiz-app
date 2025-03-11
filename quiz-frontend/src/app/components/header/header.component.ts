import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
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
            <ul class="navbar-nav">
              <li class="nav-item">
                <a
                  class="nav-link"
                  routerLink="/quizzes"
                  routerLinkActive="active"
                  >Quizzes</a
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: ``,
})
export class HeaderComponent {}
