import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }

  getAllQuizzes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/quizzes`);
  }

  deleteQuiz(quizId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/quizzes/${quizId}`);
  }

  updateQuiz(quizId: number, quiz: Quiz): Observable<Quiz> {
    return this.http.put<Quiz>(`${this.apiUrl}/quizzes/${quizId}`, quiz);
  }
}
