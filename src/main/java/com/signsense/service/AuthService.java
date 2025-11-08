package com.signsense.service;

import com.signsense.domain.entities.User;
import com.signsense.domain.repositories.UserRepository;
import com.signsense.dto.AuthRequest;
import com.signsense.dto.AuthResponse;
import com.signsense.dto.RegisterRequest;
import com.signsense.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public String register(RegisterRequest request) {
        // Check if email exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Create and save user - NO HASHING, JUST PLAIN PASSWORD!
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // Plain text password
        user.setRole("USER");

        user = userRepository.saveAndFlush(user);
        System.out.println("✅ User saved with ID: " + user.getId());
        
        // VERIFY immediately
        boolean exists = userRepository.existsById(user.getId());
        System.out.println("✅ User exists after save: " + exists);
        
        // Try to find by email
        boolean foundByEmail = userRepository.findByEmail(request.getEmail()).isPresent();
        System.out.println("✅ User found by email: " + foundByEmail);
        
        return "User registered successfully";
    }

    public AuthResponse login(AuthRequest request) {
        System.out.println("🔍 Looking up user: " + request.getEmail());
        
        // SUPER SIMPLE - just check email and password match directly
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> {
                System.err.println("❌ User not found in database!");
                return new RuntimeException("Invalid email or password");
            });
        
        System.out.println("✅ User found: " + user.getEmail());
        System.out.println("📝 Stored password: " + user.getPassword());
        System.out.println("📝 Provided password: " + request.getPassword());
        
        if (!user.getPassword().equals(request.getPassword())) {
            System.err.println("❌ Password mismatch!");
            throw new RuntimeException("Invalid email or password");
        }

        System.out.println("✅ Password matched! Generating token...");
        String token = jwtUtil.generateToken(request.getEmail());
        return new AuthResponse(token, request.getEmail());
    }
}
