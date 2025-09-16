package com.mycollegemart.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.mycollegemart.backend.model.User;
import com.mycollegemart.backend.repository.UserRepository;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User findOrCreateGoogleUser(String email, String name) {
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            return existingUser.get();
        }

        // Create new user for Google login
        User user = new User();
        user.setEmail(email);
        user.setDisplayName(name);
        // Generate a secure random password for Google users
        user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
        user.setPrimeMember(false);
        user.setPrimeExpiryDate(null);

        return userRepository.save(user);
    }

    public User findById(String idStr) {
        if (idStr == null) return null;
        try {
            Long id = Long.parseLong(idStr);
            return userRepository.findById(id).orElse(null);
        } catch (NumberFormatException e) {
            return null;
        }
    }
}