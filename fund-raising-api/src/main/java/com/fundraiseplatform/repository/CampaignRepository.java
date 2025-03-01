package com.fundraiseplatform.repository;


import com.fundraiseplatform.entity.CampaignEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CampaignRepository extends MongoRepository<CampaignEntity, String> {
    List<CampaignEntity> findAllByUserId(String userId);

    List<CampaignEntity> findByExpiryDate(LocalDate currentDate);

    List<CampaignEntity> findByExpiryDateBeforeOrExpiryDateEquals(LocalDate currentDate, LocalDate currentDate1);
}
