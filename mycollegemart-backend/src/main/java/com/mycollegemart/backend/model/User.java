package com.mycollegemart.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    @Email
    private String email;

    @Column(nullable = true)
    private String password;

    private String displayName;

    private boolean isPrimeMember;

    private String primeExpiryDate;

    // This field must be present
    private String googleId;
}