package com.fundraiseplatform.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDTO {
    private String id;
    private String donorId;
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
