package com.fundraiseplatform.service.impl;

import com.fundraiseplatform.dto.AdminDTO;
import com.fundraiseplatform.dto.DonorDTO;
import com.fundraiseplatform.entity.AdminEntity;
import com.fundraiseplatform.entity.DonorEntity;
import com.fundraiseplatform.exceptions.ResourceNotFoundException;
import com.fundraiseplatform.repository.DonorRepository;
import com.fundraiseplatform.securityconfig.AppConstants;
import com.fundraiseplatform.service.DonorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DonorServiceImpl implements DonorService {

    @Autowired
    private DonorRepository donorRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public DonorDTO createDonor(DonorDTO donorDTO) {
        DonorEntity donorEntity = modelMapper.map(donorDTO, DonorEntity.class);
        DonorEntity savedDonor = donorRepository.save(donorEntity);
        return modelMapper.map(savedDonor, DonorDTO.class);
    }

    @Override
    public DonorDTO getDonorById(String id) {
        DonorEntity donorEntity = donorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Donor not found with id " + id));
        donorEntity.setPassword(null);
        DonorDTO donor = modelMapper.map(donorEntity, DonorDTO.class);
        donor.setRole(AppConstants.DONOR);
        donor.setPassword(null);
        return donor;
    }

    @Override
    public List<DonorDTO> getAllDonors() {
        List<DonorEntity> donorEntities = donorRepository.findAll();
        return donorEntities.stream()
                .map(donorEntity -> modelMapper.map(donorEntity, DonorDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public DonorDTO updateDonor(String id, DonorDTO donorDTO) {
        DonorEntity existingDonor = donorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Donor not found with id " + id));

        modelMapper.map(donorDTO, existingDonor);

        DonorEntity updatedDonor = donorRepository.save(existingDonor);
        return modelMapper.map(updatedDonor, DonorDTO.class);
    }

    @Override
    public void deleteDonor(String id) {
        if (!donorRepository.existsById(id)) {
            throw new ResourceNotFoundException("Donor not found with id " + id);
        }
        donorRepository.deleteById(id);
    }

    @Override
    public DonorDTO login(DonorDTO donorDto) throws ResourceNotFoundException {
        DonorEntity donorEntity = donorRepository.findByEmail(donorDto.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Donor not found with email: " + donorDto.getEmail()));

        if (donorDto.getPassword().equals(donorEntity.getPassword())) {
            donorEntity.setPassword(null);
            DonorDTO donor = modelMapper.map(donorEntity, DonorDTO.class);
            donor.setRole(AppConstants.DONOR);
            donor.setPassword(null);
            return donor;
        } else {
            throw new ResourceNotFoundException("Invalid credentials");
        }
    }

}
