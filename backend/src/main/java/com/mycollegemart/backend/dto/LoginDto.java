package com.mycollegemart.backend.dto;

import lombok.Data;

@Data
public class LoginDto {
    private String email;
    private String password;
}