package com.fundraiseplatform.service;


import com.fundraiseplatform.dto.DonorDTO;

import java.util.List;

public interface DonorService {

    DonorDTO createDonor(DonorDTO donorDTO);

    DonorDTO getDonorById(String id);

    List<DonorDTO> getAllDonors();

    DonorDTO updateDonor(String id, DonorDTO donorDTO);

    void deleteDonor(String id);

    DonorDTO login(DonorDTO donorDTO);
}
