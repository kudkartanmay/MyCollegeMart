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
        // Build a verifier to validate the token against our Google Client ID.
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(googleClientId))
                .build();

        GoogleIdToken idToken = verifier.verify(tokenString);
        if (idToken == null) {
            throw new IllegalArgumentException("Invalid Google token");
        }

        // Extract user details from the token's payload.
        GoogleIdToken.Payload payload = idToken.getPayload();
        String googleId = payload.getSubject();
        String email = payload.getEmail();
        String name = (String) payload.get("name");

        // Find user by Google ID or email. If they don't exist, create a new account.
        User user = userRepository.findByGoogleId(googleId)
                .or(() -> userRepository.findByEmail(email))
                .map(existingUser -> {
                    // Link existing account if it's their first time using Google Sign-In.
                    if (existingUser.getGoogleId() == null) {
                        existingUser.setGoogleId(googleId);
                        return userRepository.save(existingUser);
                    }
                    return existingUser;
                })
                .orElseGet(() -> {
                    // Create a new user if no account is found.
                    User newUser = new User(name, email, googleId);
                    return userRepository.save(newUser);
                });

        // Generate and return our own JWT for the session.
        return jwtUtil.generateToken(user.getEmail());
    }
}