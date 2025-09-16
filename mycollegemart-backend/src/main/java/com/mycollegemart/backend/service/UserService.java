package com.mycollegemart.backend.service;

import com.mycollegemart.backend.model.User;
import com.mycollegemart.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    // ✅ BEST PRACTICE: Use 'final' and constructor injection instead of field injection.
    // This makes the dependency explicit and the class easier to test.
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Finds a user by email. If they don't exist, creates a new account for them.
     * This logic is specifically for handling Google Sign-In.
     */
    public User findOrCreateGoogleUser(String email, String name, String googleId) {
        Optional<User> existingUserOpt = userRepository.findByEmail(email);

        if (existingUserOpt.isPresent()) {
            // User already exists, return them.
            User existingUser = existingUserOpt.get();
            // ✅ IMPROVEMENT: If an existing user signs in with Google for the first time,
            // update their account with their Google ID for future reference.
            if (existingUser.getGoogleId() == null) {
                existingUser.setGoogleId(googleId);
                userRepository.save(existingUser);
            }
            return existingUser;
        } else {
            // User does not exist, create a new one.
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setDisplayName(name);
            newUser.setGoogleId(googleId); // Set the Google ID
            newUser.setPassword(null); // No password for Google users
            newUser.setPrimeMember(false);
            // Save the newly created user to the database.
            return userRepository.save(newUser);
        }
    }

    /**
     * Finds a user by their primary key ID.
     */
    public User findById(String idStr) {
        if (idStr == null) return null;
        try {
            Long id = Long.parseLong(idStr);
            // .orElse(null) returns the user if found, otherwise returns null.
            return userRepository.findById(id).orElse(null);
        } catch (NumberFormatException e) {
            // Handle cases where the ID is not a valid number.
            return null;
        }
    }
}