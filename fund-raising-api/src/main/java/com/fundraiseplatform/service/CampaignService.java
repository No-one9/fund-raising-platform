package com.fundraiseplatform.service;

import com.fundraiseplatform.dto.CampaignDTO;

import java.util.List;

public interface CampaignService {

    CampaignDTO createCampaign(CampaignDTO campaignDTO);

    CampaignDTO getCampaignById(String id);

    List<CampaignDTO> getAllCampaigns();

    CampaignDTO updateCampaign(String id, CampaignDTO campaignDTO);

    void deleteCampaign(String id);

    List<CampaignDTO> getUserCampaigns(String userId);

    CampaignDTO updateCampaignStatus(String id, CampaignDTO campaignDTO);
}
