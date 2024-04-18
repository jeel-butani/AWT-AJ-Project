package com.example.driveease.beans;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "bikes")
public class Bike {
    @Id
    private ObjectId id;

    @NotBlank(message = "Bike name is mandatory")
    @Field(name = "bike_name")
    private String bikeName;

    @NotBlank(message = "Fuel type is mandatory")
    @Field(name = "fuel")
    private String fuel;

    @NotNull(message = "Number of seats is mandatory")
    @Field(name = "seats")
    private int seats;

    @NotBlank(message = "Registration number is mandatory")
    @Field(name = "registration_number")
    private String registrationNumber;

    @NotNull(message = "Amount is mandatory")
    @Field(name = "amount")
    private double amount;

    @NotBlank(message = "URL of bike image is mandatory")
    @Field(name = "image_url")
    private String imageUrl;

    @NotNull(message = "Total bike count is mandatory")
    @Field(name = "total_count")
    private int totalCount;

    @NotNull(message = "Available bike count is mandatory")
    @Field(name = "available_count")
    private int availableCount;

    @NotBlank(message = "Company name is mandatory")
    @Field(name = "company_name")
    private String companyName;

    @NotBlank(message = "Type is mandatory")
    @Field(name = "type")
    private String type;

    public Bike() {}

    public Bike(String bikeName, String fuel, int seats, String registrationNumber, double amount, String imageUrl, int totalCount, int availableCount, String companyName, String type) {
        this.bikeName = bikeName;
        this.fuel = fuel;
        this.seats = seats;
        this.registrationNumber = registrationNumber;
        this.amount = amount;
        this.imageUrl = imageUrl;
        this.totalCount = totalCount;
        this.availableCount = availableCount;
        this.companyName = companyName;
        this.type = type;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public ObjectId getId() {
        return id;
    }

    public void setBikeName(String bikeName) {
        this.bikeName = bikeName;
    }

    public String getBikeName() {
        return bikeName;
    }

    public void setFuel(String fuel) {
        this.fuel = fuel;
    }

    public String getFuel() {
        return fuel;
    }

    public void setSeats(int seats) {
        this.seats = seats;
    }

    public int getSeats() {
        return seats;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public double getAmount() {
        return amount;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setAvailableCount(int availableCount) {
        this.availableCount = availableCount;
    }

    public int getAvailableCount() {
        return availableCount;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
