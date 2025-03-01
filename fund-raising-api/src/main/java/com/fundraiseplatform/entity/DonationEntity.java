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
@Document(collection = "donations")
public class DonationEntity {

    @Id
    private String id;

    private String donorId;

    private String donorName;

    private String campaignId;

    private double amount;

    private String date;

    private String status;
}
