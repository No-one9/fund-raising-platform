package com.fundraiseplatform.service.impl;


import com.fundraiseplatform.dto.CampaignCategoryDTO;
import com.fundraiseplatform.entity.CampaignCategoryEntity;
import com.fundraiseplatform.exceptions.ResourceNotFoundException;
import com.fundraiseplatform.repository.CampaignCategoryRepository;
import com.fundraiseplatform.service.CampaignCategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CampaignCategoryServiceImpl implements CampaignCategoryService {

    @Autowired
    private CampaignCategoryRepository campaignCategoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CampaignCategoryDTO createCampaignCategory(CampaignCategoryDTO campaignCategoryDTO) {
        CampaignCategoryEntity campaignCategoryEntity = modelMapper.map(campaignCategoryDTO, CampaignCategoryEntity.class);
        CampaignCategoryEntity savedCategory = campaignCategoryRepository.save(campaignCategoryEntity);
        return modelMapper.map(savedCategory, CampaignCategoryDTO.class);
    }

    @Override
    public CampaignCategoryDTO getCampaignCategoryById(String id) {
        CampaignCategoryEntity campaignCategoryEntity = campaignCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CampaignCategory not found "+id));
        return modelMapper.map(campaignCategoryEntity, CampaignCategoryDTO.class);
    }

    @Override
    public List<CampaignCategoryDTO> getAllCampaignCategories() {
        List<CampaignCategoryEntity> campaignCategoryEntities = campaignCategoryRepository.findAll();
        return campaignCategoryEntities.stream()
                .map(campaignCategoryEntity -> modelMapper.map(campaignCategoryEntity, CampaignCategoryDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public CampaignCategoryDTO updateCampaignCategory(String id, CampaignCategoryDTO campaignCategoryDTO) {
        CampaignCategoryEntity existingCategory = campaignCategoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CampaignCategory not found "+id));

        modelMapper.map(campaignCategoryDTO, existingCategory);

        CampaignCategoryEntity updatedCategory = campaignCategoryRepository.save(existingCategory);
        return modelMapper.map(updatedCategory, CampaignCategoryDTO.class);
    }

    @Override
    public void deleteCampaignCategory(String id) {
        if (!campaignCategoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("CampaignCategory not found "+id);
        }
        campaignCategoryRepository.deleteById(id);
    }
}
