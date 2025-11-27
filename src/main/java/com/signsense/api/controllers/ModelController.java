package com.signsense.api.controllers;

import com.signsense.model.PredictionResult;
import com.signsense.service.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/model")
public class ModelController {

    @Autowired
    private ModelService modelService;

    @PostMapping("/predict")
    public PredictionResult predict(@RequestBody String inputData) {
        return modelService.predict(inputData);
    }
}
