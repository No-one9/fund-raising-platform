package com.fundraiseplatform.securityconfig;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fundraiseplatform.dto.AdminDTO;
import com.fundraiseplatform.dto.DonorDTO;
import com.fundraiseplatform.dto.UserDTO;
import com.fundraiseplatform.entity.DonorEntity;
import com.fundraiseplatform.entity.UserEntity;
import com.fundraiseplatform.exceptions.ResourceNotFoundException;
import com.fundraiseplatform.service.AdminService;
import com.fundraiseplatform.service.DonorService;
import com.fundraiseplatform.service.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Component
public class AuthenticationHelper {

    @Autowired
    private AdminService adminService;

    @Autowired
    private UserService userService;

    @Autowired
    private DonorService donorService;

    @Value("${jwt.secret}")
    private String secretKey;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(String login, String userId, String role) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours

        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        return JWT.create()
                .withSubject(login)
                .withClaim("userId", userId)
                .withClaim("role", role)
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .sign(algorithm);
    }

    public Authentication validateToken(String token) throws ResourceNotFoundException {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        UserEntity userEntity = null;
        DonorEntity donorEntity = null;

        JWTVerifier verifier = JWT.require(algorithm)
                .build();

        DecodedJWT decoded = verifier.verify(token);
        String role = decoded.getClaim("role").asString();
        List<GrantedAuthority> authorities = new ArrayList<>();

        switch (role) {
            case "ROLE_ADMIN" -> {
                AdminDTO adminDTO = adminService.getAdminById(decoded.getSubject());
                authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
                return new UsernamePasswordAuthenticationToken(adminDTO, null, authorities);
            }
            case "ROLE_USER" -> {
                UserDTO userDTO = userService.getUserById(decoded.getSubject());
                authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
                return new UsernamePasswordAuthenticationToken(userDTO, null, authorities);
            }
            case "ROLE_DONOR" -> {
                DonorDTO donorDTO = donorService.getDonorById(decoded.getSubject());
                authorities.add(new SimpleGrantedAuthority("ROLE_DONOR"));
                return new UsernamePasswordAuthenticationToken(donorDTO, null, authorities);
            }
            default -> throw new IllegalArgumentException("Unsupported role: " + role);
        }
    }
}
