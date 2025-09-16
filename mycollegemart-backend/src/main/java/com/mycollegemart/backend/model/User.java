package com.mycollegemart.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users") // This explicitly names the table in the database
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    // ✅ CHANGE: Made nullable=true so users signing up with Google don't need a password.
    @Column(nullable = true)
    private String password;

    private String displayName;

    private boolean isPrimeMember;

    private String primeExpiryDate;

    // ✅ ADDED: A new field to store the unique Google User ID.
    // This is a more reliable identifier than email.
    @Column(name = "google_id")
    private String googleId;
}