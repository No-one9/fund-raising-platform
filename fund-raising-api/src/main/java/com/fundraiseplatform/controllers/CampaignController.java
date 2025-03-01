package com.fundraiseplatform.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fundraiseplatform.dto.CampaignDTO;
import com.fundraiseplatform.exceptions.ResourceNotFoundException;
import com.fundraiseplatform.service.CampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/campaigns")
public class CampaignController {

    @Autowired
    private CampaignService campaignService;
    @Autowired
    private ObjectMapper objectMapper;

//    @PostMapping
//    public ResponseEntity<CampaignDTO> createCampaign(@RequestBody CampaignDTO campaignDTO) {
//        CampaignDTO createdCampaign = campaignService.createCampaign(campaignDTO);
//        return new ResponseEntity<>(createdCampaign, HttpStatus.CREATED);
//    }

    @PostMapping
    public ResponseEntity<CampaignDTO> createUserCampaign(
            @RequestPart("campaignDto") String campaignDto
            , @RequestPart("imageFile") MultipartFile file)  throws ResourceNotFoundException, JsonProcessingException {
        CampaignDTO campaign = objectMapper.readValue(campaignDto, CampaignDTO.class);
        campaign.setCampaignImage(file);

        CampaignDTO createdCampaign = campaignService.createCampaign(campaign);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCampaign);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CampaignDTO> getCampaignById(@PathVariable String id) {
        CampaignDTO campaignDTO = campaignService.getCampaignById(id);
        return ResponseEntity.ok(campaignDTO);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<CampaignDTO> updateCampaignStatus(@PathVariable String id
            ,@RequestBody CampaignDTO campaignDTO) {
        CampaignDTO campaign = campaignService.updateCampaignStatus(id,campaignDTO);
        return ResponseEntity.ok(campaign);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CampaignDTO>> getUserCampaigns(@PathVariable String userId) {
        List<CampaignDTO> campaigns = campaignService.getUserCampaigns(userId);
        return ResponseEntity.ok(campaigns);
    }

    @GetMapping
    public ResponseEntity<List<CampaignDTO>> getAllCampaigns() {
        List<CampaignDTO> campaigns = campaignService.getAllCampaigns();
        return ResponseEntity.ok(campaigns);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CampaignDTO> updateCampaign(@PathVariable String id,
            @RequestPart("campaignDto") String campaignDto
            , @RequestPart(value = "imageFile", required = false) MultipartFile file)  throws ResourceNotFoundException, JsonProcessingException {
        CampaignDTO campaign = objectMapper.readValue(campaignDto, CampaignDTO.class);
        campaign.setCampaignImage(file);

        CampaignDTO createdCampaign = campaignService.updateCampaign(id,campaign);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCampaign);
    }


//    public ResponseEntity<CampaignDTO> updateCampaign(@PathVariable String id, @RequestBody CampaignDTO campaignDTO) {
//        CampaignDTO updatedCampaign = campaignService.updateCampaign(id, campaignDTO);
//        return ResponseEntity.ok(updatedCampaign);
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCampaign(@PathVariable String id) {
        campaignService.deleteCampaign(id);
        return ResponseEntity.noContent().build();
    }
}
