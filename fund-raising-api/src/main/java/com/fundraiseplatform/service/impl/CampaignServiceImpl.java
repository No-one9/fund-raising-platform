package com.fundraiseplatform.service.impl;

import com.fundraiseplatform.dto.CampaignDTO;
import com.fundraiseplatform.entity.CampaignCategoryEntity;
import com.fundraiseplatform.entity.CampaignEntity;
import com.fundraiseplatform.entity.CampaignStatusEntity;
import com.fundraiseplatform.exceptions.ResourceNotFoundException;
import com.fundraiseplatform.repository.CampaignCategoryRepository;
import com.fundraiseplatform.repository.CampaignRepository;
import com.fundraiseplatform.repository.CampaignStatusRepository;
import com.fundraiseplatform.service.CampaignService;
import com.fundraiseplatform.service.CampaignStatusService;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CampaignServiceImpl implements CampaignService {

    @Autowired
    private CampaignRepository campaignRepository;
    @Autowired
    private CampaignStatusRepository campaignStatusRepository;
    @Autowired
    private CampaignCategoryRepository campaignCategoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CampaignDTO createCampaign(CampaignDTO campaignDTO) {
        String id = new ObjectId().toString();
        CampaignEntity campaignEntity = modelMapper.map(campaignDTO, CampaignEntity.class);

        String fileName = "";
        if(campaignDTO.getCampaignImage() != null){
            fileName = handleFileUpload(id, campaignDTO.getCampaignImage());
            campaignEntity.setPhotoUrl(fileName);
        }

        campaignEntity.setId(id);

        CampaignEntity savedCampaign = campaignRepository.save(campaignEntity);

        return convertToCampaignDto(savedCampaign);
    }

    @Override
    public CampaignDTO getCampaignById(String id) {
        updateCampaignStatusBySysDate();
        CampaignEntity campaignEntity = campaignRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Campaign not found with"+ id));
        return convertToCampaignDto(campaignEntity);
    }

    @Override
    public List<CampaignDTO> getAllCampaigns() {
        updateCampaignStatusBySysDate();
        List<CampaignEntity> campaignEntities = campaignRepository.findAll();
        return campaignEntities.stream()
                .map(this::convertToCampaignDto)
                .collect(Collectors.toList());
    }

    @Override
    public CampaignDTO updateCampaign(String id, CampaignDTO campaignDTO) {
        CampaignEntity existingCampaign = campaignRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Campaign not found with"+ id));

        existingCampaign.setTitle(campaignDTO.getTitle());
        existingCampaign.setDescription(campaignDTO.getDescription());
        existingCampaign.setAmountNeeded(campaignDTO.getAmountNeeded());
        existingCampaign.setCategoryId(campaignDTO.getCategoryId());
        existingCampaign.setExpiryDate(campaignDTO.getExpiryDate());
        existingCampaign.setStartDate(campaignDTO.getStartDate());

        if(campaignDTO.getStatusId() != null){
            existingCampaign.setStatusId(campaignDTO.getStatusId());
        }

        String fileName = "";
        if(campaignDTO.getCampaignImage() != null){
            fileName = handleFileUpload(id, campaignDTO.getCampaignImage());
            existingCampaign.setPhotoUrl(fileName);
        }

        CampaignEntity updatedCampaign = campaignRepository.save(existingCampaign);
        return convertToCampaignDto(updatedCampaign);
    }

    @Override
    public void deleteCampaign(String id) {
        if (!campaignRepository.existsById(id)) {
            throw new ResourceNotFoundException("Campaign not found with"+ id);
        }
        campaignRepository.deleteById(id);
    }

    @Override
    public List<CampaignDTO> getUserCampaigns(String userId) {
        updateCampaignStatusBySysDate();
        List<CampaignEntity> campaignEntities = campaignRepository.findAllByUserId(userId);
        return campaignEntities.stream()
                .map(this::convertToCampaignDto)
                .collect(Collectors.toList());
    }

    @Override
    public CampaignDTO updateCampaignStatus(String id, CampaignDTO campaignDTO) {
        CampaignEntity existingCampaign = campaignRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Campaign not found with"+ id));
        if(campaignDTO.getStatusId() != null){
            existingCampaign.setStatusId(campaignDTO.getStatusId());
            CampaignEntity updatedCampaign = campaignRepository.save(existingCampaign);
            return convertToCampaignDto(updatedCampaign);
        }
        return convertToCampaignDto(existingCampaign);
    }

    private String handleFileUpload(String petId, MultipartFile movieImage) {
        String uniqueFileName = "";
        try {
            String uploadDir = "/Users/boss/Downloads/fund-raising-updated/fund-raising-ui/src/images/campaign";
            String originalFileName = movieImage.getOriginalFilename();
            assert originalFileName != null;
            String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
            uniqueFileName = petId + fileExtension;

            Path filePath = Paths.get(uploadDir, uniqueFileName);

            if (Files.exists(filePath)) {
                Files.delete(filePath);
            }

            Files.write(filePath, movieImage.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return uniqueFileName;
    }

    public void updateCampaignStatusBySysDate() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd"); // Adjust the pattern based on your date format
        LocalDate currentDate = LocalDate.now();
        List<CampaignEntity> campaignsToUpdate = campaignRepository.findAll()
                .stream()
                .filter(campaign -> {
                    LocalDate expiryDate = LocalDate.parse(campaign.getExpiryDate(), formatter);
                    return expiryDate.isBefore(currentDate) || expiryDate.isEqual(currentDate);
                })
                .toList();

        CampaignStatusEntity closedStatus = campaignStatusRepository.findByStatusName("Closed")
                .orElseThrow(() -> new ResourceNotFoundException("Status 'Closed' not found"));

        for (CampaignEntity campaign : campaignsToUpdate) {
            campaign.setStatusId(closedStatus.getId());
            campaignRepository.save(campaign);
        }
    }

    private CampaignDTO convertToCampaignDto(CampaignEntity campaignEntity){
        CampaignDTO campaignDto = modelMapper.map(campaignEntity, CampaignDTO.class);

        // Map category ID to category name
        campaignCategoryRepository.findById(campaignEntity.getCategoryId()).ifPresent(categoryEntity ->
                campaignDto.setCategoryName(categoryEntity.getCategoryName()));

        // Map status ID to status name
        campaignStatusRepository.findById(campaignEntity.getStatusId()).ifPresent(statusEntity ->
                campaignDto.setStatusName(statusEntity.getStatusName()));

        return campaignDto;
    }
}
