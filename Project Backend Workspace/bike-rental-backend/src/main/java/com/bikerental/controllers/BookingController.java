package com.bikerental.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bikerental.models.BookingCompleteDTO;
import com.bikerental.models.BookingDTO;
import com.bikerental.models.BookingStatusDTO;
import com.bikerental.services.BookingService;

@CrossOrigin
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

	@Autowired private BookingService bservice;
	@Autowired
	JavaMailSender javaMailSender;
	@PostMapping
	public ResponseEntity<?> save(@RequestBody BookingDTO dto) {	
		SimpleMailMessage sm = new SimpleMailMessage();
		sm.setFrom("patilrants@gmail.com"); 
		sm.setTo(dto.getUserid());
		sm.setSubject("Bike_Booking Successfull ");
		sm.setText("Dear "+dto.getNameoncard()+",\n\n"
				+ "\t Your booking is successful. Thank you for choosing Bike rental System  to book your favrite dream Bike. Enjoy the Ride and  Wishing you a great day...!!!. Your Booking Details are as below. Please keep this for the future reference.\n\n"
				+ "Booking Dates        :"+dto.getFromdate()+"to"+dto.getTodate());
		javaMailSender.send(sm);
		bservice.saveBooking(dto);
		return ResponseEntity.ok("Booked successfully");
	}
	
	@PutMapping("{id}")
	public ResponseEntity<?> updateStatus(@PathVariable("id") int id,@RequestBody BookingStatusDTO dto) {
		dto.setBid(id);
		bservice.updateBooking(dto);
		return ResponseEntity.ok("Booking Confirmed");
	}
	
	@PutMapping("complete/{id}")
	public ResponseEntity<?> completeBooking(@PathVariable("id") int id,@RequestBody BookingCompleteDTO dto) {
		dto.setBid(id);
		bservice.completeBooking(dto);
		return ResponseEntity.ok("Booking Completed");
	}
	
	@GetMapping
	public ResponseEntity<?> findAll() {		
		return ResponseEntity.ok(bservice.findAllBookings());
	}
	
	@GetMapping("/users")
	public ResponseEntity<?> findCustomerBookings(String userid) {		
		return ResponseEntity.ok(bservice.findUserBookings(userid));
	}
	
	@GetMapping("/feedbacks")
	public ResponseEntity<?> allFeedbacks() {		
		return ResponseEntity.ok(bservice.allFeedbacks());
	}
	
	@GetMapping("/payments/{id}")
	public ResponseEntity<?> findAllPayments(@PathVariable("id") int id) {		
		return ResponseEntity.ok(bservice.findBookingPayments(id));
	}
	
	@GetMapping("/payments")
	public ResponseEntity<?> findallPayments() {		
		return ResponseEntity.ok(bservice.findAllPayments());
	}
	
	@GetMapping("{id}")
	public ResponseEntity<?> findById(@PathVariable("id") int id) {		
		return ResponseEntity.ok(bservice.findById(id));
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<?> deleteById(@PathVariable("id") int id) {
		bservice.cancelBooking(id);
		return ResponseEntity.ok("Booking cancelled successfully");
	}
}
