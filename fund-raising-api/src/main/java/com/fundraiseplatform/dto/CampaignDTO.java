package com.fundraiseplatform.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CampaignDTO {
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
    private String statusName;
    private String categoryName;
    private MultipartFile campaignImage;
    private String photoUrl;
}
