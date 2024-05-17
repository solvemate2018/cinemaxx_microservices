package com.example.cinemaservice.controllers;

import com.example.cinemaservice.entities.Cinema;
import com.example.cinemaservice.services.cinema.CinemaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/cinemas")
public class CinemaController {
    private final CinemaService cinemaService;

    public CinemaController(CinemaService cinemaService) {
        this.cinemaService = cinemaService;
    }

    //User can select cinema to close to him
    @GetMapping
    public ResponseEntity<Collection<Cinema>> getAllCinemas(){
        return new ResponseEntity<>(cinemaService.getAllCinemas(), HttpStatus.OK);
    }

    //Admin endpoint
    @GetMapping("/{cinemaId}")
    public ResponseEntity<Cinema> getCinemaDetails(@PathVariable int cinemaId){
        return new ResponseEntity<>(cinemaService.getCinemaById(cinemaId), HttpStatus.OK);
    }

    //Admin endpoint
    @PostMapping
    public ResponseEntity<Cinema> createCinema(@RequestBody Cinema cinema){
        return new ResponseEntity<>(cinemaService.createCinema(cinema), HttpStatus.CREATED);
    }

    //Admin endpoint
    @PutMapping("/{cinemaId}")
    public ResponseEntity<Void> updateCinema(@PathVariable int cinemaId, @RequestBody Cinema cinema){
        if(cinemaService.updateCinema(cinemaId, cinema)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    //Admin endpoint (needs to cascade to other services that are connected) //Announcing by event
    @DeleteMapping("/{cinemaId}")
    public ResponseEntity<Void> deleteCinema(@PathVariable int cinemaId){
        if(cinemaService.deleteCinema(cinemaId)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
