package com.fundraiseplatform.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DonationDTO {
    private String id;
    private String donorId;
    private String donorName;
    private String campaignId;
    private double amount;
    private String date;
    private String status;

    private PaymentDTO paymentData;
    private CampaignDTO campaignData;
}
