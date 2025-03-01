package com.fundraiseplatform.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String zipcode;
    private String ssn;
    private String status;
    private String token;
    private String username;
    private String role;
    private List<GrantedAuthority> authorities;
}
