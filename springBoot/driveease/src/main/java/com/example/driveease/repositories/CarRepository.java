package com.example.driveease.repositories;

import com.example.driveease.beans.Car;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository extends MongoRepository<Car, ObjectId> {
    List<Car> findByCarName(String carName);
    Optional<Car> findById(String string);
}