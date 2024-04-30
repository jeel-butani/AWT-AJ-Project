package com.example.driveease.controllers;

import com.example.driveease.beans.Bike;
import com.example.driveease.repositories.BikeRepository;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bikes")
public class BikeController {

    @Autowired
    BikeRepository bikeRepository;

    @PostMapping("/")
    public ResponseEntity<Bike> createBike(@RequestBody Bike bike) {
        Bike savedBike = bikeRepository.save(bike);
        return new ResponseEntity<>(savedBike, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<Bike>> getAllBikes() {
        List<Bike> bikes = bikeRepository.findAll();
        return new ResponseEntity<>(bikes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bike> getBikeById(@PathVariable("id") ObjectId id) {
        Optional<Bike> optionalBike = bikeRepository.findById(id);
        return optionalBike.map(bike -> new ResponseEntity<>(bike, HttpStatus.OK))
                          .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bike> updateBike(@PathVariable("id") ObjectId id, @RequestBody Bike bike) {
        Optional<Bike> optionalBike = bikeRepository.findById(id);
        if (optionalBike.isPresent()) {
            bike.setId(id);
            Bike updatedBike = bikeRepository.save(bike);
            return new ResponseEntity<>(updatedBike, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteBike(@PathVariable("id") ObjectId id) {
        try {
            bikeRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Bike>> searchBikesByName(@RequestParam("name") String name) {
        List<Bike> bikes = bikeRepository.findByBikeName(name);
        if (bikes.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(bikes, HttpStatus.OK);
        }
    }

    @GetMapping("/fuel/{fuelType}")
    public ResponseEntity<List<Bike>> getBikesByFuelType(@PathVariable String fuelType) {
        List<Bike> bikes = bikeRepository.findByFuel(fuelType);
        return new ResponseEntity<>(bikes, HttpStatus.OK);
    }

    @GetMapping("/company/{companyName}")
    public ResponseEntity<List<Bike>> getBikesByCompanyName(@PathVariable String companyName) {
        List<Bike> bikes = bikeRepository.findByCompanyName(companyName);
        return new ResponseEntity<>(bikes, HttpStatus.OK);
    }

    @GetMapping("/amount/less/{amount}")
    public ResponseEntity<List<Bike>> getBikesByAmountLessThan(@PathVariable double amount) {
        List<Bike> bikes = bikeRepository.findByAmountLessThan(amount);
        return new ResponseEntity<>(bikes, HttpStatus.OK);
    }

    @GetMapping("/available/count/greater/{count}")
    public ResponseEntity<List<Bike>> getBikesByAvailableCountGreaterThan(@PathVariable int count) {
        List<Bike> bikes = bikeRepository.findByAvailableCountGreaterThan(count);
        return new ResponseEntity<>(bikes, HttpStatus.OK);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Bike>> getBikesByType(@PathVariable String type) {
        List<Bike> bikes = bikeRepository.findByType(type);
        return new ResponseEntity<>(bikes, HttpStatus.OK);
    }

    @GetMapping("/available/count/{id}")
    public ResponseEntity<Integer> getAvailableCountById(@PathVariable String id) {
        ObjectId objectId;
        try {
            objectId = new ObjectId(id);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        int availableCount = bikeRepository.findByAvailableCount(objectId);
        return new ResponseEntity<>(availableCount, HttpStatus.OK);
    }

    @GetMapping("/lastInsertedId")
    public ResponseEntity<String> getLastInsertedBikeId() {
        List<Bike> allBikes = bikeRepository.findAll();
        if (!allBikes.isEmpty()) {
            Bike lastBike = allBikes.get(allBikes.size() - 1);
            String lastInsertedId = lastBike.getId().toHexString();
            return new ResponseEntity<>(lastInsertedId, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No bikes found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getCarCount() {
        long count = bikeRepository.count();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
}
 