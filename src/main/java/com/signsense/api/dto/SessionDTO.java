package com.signsense.api.dto;

import com.signsense.domain.entities.Session;
import java.time.LocalDateTime;

public class SessionDTO {
    private Long id;
    private String title;
    private String description;
    private LocalDateTime createdAt;
    private int durationMinutes;
    private Long userId;
    private String userName;

    public SessionDTO(Session s) {
        this.id = s.getId();
        this.title = s.getTitle();
        this.description = s.getDescription();
        this.createdAt = s.getCreatedAt();
        this.durationMinutes = s.getDurationMinutes();

        if (s.getUser() != null) {
            this.userId = s.getUser().getId();
            this.userName = s.getUser().getName();
        }
    }

    // Getters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public int getDurationMinutes() { return durationMinutes; }
    public Long getUserId() { return userId; }
    public String getUserName() { return userName; }
}
