package com.mycollegemart.backend.controller;

import com.mycollegemart.backend.dto.AuthResponseDto;
import com.mycollegemart.backend.dto.GoogleAuthDto;
import com.mycollegemart.backend.dto.LoginDto;
import com.mycollegemart.backend.dto.RegistrationDto;
import com.mycollegemart.backend.entity.User;
import com.mycollegemart.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.GeneralSecurityException;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationDto registrationDto) {
        User newUser = new User();
        newUser.setName(registrationDto.getName());
        newUser.setEmail(registrationDto.getEmail());
        newUser.setPassword(registrationDto.getPassword());
        userService.registerUser(newUser);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginDto loginDto) {
        String token = userService.authenticate(loginDto);
        return ResponseEntity.ok(new AuthResponseDto(token));
    }

    /**
     * Handles POST requests to /api/auth/google for Google Sign-In.
     * @param googleAuthDto Contains the Google ID token.
     * @return A JWT access token for our application.
     */
    @PostMapping("/google")
    public ResponseEntity<?> authenticateWithGoogle(@RequestBody GoogleAuthDto googleAuthDto) {
        try {
            String token = userService.processGoogleLogin(googleAuthDto.getToken());
            return ResponseEntity.ok(new AuthResponseDto(token));
        } catch (GeneralSecurityException | IOException | IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}