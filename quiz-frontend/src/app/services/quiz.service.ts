import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model'; // ✅ Import Question model

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private apiUrl = 'http://localhost:8080/quizzes';

  constructor(private http: HttpClient) {}

  // Get all quizzes
  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.apiUrl);
  }

  // Get quiz by ID (with questions)
  getQuizById(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.apiUrl}/${id}`);
  }

  // Submit quiz answers
  submitQuiz(
    quizId: number,
    answers: { [questionId: number]: string }
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/${quizId}/submit`, answers, {
      responseType: 'text',
    });
  }

  // ✅ Create a new quiz
  createQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(this.apiUrl, quiz);
  }

  // ✅ Add a question to a quiz
  addQuestionToQuiz(quizId: number, question: Question): Observable<Question> {
    return this.http.post<Question>(
      `${this.apiUrl}/${quizId}/questions`,
      question
    );
  }
}
