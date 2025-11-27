package com.signsense.model;

public class PredictionResult {
    private String label;
    private double confidence;

    public PredictionResult() {}

    public PredictionResult(String label, double confidence) {
        this.label = label;
        this.confidence = confidence;
    }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public double getConfidence() { return confidence; }
    public void setConfidence(double confidence) { this.confidence = confidence; }

    @Override
    public String toString() {
        return "PredictionResult{" +
                "label='" + label + '\'' +
                ", confidence=" + confidence +
                '}';
    }
}
