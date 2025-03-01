package com.fundraiseplatform.repository;

import com.fundraiseplatform.entity.PaymentEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends MongoRepository<PaymentEntity, String> {
}
