// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    if (this.authService.currentUserValue) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
