package com.fundraiseplatform.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "campaigns")
public class CampaignEntity {

    @Id
    private String id;

    private String userId;

    private String title;

    private String description;

    private String categoryId;

    private double amountNeeded;

    private double amountRaised;

    private String startDate;
    private String expiryDate;

    private String statusId;

    private String photoUrl;
}
