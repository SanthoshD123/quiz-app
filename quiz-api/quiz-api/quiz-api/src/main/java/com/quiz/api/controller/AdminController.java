// src/main/java/com/quiz/api/controller/AdminController.java
package com.quiz.api.controller;

import com.quiz.api.model.Quiz;
import com.quiz.api.model.User;
import com.quiz.api.service.QuizService;
import com.quiz.api.service.UserService;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    private final UserService userService;
    private final QuizService quizService;

    public AdminController(UserService userService, QuizService quizService) {
        this.userService = userService;
        this.quizService = quizService;
    }

    // Get all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Delete a user
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }

    // Get all quizzes (admin view)
    @GetMapping("/quizzes")
    public List<Quiz> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }
    
 // Add to AdminController class
    @PutMapping("/quizzes/{quizId}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable Long quizId, @RequestBody Quiz quiz) {
        Quiz updatedQuiz = quizService.updateQuiz(quizId, quiz);
        return ResponseEntity.ok(updatedQuiz);
    }

    // Delete a quiz
    @DeleteMapping("/quizzes/{quizId}")
    public ResponseEntity<String> deleteQuiz(@PathVariable Long quizId) {
        quizService.deleteQuiz(quizId);
        return ResponseEntity.ok("Quiz deleted successfully");
    }
    

}