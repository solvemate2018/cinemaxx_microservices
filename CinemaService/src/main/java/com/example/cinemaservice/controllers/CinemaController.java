package com.example.cinemaservice.controllers;

import com.example.cinemaservice.dtos.CreateCinemaDTO;
import com.example.cinemaservice.entities.Cinema;
import com.example.cinemaservice.services.cinema.CinemaService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.xml.bind.ValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.Collection;

@RestController
@RequestMapping("/cinemas")
public class CinemaController {
    private static final Logger log = LogManager.getLogger(CinemaController.class);
    private final CinemaService cinemaService;

    public CinemaController(CinemaService cinemaService) {
        this.cinemaService = cinemaService;
    }

    //User can select cinema to close to him
    @GetMapping
    public ResponseEntity<Collection<Cinema>> getAllCinemas(){
        log.info("getAllCinemas");
        return new ResponseEntity<>(cinemaService.getAllCinemas(), HttpStatus.OK);
    }

    //Admin endpoint
    @GetMapping("/{cinemaId}")
    public ResponseEntity<Cinema> getCinemaDetails(@PathVariable int cinemaId){
        log.info("getCinemaDetails cinemaId: {}", cinemaId);
        return new ResponseEntity<>(cinemaService.getCinemaById(cinemaId), HttpStatus.OK);
    }

    //Admin endpoint
    @PostMapping
    public ResponseEntity<Cinema> createCinema(@RequestBody CreateCinemaDTO cinema) throws ValidationException {
        log.info("createCinema cinema: {}", cinema);
        return new ResponseEntity<>(cinemaService.createCinema(cinema), HttpStatus.CREATED);
    }

    //Admin endpoint
    @PutMapping("/{cinemaId}")
    public ResponseEntity<Void> updateCinema(@PathVariable int cinemaId, @RequestBody CreateCinemaDTO cinema){
        log.info("updateCinema cinemaId: {} cinema: {}", cinemaId,  cinema);
        cinemaService.updateCinema(cinemaId, cinema);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //Admin endpoint (needs to cascade to other services that are connected) //Announcing by event
    @DeleteMapping("/{cinemaId}")
    public ResponseEntity<Void> deleteCinema(@PathVariable int cinemaId) throws JsonProcessingException {
        log.info("deleteCinema cinemaId: {}", cinemaId);
        cinemaService.deleteCinema(cinemaId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
