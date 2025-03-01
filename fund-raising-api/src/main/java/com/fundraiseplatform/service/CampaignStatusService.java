package com.fundraiseplatform.service;


import com.fundraiseplatform.dto.CampaignStatusDTO;

import java.util.List;

public interface CampaignStatusService {

    CampaignStatusDTO createCampaignStatus(CampaignStatusDTO campaignStatusDTO);

    CampaignStatusDTO getCampaignStatusById(String id);

    List<CampaignStatusDTO> getAllCampaignStatuses();

    CampaignStatusDTO updateCampaignStatus(String id, CampaignStatusDTO campaignStatusDTO);

    void deleteCampaignStatus(String id);
}
