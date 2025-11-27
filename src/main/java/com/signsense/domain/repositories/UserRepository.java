package com.signsense.domain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;

import com.signsense.domain.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find by email (for login)
    Optional<User> findByEmail(String email);

    // Count active users
    long countByActiveTrue();

    // Count by role (ADMIN, USER, etc.)
    long countByRole(String role);

    // Count users registered in last X days
    @Query("SELECT COUNT(u) FROM User u WHERE u.createdAt >= :since")
    long countRegisteredInLastDays(@Param("since") LocalDateTime since);

    // Get all active users
    List<User> findAllByActiveTrue();
}
