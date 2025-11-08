package com.signsense.model;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class PythonModelInvoker {

    private static final String MODEL_API_URL = "http://localhost:5000/predict";

    public PredictionResult invokeModel(String inputData) {
        try {
            RestTemplate restTemplate = new RestTemplate();

            // Send data to Python backend (Flask/FastAPI)
            Map<String, Object> response = restTemplate.postForObject(
                    MODEL_API_URL,
                    Map.of("data", inputData),
                    Map.class
            );

            if (response == null) {
                return new PredictionResult("No response", 0.0);
            }

            String label = response.get("label") != null ? response.get("label").toString() : "Unknown";
            double confidence = response.get("confidence") instanceof Number
                    ? ((Number) response.get("confidence")).doubleValue() : 0.0;

            return new PredictionResult(label, confidence);
        } catch (Exception e) {
            return new PredictionResult("Error: " + e.getMessage(), 0.0);
        }
    }

    // Optional: switch to local Python script call if needed
    public PredictionResult invokePythonScript(String inputData) {
        try {
            ProcessBuilder pb = new ProcessBuilder("python", "model/predict.py", inputData);
            Process process = pb.start();

            java.io.BufferedReader reader = new java.io.BufferedReader(
                    new java.io.InputStreamReader(process.getInputStream())
            );
            String output = reader.readLine();

            return new PredictionResult(output != null ? output : "No output", 0.95);
        } catch (Exception e) {
            return new PredictionResult("Script error: " + e.getMessage(), 0.0);
        }
    }
}
