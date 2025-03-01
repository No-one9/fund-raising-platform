package com.fundraiseplatform.repository;


import com.fundraiseplatform.entity.CampaignCategoryEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CampaignCategoryRepository extends MongoRepository<CampaignCategoryEntity, String> {
}
