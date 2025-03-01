package com.fundraiseplatform.repository;

import com.fundraiseplatform.entity.DonationEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DonationRepository extends MongoRepository<DonationEntity, String> {
    List<DonationEntity> findByCampaignId(String id);

    List<DonationEntity> findAllByCampaignId(String id);

    List<DonationEntity> findAllByDonorId(String donorId);
}
