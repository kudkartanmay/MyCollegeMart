package com.mycollegemart.backend.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.mycollegemart.backend.dto.LoginDto;
import com.mycollegemart.backend.entity.User;
import com.mycollegemart.backend.repository.UserRepository;
import com.mycollegemart.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

/**
 * Service class containing business logic for user authentication.
 */
@Service
public class UserService {

    // Injects all necessary dependencies for handling users, security, and tokens.
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;

    // Injects the Google Client ID from the application.properties file.
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    /**
     * Handles standard user registration with an encrypted password.
     */
    public User registerUser(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return userRepository.save(user);
    }

    /**
     * Handles standard user login and generates a JWT.
     */
    public String authenticate(LoginDto loginDto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
        );
        return jwtUtil.generateToken(loginDto.getEmail());
    }

    /**
     * Verifies a Google ID token, then creates or logs in the user.
     * @param tokenString The ID token received from the frontend.
     * @return An application-specific JWT for the user.
     */

    public String processGoogleLogin(String tokenString) throws GeneralSecurityException, IOException {
        // Verifier to check the token's validity
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(googleClientId))
                .build();

        // Verify the token
        GoogleIdToken idToken = verifier.verify(tokenString);
        if (idToken == null) {
            throw new IllegalArgumentException("Invalid Google token");
        }

        // Extract user information from the token payload
        GoogleIdToken.Payload payload = idToken.getPayload();
        String googleId = payload.getSubject();
        String email = payload.getEmail();
        String originalName = (String) payload.get("name");

        // --- THIS IS THE FIX ---
        // Create a final variable for the name to be used in the lambda.
        final String finalName;
        if (originalName == null || originalName.isEmpty()) {
            finalName = email.split("@")[0];
        } else {
            finalName = originalName;
        }
        // --- END OF FIX ---


        // Find an existing user by their Google ID or email, or create a new one
        User user = userRepository.findByGoogleId(googleId)
                .or(() -> userRepository.findByEmail(email))
                .map(existingUser -> {
                    // If user exists but googleId is null, link the account
                    if (existingUser.getGoogleId() == null) {
                        existingUser.setGoogleId(googleId);
                        return userRepository.save(existingUser);
                    }
                    return existingUser;
                })
                .orElseGet(() -> {
                    // If no user is found, create a new one using the finalName variable.
                    User newUser = new User(finalName, email, googleId);
                    return userRepository.save(newUser);
                });

        // Generate a JWT for our application for the logged-in user
        return jwtUtil.generateToken(user.getEmail());
    }
}