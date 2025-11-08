package com.signsense.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.Map;

import com.signsense.service.UserService;
import com.signsense.api.dto.*; // Assuming DTOs are in this package

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // 1️⃣ Get logged-in user profile
    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> getMyProfile() {
        return ResponseEntity.ok(userService.getMyProfile());
    }

    // 2️⃣ Update user profile
    @PutMapping("/me")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> updateMyProfile(@RequestBody UserUpdateRequest request) {
        userService.updateProfile(request);
        return ResponseEntity.ok(Map.of("message", "Profile updated successfully."));
    }

    // 3️⃣ Change password
    @PutMapping("/me/password")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        userService.changePassword(request);
        return ResponseEntity.ok(Map.of("message", "Password updated successfully."));
    }

    // 4️⃣ Get user by ID (Admin only)
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    // 5️⃣ List all users (Admin only, with pagination)
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(userService.getAllUsers(page, size));
    }

    // 6️⃣ Deactivate/Delete user (Admin only)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deactivateUser(id);
        return ResponseEntity.ok(Map.of("message", "User account deactivated successfully."));
    }

    // 7️⃣ Change user role (Admin only)
    @PutMapping("/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> changeUserRole(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        String role = body.get("role");
        userService.changeUserRole(id, role);
        return ResponseEntity.ok(Map.of("message", "User role updated successfully."));
    }

    // 8️⃣ Get user statistics (Admin only)
    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUserStats() {
        return ResponseEntity.ok(userService.getUserStats());
    }

    // 9️⃣ Export all users (Admin only)
    @GetMapping("/export")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> exportUsers(
            @RequestParam(defaultValue = "json") String format) {
        return ResponseEntity.ok(userService.exportUsers(format));
    }
}
