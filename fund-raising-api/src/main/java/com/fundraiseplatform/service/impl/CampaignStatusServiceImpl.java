package com.fundraiseplatform.service.impl;

import com.fundraiseplatform.dto.CampaignStatusDTO;
import com.fundraiseplatform.entity.CampaignStatusEntity;
import com.fundraiseplatform.exceptions.ResourceNotFoundException;
import com.fundraiseplatform.repository.CampaignStatusRepository;
import com.fundraiseplatform.service.CampaignStatusService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CampaignStatusServiceImpl implements CampaignStatusService {

    @Autowired
    private CampaignStatusRepository campaignStatusRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CampaignStatusDTO createCampaignStatus(CampaignStatusDTO campaignStatusDTO) {
        CampaignStatusEntity campaignStatusEntity = modelMapper.map(campaignStatusDTO, CampaignStatusEntity.class);
        CampaignStatusEntity savedStatus = campaignStatusRepository.save(campaignStatusEntity);
        return modelMapper.map(savedStatus, CampaignStatusDTO.class);
    }

    @Override
    public CampaignStatusDTO getCampaignStatusById(String id) {
        CampaignStatusEntity campaignStatusEntity = campaignStatusRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CampaignStatus not found with"+ id));
        return modelMapper.map(campaignStatusEntity, CampaignStatusDTO.class);
    }

    @Override
    public List<CampaignStatusDTO> getAllCampaignStatuses() {
        List<CampaignStatusEntity> campaignStatusEntities = campaignStatusRepository.findAll();
        return campaignStatusEntities.stream()
                .map(campaignStatusEntity -> modelMapper.map(campaignStatusEntity, CampaignStatusDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public CampaignStatusDTO updateCampaignStatus(String id, CampaignStatusDTO campaignStatusDTO) {
        CampaignStatusEntity existingStatus = campaignStatusRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CampaignStatus not found with"+ id));

        modelMapper.map(campaignStatusDTO, existingStatus);

        CampaignStatusEntity updatedStatus = campaignStatusRepository.save(existingStatus);
        return modelMapper.map(updatedStatus, CampaignStatusDTO.class);
    }

    @Override
    public void deleteCampaignStatus(String id) {
        if (!campaignStatusRepository.existsById(id)) {
            throw new ResourceNotFoundException("CampaignStatus not found with"+ id);
        }
        campaignStatusRepository.deleteById(id);
    }
}
