package com.signsense.service;

import com.signsense.api.dto.SessionRequest;
import com.signsense.domain.entities.Session;
import com.signsense.domain.entities.User;
import com.signsense.domain.repositories.SessionRepository;
import com.signsense.domain.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private UserRepository userRepository;

    public Session createSession(SessionRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Session session = new Session();
        session.setTitle(request.getTitle());
        session.setDescription(request.getDescription());
        session.setCreatedAt(LocalDateTime.now());
        session.setDurationMinutes(request.getDurationMinutes());
        session.setUser(user);

        return sessionRepository.save(session);
    }

    public Session getSessionById(Long id) {
        return sessionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Session not found"));
    }

    public List<Session> getAllSessions() {
        return sessionRepository.findAll();
    }

    public Session updateSession(Long id, SessionRequest request) {
        Session session = sessionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        if (request.getTitle() != null) session.setTitle(request.getTitle());
        if (request.getDescription() != null) session.setDescription(request.getDescription());
        if (request.getDurationMinutes() > 0) session.setDurationMinutes(request.getDurationMinutes());

        return sessionRepository.save(session);
    }

    public void deleteSession(Long id) {
        if (!sessionRepository.existsById(id)) {
            throw new RuntimeException("Session not found");
        }
        sessionRepository.deleteById(id);
    }

    public List<Session> getUserSessions(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return sessionRepository.findByUser(user);
    }
}
