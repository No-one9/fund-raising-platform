package com.fundraiseplatform.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminDTO {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String token;
    private String username;
    private String role;
    private List<GrantedAuthority> authorities;
}
