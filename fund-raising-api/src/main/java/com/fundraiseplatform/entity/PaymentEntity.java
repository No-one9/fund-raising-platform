package com.fundraiseplatform.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "payments")
public class PaymentEntity {

    @Id
    private String id;

    private String donorId;
    private String donationId;

    private String donorName;

    private double amount;

    private String method;

    private String campaignId;

    private String date;

    private String cardType;

    private String cardNumber;

    private String cardName;

    private int expiryMonth;

    private int expiryYear;

    private String cvv;
}
