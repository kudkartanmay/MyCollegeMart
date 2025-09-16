package com.mycollegemart.backend.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    private final long EXPIRATION_TIME;
    private final SecretKey key; // ✅ A secure, cryptographic key object.

    /**
     * ✅ BEST PRACTICE: Use constructor injection to receive configuration properties.
     * This ensures the utility is correctly configured upon creation.
     */
    public JwtUtil(@Value("${jwt.secret}") String secret, @Value("${jwt.expiration}") long expiration) {
        this.EXPIRATION_TIME = expiration;

        // ✅ FIX: Create a cryptographically secure key from the secret string.
        // The old method of passing a raw string is deprecated and insecure.
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * Generates a JWT for a given user.
     */
    public String generateToken(Long userId, String email) {
        return Jwts.builder()
                .subject(String.valueOf(userId)) // The subject is the user's ID
                .claim("email", email) // Add email as a custom claim
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key) // ✅ Sign with the secure SecretKey object
                .compact();
    }

    /**
     * Validates the JWT and extracts the user ID (the subject).
     */
    public String validateAndGetUserId(String token) {
        try {
            // ✅ FIX: Use the modern builder pattern to parse and verify the token.
            Claims claims = Jwts.parser()
                    .verifyWith(key) // Verify the signature with the same key
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return claims.getSubject();
        } catch (Exception e) {
            // Log the specific error for easier debugging.
            logger.warn("Invalid JWT token: {}", e.getMessage());
            return null; // Return null if validation fails for any reason.
        }
    }
}