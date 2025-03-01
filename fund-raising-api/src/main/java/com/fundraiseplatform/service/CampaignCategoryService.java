package com.fundraiseplatform.service;


import com.fundraiseplatform.dto.CampaignCategoryDTO;

import java.util.List;

public interface CampaignCategoryService {

    CampaignCategoryDTO createCampaignCategory(CampaignCategoryDTO campaignCategoryDTO);

    CampaignCategoryDTO getCampaignCategoryById(String id);

    List<CampaignCategoryDTO> getAllCampaignCategories();

    CampaignCategoryDTO updateCampaignCategory(String id, CampaignCategoryDTO campaignCategoryDTO);

    void deleteCampaignCategory(String id);
}
