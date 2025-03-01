package com.fundraiseplatform.controllers;

import com.fundraiseplatform.dto.DonationDTO;
import com.fundraiseplatform.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/donations")
public class DonationController {

    @Autowired
    private DonationService donationService;

    @PostMapping
    public ResponseEntity<DonationDTO> createDonation(@RequestBody DonationDTO donationDTO) {
        DonationDTO createdDonation = donationService.createDonation(donationDTO);
        return new ResponseEntity<>(createdDonation, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DonationDTO> getDonationById(@PathVariable String id) {
        DonationDTO donationDTO = donationService.getDonationById(id);
        return ResponseEntity.ok(donationDTO);
    }

    @GetMapping
    public ResponseEntity<List<DonationDTO>> getAllDonations() {
        List<DonationDTO> donations = donationService.getAllDonations();
        return ResponseEntity.ok(donations);
    }

    @GetMapping("/campaign/{campaignId}")
    public ResponseEntity<List<DonationDTO>> getAllDonations(@PathVariable String campaignId) {
        List<DonationDTO> donations = donationService.getDonationsByCampaignId(campaignId);
        return ResponseEntity.ok(donations);
    }

    @GetMapping("/donor/{donorId}")
    public ResponseEntity<List<DonationDTO>> getDonorDonations(@PathVariable String donorId) {
        List<DonationDTO> donations = donationService.getDonationsByDonorId(donorId);
        return ResponseEntity.ok(donations);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DonationDTO> updateDonation(@PathVariable String id, @RequestBody DonationDTO donationDTO) {
        DonationDTO updatedDonation = donationService.updateDonation(id, donationDTO);
        return ResponseEntity.ok(updatedDonation);
    }

    @PutMapping("/{id}/withdraw")
    public ResponseEntity<DonationDTO> withdrawDonation(@PathVariable String id, @RequestBody DonationDTO donationDTO) {
        DonationDTO updatedDonation = donationService.updateDonation(id, donationDTO);
        return ResponseEntity.ok(updatedDonation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonation(@PathVariable String id) {
        donationService.deleteDonation(id);
        return ResponseEntity.noContent().build();
    }
}
