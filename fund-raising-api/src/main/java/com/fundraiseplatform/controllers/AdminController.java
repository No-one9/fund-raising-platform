package com.fundraiseplatform.controllers;

import com.fundraiseplatform.dto.AdminDTO;
import com.fundraiseplatform.securityconfig.AuthenticationHelper;
import com.fundraiseplatform.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;
    @Autowired
    AuthenticationHelper authenticationHelper;

    @PostMapping
    public ResponseEntity<AdminDTO> createAdmin(@RequestBody AdminDTO adminDTO) {
        AdminDTO createdAdmin = adminService.createAdmin(adminDTO);
        return new ResponseEntity<>(createdAdmin, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminDTO> getAdminById(@PathVariable String id) {
        AdminDTO adminDTO = adminService.getAdminById(id);
        return ResponseEntity.ok(adminDTO);
    }

    @GetMapping
    public ResponseEntity<List<AdminDTO>> getAllAdmins() {
        List<AdminDTO> admins = adminService.getAllAdmins();
        return ResponseEntity.ok(admins);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdminDTO> updateAdmin(@PathVariable String id, @RequestBody AdminDTO adminDTO) {
        AdminDTO updatedAdmin = adminService.updateAdmin(id, adminDTO);
        return ResponseEntity.ok(updatedAdmin);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable String id) {
        adminService.deleteAdmin(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<AdminDTO> login(@RequestBody AdminDTO adminDto) {
        AdminDTO admin = adminService.login(adminDto);
        admin.setToken(authenticationHelper.createToken(adminDto.getEmail(), admin.getId(), "ROLE_ADMIN"));
        return ResponseEntity.ok(admin);
    }
}
