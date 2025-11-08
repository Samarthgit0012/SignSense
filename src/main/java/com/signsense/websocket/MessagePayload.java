package com.signsense.websocket;

public class MessagePayload {
    private String type;      // e.g. "FRAME", "JOIN", "END_SESSION"
    private String data;      // could be base64 image, landmarks JSON, etc.
    private Long sessionId;   // session identifier
    private Long userId;      // optional, who sent it

    public MessagePayload() {}

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getData() { return data; }
    public void setData(String data) { this.data = data; }

    public Long getSessionId() { return sessionId; }
    public void setSessionId(Long sessionId) { this.sessionId = sessionId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
