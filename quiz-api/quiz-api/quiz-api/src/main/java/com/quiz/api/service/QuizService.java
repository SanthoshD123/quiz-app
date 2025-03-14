package com.quiz.api.service;

import com.quiz.api.model.Question;
import com.quiz.api.model.Quiz;
import com.quiz.api.repository.QuestionRepository;
import com.quiz.api.repository.QuizRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;

    public QuizService(QuizRepository quizRepository, QuestionRepository questionRepository) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
    }

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public Quiz createQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    public Question addQuestionToQuiz(Long quizId, Question question) {
        Optional<Quiz> quizOptional = quizRepository.findById(quizId);
        if (quizOptional.isPresent()) {
            Quiz quiz = quizOptional.get();
            question.setQuiz(quiz);
            return questionRepository.save(question);
        } else {
            throw new RuntimeException("Quiz not found");
        }
    }

    public Quiz getQuizById(Long quizId) {
        return quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
    }
    
 // Add to QuizService class
    public void deleteQuiz(Long quizId) {
        quizRepository.deleteById(quizId);
    }

    // ✅ Submit quiz answers and calculate score
    public int submitQuiz(Long quizId, Map<Long, String> answers) {
        Optional<Quiz> quizOptional = quizRepository.findById(quizId);
        if (quizOptional.isPresent()) {
            Quiz quiz = quizOptional.get();
            List<Question> questions = quiz.getQuestions();
            int score = 0;

            for (Question question : questions) {
                String correctAnswer = question.getCorrectAnswer();
                String userAnswer = answers.get(question.getId());

                if (correctAnswer != null && correctAnswer.equalsIgnoreCase(userAnswer)) {
                    score++;
                }
            }
            return score;
        } else {
            throw new RuntimeException("Quiz not found");
        }
    }
}
