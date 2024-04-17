package com.example.driveease;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class DriveeaseApplication {

	public static void main(String[] args) {
		SpringApplication.run(DriveeaseApplication.class, args);
	}
	@GetMapping("/hello")
	public String getMessage(Model model){
		return "Hello World";
	}
}
