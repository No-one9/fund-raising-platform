package com.fundraiseplatform.repository;

import com.fundraiseplatform.entity.CampaignStatusEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CampaignStatusRepository extends MongoRepository<CampaignStatusEntity, String> {

    Optional<CampaignStatusEntity> findByStatusName(String closed);
}
