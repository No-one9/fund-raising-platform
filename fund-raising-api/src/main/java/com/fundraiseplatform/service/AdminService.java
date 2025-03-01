package com.fundraiseplatform.service;


import com.fundraiseplatform.dto.AdminDTO;

import java.util.List;

public interface AdminService {

    AdminDTO createAdmin(AdminDTO adminDTO);

    AdminDTO getAdminById(String id);

    List<AdminDTO> getAllAdmins();

    AdminDTO updateAdmin(String id, AdminDTO adminDTO);

    void deleteAdmin(String id);

    AdminDTO login(AdminDTO adminDto);
}
