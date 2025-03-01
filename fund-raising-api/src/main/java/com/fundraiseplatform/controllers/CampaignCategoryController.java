package com.fundraiseplatform.controllers;

import com.fundraiseplatform.dto.CampaignCategoryDTO;
import com.fundraiseplatform.service.CampaignCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CampaignCategoryController {

    @Autowired
    private CampaignCategoryService campaignCategoryService;

    @PostMapping
    public ResponseEntity<CampaignCategoryDTO> createCampaignCategory(@RequestBody CampaignCategoryDTO campaignCategoryDTO) {
        CampaignCategoryDTO createdCategory = campaignCategoryService.createCampaignCategory(campaignCategoryDTO);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CampaignCategoryDTO> getCampaignCategoryById(@PathVariable String id) {
        CampaignCategoryDTO categoryDTO = campaignCategoryService.getCampaignCategoryById(id);
        return ResponseEntity.ok(categoryDTO);
    }

    @GetMapping
    public ResponseEntity<List<CampaignCategoryDTO>> getAllCampaignCategories() {
        List<CampaignCategoryDTO> categories = campaignCategoryService.getAllCampaignCategories();
        return ResponseEntity.ok(categories);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CampaignCategoryDTO> updateCampaignCategory(@PathVariable String id, @RequestBody CampaignCategoryDTO campaignCategoryDTO) {
        CampaignCategoryDTO updatedCategory = campaignCategoryService.updateCampaignCategory(id, campaignCategoryDTO);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCampaignCategory(@PathVariable String id) {
        campaignCategoryService.deleteCampaignCategory(id);
        return ResponseEntity.noContent().build();
    }
}
