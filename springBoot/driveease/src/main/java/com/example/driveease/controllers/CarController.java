
package com.example.driveease.controllers;

import com.example.driveease.beans.Car;
import com.example.driveease.repositories.CarRepository;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    @Autowired
    CarRepository carRepository;

        @PostMapping("/")
        public ResponseEntity<Car> createCar(@RequestBody Car car) {
            Car savedCar = carRepository.save(car);
            return new ResponseEntity<>(savedCar, HttpStatus.CREATED);
        }

    @GetMapping("/")
    public ResponseEntity<List<Car>> getAllCars() {
        List<Car> cars = carRepository.findAll();
        return new ResponseEntity<>(cars, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable("id") ObjectId id) {
        Optional<Car> optionalCar = carRepository.findById(id);
        return optionalCar.map(car -> new ResponseEntity<>(car, HttpStatus.OK))
                          .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
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
    public ResponseEntity<List<Car>> getCarsByFuelType(@PathVariable String fuelType) {
        List<Car> cars = carRepository.findByFuelType(fuelType);
        return new ResponseEntity<>(cars, HttpStatus.OK);
    }

    @GetMapping("/transmission/{transmissionType}")
    public ResponseEntity<List<Car>> getCarsByTransmissionType(@PathVariable String transmissionType) {
        List<Car> cars = carRepository.findByTransmissionType(transmissionType);
        return new ResponseEntity<>(cars, HttpStatus.OK);
    }

    @GetMapping("/company/{companyName}")
    public ResponseEntity<List<Car>> getCarsByCompanyName(@PathVariable String companyName) {
        List<Car> cars = carRepository.findByCompanyName(companyName);
        return new ResponseEntity<>(cars, HttpStatus.OK);
    }

    @GetMapping("/amount/less/{amount}")
    public ResponseEntity<List<Car>> getCarsByAmountLessThan(@PathVariable double amount) {
        List<Car> cars = carRepository.findByAmountLessThan(amount);
        return new ResponseEntity<>(cars, HttpStatus.OK);
    }

    @GetMapping("/available/count/greater/{count}")
    public ResponseEntity<List<Car>> getCarsByAvailableCountGreaterThan(@PathVariable int count) {
        List<Car> cars = carRepository.findByAvailableCountGreaterThan(count);
        return new ResponseEntity<>(cars, HttpStatus.OK);
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
}
