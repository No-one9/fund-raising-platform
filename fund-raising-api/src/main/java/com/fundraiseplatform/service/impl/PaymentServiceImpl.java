package com.fundraiseplatform.service.impl;


import com.fundraiseplatform.dto.PaymentDTO;
import com.fundraiseplatform.entity.PaymentEntity;
import com.fundraiseplatform.exceptions.ResourceNotFoundException;
import com.fundraiseplatform.repository.PaymentRepository;
import com.fundraiseplatform.service.PaymentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public PaymentDTO createPayment(PaymentDTO paymentDTO) {
        PaymentEntity paymentEntity = modelMapper.map(paymentDTO, PaymentEntity.class);
        PaymentEntity savedPayment = paymentRepository.save(paymentEntity);
        return modelMapper.map(savedPayment, PaymentDTO.class);
    }

    @Override
    public PaymentDTO getPaymentById(String id) {
        PaymentEntity paymentEntity = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with "+id));
        return modelMapper.map(paymentEntity, PaymentDTO.class);
    }

    @Override
    public List<PaymentDTO> getAllPayments() {
        List<PaymentEntity> paymentEntities = paymentRepository.findAll();
        return paymentEntities.stream()
                .map(paymentEntity -> modelMapper.map(paymentEntity, PaymentDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public PaymentDTO updatePayment(String id, PaymentDTO paymentDTO) {
        PaymentEntity existingPayment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with "+id));

        modelMapper.map(paymentDTO, existingPayment);

        PaymentEntity updatedPayment = paymentRepository.save(existingPayment);
        return modelMapper.map(updatedPayment, PaymentDTO.class);
    }

    @Override
    public void deletePayment(String id) {
        if (!paymentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Payment not found with "+id);
        }
        paymentRepository.deleteById(id);
    }
}
