// src/main/java/com/quiz/api/service/UserService.java
package com.quiz.api.service;

import com.quiz.api.model.User;
import com.quiz.api.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); // Add this

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        
        // Create default admin if it doesn't exist
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User("admin", passwordEncoder.encode("admin123"), "admin@quiz.com", "ADMIN");
            userRepository.save(admin);
        }
    }

    public User register(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash user password before saving
        user.setRole("USER");
        return userRepository.save(user);
    }

    public User authenticate(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) { // Compare hashed password
            return user.get();
        }
        throw new RuntimeException("Invalid credentials");
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

}
