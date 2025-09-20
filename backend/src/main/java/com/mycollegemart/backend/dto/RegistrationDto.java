package com.mycollegemart.backend.dto;

import lombok.Data;

/**
 * A Data Transfer Object for carrying user registration data from the client.
 */
// Generates boilerplate code like getters, setters, and toString().
@Data
public class RegistrationDto {
    private String name;
    private String email;
    private String password;
}