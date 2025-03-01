package com.fundraiseplatform.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "donors")
public class DonorEntity {

    @Id
    private String id;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private String phone;
    private String address;
    private String city;
    private String state;
    private String zipcode;
    private String ssn;
}
