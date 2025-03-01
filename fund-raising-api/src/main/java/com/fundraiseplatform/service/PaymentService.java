package com.fundraiseplatform.service;


import com.fundraiseplatform.dto.PaymentDTO;

import java.util.List;

public interface PaymentService {

    PaymentDTO createPayment(PaymentDTO paymentDTO);

    PaymentDTO getPaymentById(String id);

    List<PaymentDTO> getAllPayments();

    PaymentDTO updatePayment(String id, PaymentDTO paymentDTO);

    void deletePayment(String id);
}
