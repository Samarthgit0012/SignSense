package com.signsense.api.controllers;

import com.signsense.dto.AuthRequest;
import com.signsense.dto.AuthResponse;
import com.signsense.dto.RegisterRequest;
import com.signsense.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        String message = authService.register(request);
        return ResponseEntity.ok().body(message);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            System.out.println("🔑 Login attempt for: " + request.getEmail());
            AuthResponse response = authService.login(request);
            System.out.println("✅ Login successful!");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            System.err.println("❌ Login failed: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}
