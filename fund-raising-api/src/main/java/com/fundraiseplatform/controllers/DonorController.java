package com.fundraiseplatform.controllers;

import com.fundraiseplatform.dto.DonorDTO;
import com.fundraiseplatform.dto.UserDTO;
import com.fundraiseplatform.securityconfig.AuthenticationHelper;
import com.fundraiseplatform.service.DonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/donors")
public class DonorController {

    @Autowired
    private DonorService donorService;

    @Autowired
    AuthenticationHelper authenticationHelper;

    @PostMapping
    public ResponseEntity<DonorDTO> createDonor(@RequestBody DonorDTO donorDTO) {
        DonorDTO createdDonor = donorService.createDonor(donorDTO);
        return new ResponseEntity<>(createdDonor, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DonorDTO> getDonorById(@PathVariable String id) {
        DonorDTO donorDTO = donorService.getDonorById(id);
        return ResponseEntity.ok(donorDTO);
    }

    @GetMapping
    public ResponseEntity<List<DonorDTO>> getAllDonors() {
        List<DonorDTO> donors = donorService.getAllDonors();
        return ResponseEntity.ok(donors);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DonorDTO> updateDonor(@PathVariable String id, @RequestBody DonorDTO donorDTO) {
        DonorDTO updatedDonor = donorService.updateDonor(id, donorDTO);
        return ResponseEntity.ok(updatedDonor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonor(@PathVariable String id) {
        donorService.deleteDonor(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<DonorDTO> login(@RequestBody DonorDTO donorDTO) {
        DonorDTO donorDTO1 = donorService.login(donorDTO);
        donorDTO1.setToken(authenticationHelper.createToken(donorDTO1.getEmail(), donorDTO1.getId(), "ROLE_DONOR"));
        return ResponseEntity.ok(donorDTO1);
    }
}
