package com.example.driveease.controllers;

import com.example.driveease.beans.Bike;
import com.example.driveease.repositories.BikeRepository;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/bikes")
@CrossOrigin(origins = "http://localhost:5173")
public class BikeController {

    @Autowired
    BikeRepository bikeRepository;

    @PostMapping("/")
    public ResponseEntity<Map<String, Object>> createBike(@RequestBody Bike bike) {
        Bike savedBike = bikeRepository.save(bike);
        Map<String, Object> response = new HashMap<>();
        response.put("bike", savedBike);
        response.put("hexId", savedBike.getId().toHexString());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<Map<String, List<Map<String, Object>>>> getAllBikes() {
        List<Bike> bikes = bikeRepository.findAll();
        List<Map<String, Object>> responseList = new ArrayList<>();
        for (Bike bike : bikes) {
            Map<String, Object> bikeMap = new HashMap<>();
            bikeMap.put("bike", bike);
            bikeMap.put("hexId", bike.getId().toHexString());
            responseList.add(bikeMap);
        }
        Map<String, List<Map<String, Object>>> responseBody = new HashMap<>();
        responseBody.put("bikes", responseList);
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getBikeById(@PathVariable("id") ObjectId id) {
        Optional<Bike> optionalBike = bikeRepository.findById(id);
        if (optionalBike.isPresent()) {
            Bike bike = optionalBike.get();
            Map<String, Object> bikeResponse = new HashMap<>();
            bikeResponse.put("bike", bike);
            bikeResponse.put("hexId", bike.getId().toHexString());
            return new ResponseEntity<>(bikeResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
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
    public ResponseEntity<Map<String, List<Map<String, Object>>>> getBikesByFuelType(@PathVariable String fuelType) {
        List<Bike> bikes = bikeRepository.findByFuel(fuelType);
        List<Map<String, Object>> responseList = new ArrayList<>();
        for (Bike bike : bikes) {
            Map<String, Object> bikeResponse = new HashMap<>();
            bikeResponse.put("bike", bike);
            bikeResponse.put("hexId", bike.getId().toHexString());
            responseList.add(bikeResponse);
        }
        Map<String, List<Map<String, Object>>> responseBody = new HashMap<>();
        responseBody.put("bikes", responseList);
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }

    @GetMapping("/company/{companyName}")
    public ResponseEntity<Map<String, List<Map<String, Object>>>> getBikesByCompanyName(@PathVariable String companyName) {
        List<Bike> bikes = bikeRepository.findByCompanyName(companyName);
        List<Map<String, Object>> responseList = new ArrayList<>();
        for (Bike bike : bikes) {
            Map<String, Object> bikeResponse = new HashMap<>();
            bikeResponse.put("bike", bike);
            bikeResponse.put("hexId", bike.getId().toHexString());
            responseList.add(bikeResponse);
        }
        Map<String, List<Map<String, Object>>> responseBody = new HashMap<>();
        responseBody.put("bikes", responseList);
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }

    @GetMapping("/amount/less/{amount}")
    public ResponseEntity<Map<String, List<Map<String, Object>>>> getBikesByAmountLessThan(@PathVariable double amount) {
        List<Bike> bikes = bikeRepository.findByAmountLessThan(amount);
        List<Map<String, Object>> responseList = new ArrayList<>();
        for (Bike bike : bikes) {
            Map<String, Object> bikeResponse = new HashMap<>();
            bikeResponse.put("bike", bike);
            bikeResponse.put("hexId", bike.getId().toHexString());
            responseList.add(bikeResponse);
        }
        Map<String, List<Map<String, Object>>> responseBody = new HashMap<>();
        responseBody.put("bikes", responseList);
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }

    @GetMapping("/available/count/greater/{count}")
    public ResponseEntity<Map<String, List<Map<String, Object>>>> getBikesByAvailableCountGreaterThan(@PathVariable int count) {
        List<Bike> bikes = bikeRepository.findByAvailableCountGreaterThan(count);
        List<Map<String, Object>> responseList = new ArrayList<>();
        for (Bike bike : bikes) {
            Map<String, Object> bikeResponse = new HashMap<>();
            bikeResponse.put("bike", bike);
            bikeResponse.put("hexId", bike.getId().toHexString());
            responseList.add(bikeResponse);
        }
        Map<String, List<Map<String, Object>>> responseBody = new HashMap<>();
        responseBody.put("bikes", responseList);
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<Map<String, List<Map<String, Object>>>> getBikesByType(@PathVariable String type) {
        List<Bike> bikes = bikeRepository.findByType(type);
        List<Map<String, Object>> responseList = new ArrayList<>();
        for (Bike bike : bikes) {
            Map<String, Object> bikeResponse = new HashMap<>();
            bikeResponse.put("bike", bike);
            bikeResponse.put("hexId", bike.getId().toHexString());
            responseList.add(bikeResponse);
        }
        Map<String, List<Map<String, Object>>> responseBody = new HashMap<>();
        responseBody.put("bikes", responseList);
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
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
    public ResponseEntity<Long> getBikeCount() {
        long count = bikeRepository.count();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
}
