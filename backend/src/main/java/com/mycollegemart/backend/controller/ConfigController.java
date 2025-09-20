package com.mycollegemart.backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/config")
public class ConfigController {

    // Injects the Google Client ID from application.properties
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @GetMapping("/google-client-id")
    public ResponseEntity<?> getGoogleClientId() {
        // Returns the client ID in a simple JSON object
        return ResponseEntity.ok(Map.of("clientId", googleClientId));
    }
}