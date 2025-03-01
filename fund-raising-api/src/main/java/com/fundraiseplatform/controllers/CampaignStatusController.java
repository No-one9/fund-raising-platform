package com.fundraiseplatform.controllers;

import com.fundraiseplatform.dto.CampaignStatusDTO;
import com.fundraiseplatform.service.CampaignStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/campaignstatuses")
public class CampaignStatusController {

    @Autowired
    private CampaignStatusService campaignStatusService;

    @PostMapping
    public ResponseEntity<CampaignStatusDTO> createCampaignStatus(@RequestBody CampaignStatusDTO campaignStatusDTO) {
        CampaignStatusDTO createdStatus = campaignStatusService.createCampaignStatus(campaignStatusDTO);
        return new ResponseEntity<>(createdStatus, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CampaignStatusDTO> getCampaignStatusById(@PathVariable String id) {
        CampaignStatusDTO statusDTO = campaignStatusService.getCampaignStatusById(id);
        return ResponseEntity.ok(statusDTO);
    }

    @GetMapping
    public ResponseEntity<List<CampaignStatusDTO>> getAllCampaignStatuses() {
        List<CampaignStatusDTO> statuses = campaignStatusService.getAllCampaignStatuses();
        return ResponseEntity.ok(statuses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CampaignStatusDTO> updateCampaignStatus(@PathVariable String id, @RequestBody CampaignStatusDTO campaignStatusDTO) {
        CampaignStatusDTO updatedStatus = campaignStatusService.updateCampaignStatus(id, campaignStatusDTO);
        return ResponseEntity.ok(updatedStatus);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCampaignStatus(@PathVariable String id) {
        campaignStatusService.deleteCampaignStatus(id);
        return ResponseEntity.noContent().build();
    }
}
