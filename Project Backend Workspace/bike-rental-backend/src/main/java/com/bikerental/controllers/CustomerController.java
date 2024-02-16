package com.bikerental.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bikerental.entities.Customer;
import com.bikerental.models.LoginDTO;
import com.bikerental.services.CustomerService;

@CrossOrigin
@RestController
@RequestMapping("/api/customers")
public class CustomerController {

@Autowired CustomerService customerService;

@Autowired
JavaMailSender javaMailSender;
	@PostMapping
	public ResponseEntity<?> save(@RequestBody Customer cust) {
		if(customerService.verifyUserId(cust.getUserid())) {
			return ResponseEntity.badRequest().body("Email already registered");
		}
		SimpleMailMessage sm = new SimpleMailMessage();
		sm.setFrom("patilrants@gmail.com");//input the sender email Id or read it from properties file
		sm.setTo(cust.getUserid());
		sm.setSubject("Register Successful");
		sm.setText("Dear "+cust.getUname() +",\n\n"
				+ "\t Your Registation is successful. Thank you for for registering in Bike Rental System....!!!\n\n"
				
				
				+ "regards, \n"+ "Team Bike Rental System");
		javaMailSender.send(sm);
		customerService.registerCustomer(cust);
		return ResponseEntity.ok("Customer registered successfully");
	}
	
	@GetMapping
	public ResponseEntity<?> findAllCustomers() {
		List<Customer> result = customerService.allCustomers();
		return ResponseEntity.ok(result);
	}
	
	@PostMapping("/validate")
	public ResponseEntity<?> validateUser(@RequestBody LoginDTO dto) {
		System.out.println(dto);
		Customer user=customerService.validate(dto.getUserid(),dto.getPwd());
		if(user!=null)
			return ResponseEntity.ok(user);
		else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	}
	
	@PostMapping("/update")
	public ResponseEntity<?> updateProfile(@RequestBody Customer cust) {
		customerService.updateProfile(cust);
		return ResponseEntity.status(HttpStatus.OK).build();
	}
}
