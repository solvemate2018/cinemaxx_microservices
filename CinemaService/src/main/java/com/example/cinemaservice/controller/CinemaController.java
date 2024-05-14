package com.example.cinemaservice.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cinemas")
public class CinemaController {

    @GetMapping
    public async Task<ResponseEntity> getAllCinemas(){
        return new ResponseEntity<>();
    }

    @GetMapping("/{cinemaId}")
    public async Task<ResponseEntity> getCinemaDetails(@PathVariable cinemaId){
        return new ResponseEntity<>();
    }

    @PostMapping
    public async Task<ResponseEntity> createCinema(){
        return new ResponseEntity<>();
    }

    @PutMapping("/{cinemaId}")
    public async Task<ResponseEntity> updateCinema(@PathVariable cinemaId){
        return new ResponseEntity<>();
    }

    @DeleteMapping("/{cinemaId}")
    public async Task<ResponseEntity> deleteCinema(@PathVariable cinemaId){
        return new ResponseEntity<>();
    }
}
