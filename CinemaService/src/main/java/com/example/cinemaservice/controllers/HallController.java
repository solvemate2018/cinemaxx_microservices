package com.example.cinemaservice.controllers;

import com.example.cinemaservice.dtos.CreateCinemaHallDTO;
import com.example.cinemaservice.entities.CinemaHall;
import com.example.cinemaservice.services.cinemaHall.CinemaHallService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
public class HallController {
    private static final Logger log = LogManager.getLogger(HallController.class);
    private final CinemaHallService cinemaHallService;

    public HallController(CinemaHallService cinemaHallService) {
        this.cinemaHallService = cinemaHallService;
    }

    //Mainly for admin
    @GetMapping("/cinemas/{cinemaId}/halls")
    public ResponseEntity<Collection<CinemaHall>> getAllHallsByCinemaId(@PathVariable int cinemaId) {
        log.info("getAllHallsByCinemaId cinemaId: {}", cinemaId);
        return new ResponseEntity<>(cinemaHallService.getCinemaHallsByCinemaId(cinemaId), HttpStatus.OK);
    }

    //For user to see seats and projections there
    @GetMapping("/halls/{hallId}")
    public ResponseEntity<CinemaHall> getHallDetails(@PathVariable int hallId){
        log.info("getHallDetails hallId: {}", hallId);
        return new ResponseEntity<>(cinemaHallService.getCinemaHall(hallId), HttpStatus.OK);
    }

    //Admin endpoint
    @PostMapping("/cinemas/{cinemaId}/halls")
    public ResponseEntity<CinemaHall> createHall(@PathVariable int cinemaId, @RequestBody CreateCinemaHallDTO cinemaHall){
        log.info("createHall cinemaId: {}", cinemaId);
        return new ResponseEntity<>(cinemaHallService.createCinemaHall(cinemaId, cinemaHall), HttpStatus.CREATED);
    }

    //Admin endpoint used just for changing name of cinema hall
    @PutMapping("/halls/{hallId}")
    public ResponseEntity<Void> updateHall(@PathVariable int hallId, @RequestBody CreateCinemaHallDTO cinemaHall){
        log.info("updateHall hallId: {}", hallId);
        cinemaHallService.updateCinemaHall(hallId, cinemaHall);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //Admin Endpoint (Needs to announce that it was deleted)
    @DeleteMapping("/halls/{hallId}")
    public ResponseEntity<Void> deleteHall(@PathVariable int hallId) throws JsonProcessingException {
        log.info("deleteHall hallId: {}", hallId);
        cinemaHallService.deleteCinemaHall(hallId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
