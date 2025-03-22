package com.quiz.api.controller;

import com.quiz.api.model.Question;
import com.quiz.api.model.Quiz;
import com.quiz.api.service.QuizService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/quizzes")
@CrossOrigin(origins = "*") // Allow frontend (Angular) access
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    // ✅ Get all quizzes
    @GetMapping
    public List<Quiz> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }

    // ✅ Create a new quiz
    @PostMapping
    public Quiz createQuiz(@RequestBody Quiz quiz) {
        return quizService.createQuiz(quiz);
    }

    // ✅ Add a question to a quiz
    @PostMapping("/{quizId}/questions")
    public Question addQuestionToQuiz(@PathVariable Long quizId, @RequestBody Question question) {
        return quizService.addQuestionToQuiz(quizId, question);
    }

    // ✅ Fetch a quiz with all its questions
    @GetMapping("/{quizId}")
    public Quiz getQuizById(@PathVariable Long quizId) {
        return quizService.getQuizById(quizId);
    }

    // ✅ Submit answers for a quiz and get the score
    @PostMapping("/{quizId}/submit")
    public String submitQuiz(@PathVariable Long quizId, @RequestBody Map<Long, String> answers) {
        int score = quizService.submitQuiz(quizId, answers);
        return "Your score: " + score;
    }
}
