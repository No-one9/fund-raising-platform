package com.fundraiseplatform.service.impl;


import com.fundraiseplatform.dto.AdminDTO;
import com.fundraiseplatform.entity.AdminEntity;
import com.fundraiseplatform.exceptions.ResourceNotFoundException;
import com.fundraiseplatform.repository.AdminRepository;
import com.fundraiseplatform.securityconfig.AppConstants;
import com.fundraiseplatform.service.AdminService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;//

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public AdminDTO createAdmin(AdminDTO adminDTO) {
        AdminEntity adminEntity = modelMapper.map(adminDTO, AdminEntity.class);
        AdminEntity savedAdmin = adminRepository.save(adminEntity);
        return modelMapper.map(savedAdmin, AdminDTO.class);
    }

    @Override
    public AdminDTO getAdminById(String id) {
        AdminEntity adminEntity = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with " + id));
        adminEntity.setPassword(null);
        AdminDTO admin = modelMapper.map(adminEntity, AdminDTO.class);
        admin.setRole(AppConstants.ADMIN);
        admin.setPassword(null);
        return admin;
    }

    @Override
    public List<AdminDTO> getAllAdmins() {
        List<AdminEntity> adminEntities = adminRepository.findAll();
        return adminEntities.stream()
                .map(adminEntity -> modelMapper.map(adminEntity, AdminDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public AdminDTO updateAdmin(String id, AdminDTO adminDTO) {
        AdminEntity existingAdmin = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with " + id));

        modelMapper.map(adminDTO, existingAdmin);

        AdminEntity updatedAdmin = adminRepository.save(existingAdmin);
        return modelMapper.map(updatedAdmin, AdminDTO.class);
    }

    @Override
    public void deleteAdmin(String id) {
        if (!adminRepository.existsById(id)) {
            throw new ResourceNotFoundException("Admin not found with " + id);
        }
        adminRepository.deleteById(id);
    }

    @Override
    public AdminDTO login(AdminDTO adminDto) throws ResourceNotFoundException {
        AdminEntity adminEntity = adminRepository.findByEmail(adminDto.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with email: " + adminDto.getEmail()));

        if (adminDto.getPassword().equals(adminEntity.getPassword())) {
            adminEntity.setPassword(null);
            AdminDTO admin = modelMapper.map(adminEntity, AdminDTO.class);
            admin.setRole(AppConstants.ADMIN);
            admin.setPassword(null);
            return admin;
        } else {
            throw new ResourceNotFoundException("Invalid credentials");
        }
    }
}
