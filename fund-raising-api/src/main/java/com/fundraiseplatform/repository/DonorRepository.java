package com.fundraiseplatform.repository;

import com.fundraiseplatform.entity.DonorEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DonorRepository extends MongoRepository<DonorEntity, String> {
    Optional<DonorEntity> findByEmail(String email);
}
