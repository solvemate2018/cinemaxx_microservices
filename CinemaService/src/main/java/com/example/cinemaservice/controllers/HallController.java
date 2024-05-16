package com.example.cinemaservice.controllers;

import com.example.cinemaservice.dtos.CreateCinemaHallDTO;
import com.example.cinemaservice.entities.CinemaHall;
import com.example.cinemaservice.services.cinemaHall.CinemaHallService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/cinemas")
public class HallController {
    private final CinemaHallService cinemaHallService;

    public HallController(CinemaHallService cinemaHallService) {
        this.cinemaHallService = cinemaHallService;
    }

    @GetMapping("/{cinemaId}/halls")
    public ResponseEntity<Collection<CinemaHall>> getAllHallsByCinemaId(@PathVariable int cinemaId) {
        return new ResponseEntity<>(cinemaHallService.getCinemaHallsByCinemaId(cinemaId), HttpStatus.OK);
    }

    @GetMapping("/{cinemaId}/halls/{hallId}")
    public ResponseEntity<CinemaHall> getHallDetails(@PathVariable int cinemaId, @PathVariable int hallId){
        return new ResponseEntity<>(cinemaHallService.getCinemaHall(hallId), HttpStatus.OK);
    }

    @PostMapping("/{cinemaId}/halls")
    public ResponseEntity<CinemaHall> createHall(@PathVariable int cinemaId, @RequestBody CreateCinemaHallDTO cinemaHall){
        return new ResponseEntity<>(cinemaHallService.createCinemaHall(cinemaId, cinemaHall), HttpStatus.CREATED);
    }

    @PutMapping("/{cinemaId}/halls/{hallId}")
    public ResponseEntity<Void> updateHall(@PathVariable int cinemaId, @PathVariable int hallId, @RequestBody CreateCinemaHallDTO cinemaHall){
        if(cinemaHallService.updateCinemaHall(hallId, cinemaHall)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/{cinemaId}/halls/{hallId}")
    public ResponseEntity<Void> deleteHall(@PathVariable int cinemaId, @PathVariable int hallId){
        if(cinemaHallService.deleteCinemaHall(hallId)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
