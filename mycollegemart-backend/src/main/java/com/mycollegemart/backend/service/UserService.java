package com.mycollegemart.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mycollegemart.backend.model.User;
import com.mycollegemart.backend.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {

    // Field is now 'final' because it will be set in the constructor
    private final UserRepository userRepository;

    // Use constructor injection
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findOrCreateGoogleUser(String email, String name, String googleId) {
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            if (user.getGoogleId() == null || user.getGoogleId().isEmpty()) {
                user.setGoogleId(googleId);
                return userRepository.save(user);
            }
            return user;
        }

        User newUser = new User();
        newUser.setEmail(email);
        newUser.setDisplayName(name);
        newUser.setGoogleId(googleId);
        newUser.setPassword(null);
        newUser.setPrimeMember(false);
        newUser.setPrimeExpiryDate(null);

        return userRepository.save(newUser);
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