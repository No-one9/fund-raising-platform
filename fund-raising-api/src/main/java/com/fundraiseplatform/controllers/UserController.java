package com.fundraiseplatform.controllers;

import com.fundraiseplatform.dto.AdminDTO;
import com.fundraiseplatform.dto.UserDTO;
import com.fundraiseplatform.securityconfig.AuthenticationHelper;
import com.fundraiseplatform.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    AuthenticationHelper authenticationHelper;

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        UserDTO createdUser = userService.createUser(userDTO);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable String id) {
        UserDTO userDTO = userService.getUserById(id);
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable String id, @RequestBody UserDTO userDTO) {
        UserDTO updatedUser = userService.updateUser(id, userDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<UserDTO> updateUserStatus(@PathVariable String id, @RequestBody UserDTO userDTO) {
        UserDTO updatedUser = userService.updateUserStatus(id, userDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody UserDTO userDTO) {
        UserDTO userDTO1 = userService.login(userDTO);
        userDTO1.setToken(authenticationHelper.createToken(userDTO1.getEmail(), userDTO1.getId(), "ROLE_USER"));
        return ResponseEntity.ok(userDTO1);
    }
}
