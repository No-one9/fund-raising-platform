package com.fundraiseplatform.service;


import com.fundraiseplatform.dto.AdminDTO;
import com.fundraiseplatform.dto.DonationDTO;
import com.fundraiseplatform.entity.AdminEntity;
import com.fundraiseplatform.exceptions.ResourceNotFoundException;
import com.fundraiseplatform.securityconfig.AppConstants;

import java.util.List;

public interface DonationService {

    DonationDTO createDonation(DonationDTO donationDTO);

    DonationDTO getDonationById(String id);

    List<DonationDTO> getAllDonations();

    DonationDTO updateDonation(String id, DonationDTO donationDTO);

    void deleteDonation(String id);

    public List<DonationDTO> getDonationsByCampaignId(String id);

    public List<DonationDTO> getDonationsByDonorId(String donorId);


}
