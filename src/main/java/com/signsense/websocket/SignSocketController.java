package com.signsense.websocket;

import com.signsense.model.PredictionResult;
import com.signsense.service.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class SignSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired(required = false)
    private ModelService modelService; // placeholder for when you integrate model later

    @MessageMapping("/session/{id}/frame")
    public void handleFrame(@DestinationVariable Long id, @Payload MessagePayload payload) {
        System.out.println("🎥 Received frame for session " + id + " from user " + payload.getUserId());

        // Simulate recognition logic (later replaced by real model call)
        String simulatedResult = "Detected: [Simulated Gesture]";
        PredictionResult result = new PredictionResult(simulatedResult, 0.98);

        // Send result to all clients in this session
        messagingTemplate.convertAndSend("/topic/session/" + id, result);
    }

    @MessageMapping("/session/{id}/join")
    public void handleJoin(@DestinationVariable Long id, @Payload MessagePayload payload) {
        System.out.println("👤 User " + payload.getUserId() + " joined session " + id);

        messagingTemplate.convertAndSend("/topic/session/" + id,
                "User " + payload.getUserId() + " joined session " + id);
    }

    @MessageMapping("/session/{id}/end")
    public void handleEnd(@DestinationVariable Long id, @Payload MessagePayload payload) {
        System.out.println("🛑 Session " + id + " ended by user " + payload.getUserId());

        messagingTemplate.convertAndSend("/topic/session/" + id,
                "Session " + id + " has been ended.");
    }
}
