package com.example.cinemaservice.controllers;

import com.example.cinemaservice.dtos.CreateCinemaHallDTO;
import com.example.cinemaservice.entities.CinemaHall;
import com.example.cinemaservice.entities.MovieSchedule;
import com.example.cinemaservice.services.movieSchedule.MovieScheduleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/cinemas/{cinemaId}/halls/{hallId}/schedules")
public class MovieScheduleController {
    private final MovieScheduleService movieScheduleService;

    public MovieScheduleController(MovieScheduleService movieScheduleService) {
        this.movieScheduleService = movieScheduleService;
    }

    //Used by admin and user to get schedules and pick projections
    @GetMapping("")
    public ResponseEntity<Collection<MovieSchedule>> getSchedulesByHallId(@PathVariable int cinemaId, @PathVariable int hallId) {
        return new ResponseEntity<>(movieScheduleService.getMovieSchedulesForCinemaHall(hallId), HttpStatus.OK);
    }

    //Used to get details about schedule maybe used in projection details
    @GetMapping("/{scheduleId}")
    public ResponseEntity<MovieSchedule> getScheduleDetails(@PathVariable int cinemaId, @PathVariable int hallId, @PathVariable int scheduleId){
        return new ResponseEntity<>(movieScheduleService.getMovieSchedule(scheduleId), HttpStatus.OK);
    }

    //Admin endpoint (Needs to announce it to have projection service create projections)
    @PostMapping("")
    public ResponseEntity<MovieSchedule> createSchedule(@PathVariable int cinemaId, @PathVariable int hallId, @RequestBody MovieSchedule schedule){
        return new ResponseEntity<>(movieScheduleService.createMovieSchedule(hallId, schedule), HttpStatus.CREATED);
    }

    //Admin endpoint (Needs to announce it to change projection service)
    @PutMapping("/{scheduleId}")
    public ResponseEntity<Void> updateSchedule(@PathVariable int cinemaId, @PathVariable int hallId, @PathVariable int scheduleId, @RequestBody MovieSchedule schedule){
        if(movieScheduleService.updateMovieSchedule(scheduleId, schedule)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    //Admin endpoint (Needs to announce it to change projection service)
    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable int cinemaId, @PathVariable int hallId, @PathVariable int scheduleId){
        if(movieScheduleService.deleteMovieSchedule(scheduleId)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
