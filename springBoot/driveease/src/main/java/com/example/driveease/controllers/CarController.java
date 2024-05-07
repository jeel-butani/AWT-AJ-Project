
package com.example.driveease.controllers;

import com.example.driveease.beans.Car;
import com.example.driveease.repositories.CarRepository;

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
@RequestMapping("/api/cars")
@CrossOrigin(origins = "http://localhost:5173")
public class CarController {

    @Autowired
    CarRepository carRepository;

    @PostMapping("/")
    public ResponseEntity<Map<String, Object>> createCar(@RequestBody Car car) {
        Car savedCar = carRepository.save(car);
        Map<String, Object> response = new HashMap<>();
        response.put("car", savedCar);
        response.put("hexId", savedCar.getId().toHexString());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<Map<String, List<Map<String, Object>>>> getAllCars() {
        List<Car> cars = carRepository.findAll();
        List<Map<String, Object>> responseList = new ArrayList<>();
        for (Car car : cars) {
            Map<String, Object> carMap = new HashMap<>();
            carMap.put("car", car);
            carMap.put("hexId", car.getId().toHexString());
            responseList.add(carMap);
        }
        Map<String, List<Map<String, Object>>> responseBody = new HashMap<>();
        responseBody.put("cars", responseList);
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getCarById(@PathVariable("id") ObjectId id) {
        Optional<Car> optionalCar = carRepository.findById(id);
        if (optionalCar.isPresent()) {
            Car car = optionalCar.get();
            Map<String, Object> carResponse = new HashMap<>();
            carResponse.put("car", car);
            carResponse.put("hexId", car.getId().toHexString());
            return new ResponseEntity<>(carResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable("id") ObjectId id, @RequestBody Car car) {
        Optional<Car> optionalCar = carRepository.findById(id);
        if (optionalCar.isPresent()) {
            car.setId(id);
            Car updatedCar = carRepository.save(car);
            return new ResponseEntity<>(updatedCar, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteCar(@PathVariable("id") ObjectId id) {
        try {
            carRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Car>> searchCarsByName(@RequestParam("name") String name) {
        List<Car> cars = carRepository.findByCarName(name);
        if (cars.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(cars, HttpStatus.OK);
        }
    }

    @GetMapping("/fuel/{fuelType}")
    public ResponseEntity<Map<String, List<Map<String, Object>>>> getCarsByFuelType(@PathVariable String fuelType) {
        List<Car> cars = carRepository.findByFuelType(fuelType);
        List<Map<String, Object>> responseList = new ArrayList<>();
        for (Car car : cars) {
            Map<String, Object> carResponse = new HashMap<>();
            carResponse.put("car", car);
            carResponse.put("hexId", car.getId().toHexString());
            responseList.add(carResponse);
        }
        Map<String, List<Map<String, Object>>> responseBody = new HashMap<>();
        responseBody.put("cars", responseList);
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }

    @GetMapping("/transmission/{transmissionType}")
    public ResponseEntity<Map<String, List<Map<String, Object>>>> getCarsByTransmissionType(
            @PathVariable String transmissionType) {
        List<Car> cars = carRepository.findByTransmissionType(transmissionType);
        List<Map<String, Object>> responseList = new ArrayList<>();
        for (Car car : cars) {
            Map<String, Object> carResponse = new HashMap<>();
            carResponse.put("car", car);
            carResponse.put("hexId", car.getId().toHexString());
            responseList.add(carResponse);
        }
        Map<String, List<Map<String, Object>>> responseBody = new HashMap<>();
        responseBody.put("cars", responseList);
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }

    @GetMapping("/company/{companyName}")
    public ResponseEntity<Map<String, List<Map<String, Object>>>> getCarsByCompanyName(
            @PathVariable String companyName) {
        List<Car> cars = carRepository.findByCompanyName(companyName);
        List<Map<String, Object>> responseList = new ArrayList<>();
        for (Car car : cars) {
            Map<String, Object> carResponse = new HashMap<>();
            carResponse.put("car", car);
            carResponse.put("hexId", car.getId().toHexString());
            responseList.add(carResponse);
        }
        Map<String, List<Map<String, Object>>> responseBody = new HashMap<>();
        responseBody.put("cars", responseList);
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }

    @GetMapping("/amount/less/{amount}")
    public ResponseEntity<Map<String, List<Map<String, Object>>>> getCarsByAmountLessThan(@PathVariable double amount) {
        List<Car> cars = carRepository.findByAmountLessThan(amount);
        List<Map<String, Object>> responseList = new ArrayList<>();
        for (Car car : cars) {
            Map<String, Object> carResponse = new HashMap<>();
            carResponse.put("car", car);
            carResponse.put("hexId", car.getId().toHexString());
            responseList.add(carResponse);
        }
        Map<String, List<Map<String, Object>>> responseBody = new HashMap<>();
        responseBody.put("cars", responseList);
        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }

    @GetMapping("/available/count/greater/{count}")
    public ResponseEntity<Map<String, List<Map<String, Object>>>> getCarsByAvailableCountGreaterThan(
            @PathVariable int count) {
        List<Car> cars = carRepository.findByAvailableCountGreaterThan(count);
        List<Map<String, Object>> responseList = new ArrayList<>();
        for (Car car : cars) {
            Map<String, Object> carResponse = new HashMap<>();
            carResponse.put("car", car);
            carResponse.put("hexId", car.getId().toHexString());
            responseList.add(carResponse);
        }
        Map<String, List<Map<String, Object>>> responseBody = new HashMap<>();
        responseBody.put("cars", responseList);
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
        int availableCount = carRepository.findByAvailableCount(objectId);
        return new ResponseEntity<>(availableCount, HttpStatus.OK);
    }

    @GetMapping("/lastInsertedId")
    public ResponseEntity<String> getLastInsertedId() {
        List<Car> allCars = carRepository.findAll();
        if (!allCars.isEmpty()) {
            Car lastCar = allCars.get(allCars.size() - 1);
            String lastInsertedId = lastCar.getId().toHexString();
            return new ResponseEntity<>(lastInsertedId, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No cars found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getCarCount() {
        long count = carRepository.count();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @PutMapping("/{id}/reduceCount")
    public ResponseEntity<?> reduceAvailableCountById(@PathVariable("id") ObjectId id) {
        Optional<Car> optionalCar = carRepository.findById(id);
        if (optionalCar.isPresent()) {  
            Car car = optionalCar.get();
            int currentAvailableCount = Integer.parseInt(car.getAvailableCount());
            if (currentAvailableCount > 0) {
                car.setAvailableCount(String.valueOf(currentAvailableCount - 1));
                carRepository.save(car);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>("No available cars left for this ID", HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("Car not found", HttpStatus.NOT_FOUND);
        }
    }
}
