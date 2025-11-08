package com.signsense.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
import java.util.*;
import java.util.stream.Collectors;
import java.time.LocalDateTime;

import com.signsense.domain.entities.User;
import com.signsense.domain.repositories.UserRepository;
import com.signsense.api.dto.*;  // For UserDTO, UserUpdateRequest, ChangePasswordRequest, etc.
import com.signsense.util.JwtUtil;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // 1️⃣ Get logged-in user profile
    public UserDTO getMyProfile() {
        Long userId = jwtUtil.getCurrentUserId(); // Extracts from token
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new UserDTO(user);
    }

    // 2️⃣ Update user profile
    public void updateProfile(UserUpdateRequest request) {
        Long userId = jwtUtil.getCurrentUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.getName() != null) user.setName(request.getName());
        if (request.getAvatarUrl() != null) user.setAvatarUrl(request.getAvatarUrl());
        if (request.getPreferredLanguage() != null) user.setPreferredLanguage(request.getPreferredLanguage());

        userRepository.save(user);
    }

    // 3️⃣ Change password
    public void changePassword(ChangePasswordRequest request) {
        Long userId = jwtUtil.getCurrentUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Simple plain text password comparison
        if (!request.getOldPassword().equals(user.getPassword())) {
            throw new RuntimeException("Invalid old password");
        }

        // Save new password as plain text
        user.setPassword(request.getNewPassword());
        userRepository.save(user);
    }

    // 4️⃣ Get user by ID (Admin)
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new UserDTO(user);
    }

    // 5️⃣ List all users (Admin)
    public Map<String, Object> getAllUsers(int page, int size) {
        Page<User> users = userRepository.findAll(PageRequest.of(page, size));

        List<UserDTO> userList = users.getContent()
                .stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());

        return Map.of(
                "content", userList,
                "page", page,
                "size", size,
                "totalElements", users.getTotalElements()
        );
    }

    // 6️⃣ Deactivate/Delete user (Admin)
    public void deactivateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setActive(false); // Assuming an 'active' field
        userRepository.save(user);
    }

    // 7️⃣ Change user role (Admin)
    public void changeUserRole(Long id, String role) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole(role.toUpperCase());
        userRepository.save(user);
    }

    // 8️⃣ Get user statistics (Admin)
    public Map<String, Object> getUserStats() {
        long totalUsers = userRepository.count();
        long activeUsers = userRepository.countByActiveTrue();
        long admins = userRepository.countByRole("ADMIN");
        long newUsersThisWeek = userRepository.countRegisteredInLastDays(LocalDateTime.now().minusDays(7));

        return Map.of(
                "totalUsers", totalUsers,
                "activeUsers", activeUsers,
                "admins", admins,
                "newUsersThisWeek", newUsersThisWeek
        );
    }

    // 9️⃣ Export all users (Admin)
    public Object exportUsers(String format) {
        List<User> allUsers = userRepository.findAll();

        if ("csv".equalsIgnoreCase(format)) {
            StringBuilder csv = new StringBuilder("id,name,email,role,active\n");
            for (User u : allUsers) {
                csv.append(String.format("%d,%s,%s,%s,%b\n",
                        u.getId(), u.getName(), u.getEmail(), u.getRole(), u.isActive()));
            }
            return csv.toString();
        } else {
            List<UserDTO> userList = allUsers.stream().map(UserDTO::new).collect(Collectors.toList());
            return userList;
        }
    }
}
