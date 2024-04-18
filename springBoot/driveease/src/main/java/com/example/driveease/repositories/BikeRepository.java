package com.example.driveease.repositories;

import com.example.driveease.beans.Bike;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BikeRepository extends MongoRepository<Bike, ObjectId> {
    List<Bike> findByBikeName(String bikeName);
    List<Bike> findByFuel(String fuel);
    List<Bike> findByCompanyName(String companyName);
    List<Bike> findByAmountLessThan(double amount);
    List<Bike> findByAvailableCountGreaterThan(int count);
    int findByAvailableCount(ObjectId id);
    List<Bike> findByType(String type);
}
