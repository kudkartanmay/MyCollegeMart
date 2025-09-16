package com.mycollegemart.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

import java.util.Map;
import java.util.HashMap;
import java.util.Collections;

import com.mycollegemart.backend.service.UserService;
import com.mycollegemart.backend.util.JwtUtil;
import com.mycollegemart.backend.model.User;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private static final String GOOGLE_CLIENT_ID = "30561089880-65f9jvksmah2ki6k6fkolb7rijqcmmo7.apps.googleusercontent.com";

    private final UserService userService;
    private final JwtUtil jwtUtil;

    // Constructor injection instead of field injection
    @Autowired
    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> body) {
        String token = body.get("token");
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    GoogleNetHttpTransport.newTrustedTransport(),
                    GsonFactory.getDefaultInstance()) // Using GsonFactory instead of deprecated JacksonFactory
                    .setAudience(Collections.singletonList(GOOGLE_CLIENT_ID))
                    .build();

            GoogleIdToken idToken = verifier.verify(token);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail();
                String name = (String) payload.get("name");

                // Find or create user in DB
                User user = userService.findOrCreateGoogleUser(email, name);

                // Generate JWT
                String jwt = jwtUtil.generateToken(user.getId(), user.getEmail());

                Map<String, Object> response = new HashMap<>();
                response.put("token", jwt);
                response.put("email", user.getEmail());
                response.put("name", user.getDisplayName());
                response.put("id", user.getId());
                response.put("isPrimeMember", user.isPrimeMember());
                response.put("primeExpiryDate", user.getPrimeExpiryDate());

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Google token");
            }
        } catch (Exception e) {
            // Use proper logging instead of printStackTrace
            logger.error("Google sign-in failed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Google sign-in failed: " + e.getMessage());
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> getCurrentUser(@RequestHeader(name="Authorization", required=false) String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing token");
            }

            String token = authHeader.substring(7);
            String userId = jwtUtil.validateAndGetUserId(token);

            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }

            User user = userService.findById(userId);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("email", user.getEmail());
            response.put("displayName", user.getDisplayName());
            response.put("isPrimeMember", user.isPrimeMember());
            response.put("primeExpiryDate", user.getPrimeExpiryDate());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Failed to fetch user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch user");
        }
    }
}