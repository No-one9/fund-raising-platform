package com.fundraiseplatform.service.impl;


import com.fundraiseplatform.dto.CampaignDTO;
import com.fundraiseplatform.dto.DonationDTO;
import com.fundraiseplatform.entity.CampaignEntity;
import com.fundraiseplatform.entity.DonationEntity;
import com.fundraiseplatform.entity.PaymentEntity;
import com.fundraiseplatform.exceptions.ResourceNotFoundException;
import com.fundraiseplatform.repository.CampaignRepository;
import com.fundraiseplatform.repository.DonationRepository;
import com.fundraiseplatform.repository.PaymentRepository;
import com.fundraiseplatform.service.DonationService;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DonationServiceImpl implements DonationService {

    @Autowired
    private DonationRepository donationRepository;
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private CampaignRepository campaignRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public DonationDTO createDonation(DonationDTO donationDTO) {
        String id = new ObjectId().toString();

        DonationEntity donationEntity = modelMapper.map(donationDTO, DonationEntity.class);
        donationEntity.setId(id);
        DonationEntity savedDonation = donationRepository.save(donationEntity);

        PaymentEntity paymentEntity = modelMapper.map(donationDTO.getPaymentData(), PaymentEntity.class);
        paymentEntity.setDonationId(id);
        PaymentEntity savedPayment = paymentRepository.save(paymentEntity);

        CampaignEntity campaignEntity = campaignRepository.findById(donationDTO.getCampaignId())
                .orElseThrow(() -> new ResourceNotFoundException("Campaign not found with"+ donationDTO.getCampaignId()));

        campaignEntity.setAmountRaised(campaignEntity.getAmountRaised()+donationEntity.getAmount());
        campaignRepository.save(campaignEntity);

        return modelMapper.map(savedDonation, DonationDTO.class);
    }

    @Override
    public DonationDTO getDonationById(String id) {
        DonationEntity donationEntity = donationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Donation not found "+id));
        return modelMapper.map(donationEntity, DonationDTO.class);
    }

    @Override
    public List<DonationDTO> getDonationsByCampaignId(String id) {

        List<DonationEntity> donationEntities = donationRepository.findAllByCampaignId(id);
        return donationEntities.stream()
                .map(donationEntity -> modelMapper.map(donationEntity, DonationDTO.class))
                .collect(Collectors.toList());

    }

    @Override
    public List<DonationDTO> getAllDonations() {
        List<DonationEntity> donationEntities = donationRepository.findAll();
        return donationEntities.stream()
                .map(donationEntity -> modelMapper.map(donationEntity, DonationDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<DonationDTO> getDonationsByDonorId(String donorId) {
        List<DonationEntity> donationEntities = donationRepository.findAllByDonorId(donorId);

        return donationEntities.stream()
                .map(this::addCampaignToDonation)
                .collect(Collectors.toList());
    }

    @Override
    public DonationDTO updateDonation(String id, DonationDTO donationDTO) {
        DonationEntity existingDonation = donationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Donation not found "+id));

        modelMapper.map(donationDTO, existingDonation);

        DonationEntity updatedDonation = donationRepository.save(existingDonation);
        return modelMapper.map(updatedDonation, DonationDTO.class);
    }

    @Override
    public void deleteDonation(String id) {
        if (!donationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Donation not found "+id);
        }
        donationRepository.deleteById(id);
    }

    public DonationDTO addCampaignToDonation(DonationEntity donation){
        Optional<CampaignEntity> existingCampaign = campaignRepository.findById(donation.getCampaignId());
        DonationDTO donationDTO = modelMapper.map(donation, DonationDTO.class);
        existingCampaign.ifPresent(campaignEntity -> donationDTO.setCampaignData(modelMapper.map(campaignEntity, CampaignDTO.class)));
        return donationDTO;
    }
}
