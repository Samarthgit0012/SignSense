package com.signsense.api.controllers;

import com.signsense.api.dto.SessionDTO;
import com.signsense.api.dto.SessionRequest;
import com.signsense.domain.entities.Session;
import com.signsense.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "*")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @PostMapping
    public SessionDTO createSession(@RequestBody SessionRequest request) {
        Session session = sessionService.createSession(request);
        return new SessionDTO(session);
    }

    @GetMapping("/{id}")
    public SessionDTO getSessionById(@PathVariable("id") Long id) {
        return new SessionDTO(sessionService.getSessionById(id));
    }

    @GetMapping
    public List<SessionDTO> getAllSessions() {
        return sessionService.getAllSessions()
                .stream()
                .map(SessionDTO::new)
                .toList();
    }

    @PutMapping("/{id}")
    public SessionDTO updateSession(@PathVariable("id") Long id, @RequestBody SessionRequest request) {
        Session updated = sessionService.updateSession(id, request);
        return new SessionDTO(updated);
    }

    @DeleteMapping("/{id}")
    public String deleteSession(@PathVariable("id") Long id) {
        sessionService.deleteSession(id);
        return "Session deleted successfully";
    }

    @GetMapping("/user/{userId}")
    public List<SessionDTO> getUserSessions(@PathVariable("userId") Long userId) {
        return sessionService.getUserSessions(userId)
                .stream()
                .map(SessionDTO::new)
                .toList();
    }
}
