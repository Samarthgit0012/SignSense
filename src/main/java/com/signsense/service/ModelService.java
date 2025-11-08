package com.signsense.service;

import com.signsense.model.PredictionResult;
import com.signsense.model.PythonModelInvoker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ModelService {

    @Autowired
    private PythonModelInvoker pythonModelInvoker;

    public PredictionResult predict(String inputData) {
        if (inputData == null || inputData.isEmpty()) {
            return new PredictionResult("Invalid input", 0.0);
        }

        // 🔹 Temporary simulation while real model not integrated
        if (System.getenv("MOCK_MODE") != null) {
            return new PredictionResult("Simulated Gesture", 0.98);
        }

        // 🔹 When your Python model is ready:
        // return pythonModelInvoker.invokeModel(inputData);

        // For now, return a dummy response
        return new PredictionResult("Simulated Gesture", 0.98);
    }
}
