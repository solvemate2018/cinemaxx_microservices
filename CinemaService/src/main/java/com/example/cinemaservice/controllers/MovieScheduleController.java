package com.example.cinemaservice.controllers;

import com.example.cinemaservice.dtos.CreateMovieScheduleDTO;
import com.example.cinemaservice.entities.MovieSchedule;
import com.example.cinemaservice.services.movieSchedule.MovieScheduleService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
public class MovieScheduleController {
    private static final Logger log = LogManager.getLogger(HallController.class);
    private final MovieScheduleService movieScheduleService;

    public MovieScheduleController(MovieScheduleService movieScheduleService) {
        this.movieScheduleService = movieScheduleService;
    }

    //Used by admin and user to get schedules and pick projections
    @GetMapping("/halls/{hallId}/schedules")
    public ResponseEntity<Collection<MovieSchedule>> getSchedulesByHallId(@PathVariable int hallId) {
        log.info("getSchedulesByHallId {}", hallId);
        return new ResponseEntity<>(movieScheduleService.getMovieSchedulesForCinemaHall(hallId), HttpStatus.OK);
    }

    //Used to get details about schedule maybe used in projection details
    @GetMapping("/schedules/{scheduleId}")
    public ResponseEntity<MovieSchedule> getScheduleDetails(@PathVariable int scheduleId){
        log.info("getScheduleDetails {}", scheduleId);
        return new ResponseEntity<>(movieScheduleService.getMovieSchedule(scheduleId), HttpStatus.OK);
    }

    //Admin endpoint (Needs to  announce it to have projectionService create projections
    @PostMapping("/halls/{hallId}/schedules")
    public ResponseEntity<MovieSchedule> createSchedule(@PathVariable int hallId, @RequestBody CreateMovieScheduleDTO schedule) throws JsonProcessingException {
        log.info("createSchedule {}", schedule);
        return new ResponseEntity<>(movieScheduleService.createMovieSchedule(hallId, schedule), HttpStatus.CREATED);
    }

    //Admin endpoint (Needs to announce it to change projection service)
    @PutMapping("/schedules/{scheduleId}")
    public ResponseEntity<Void> updateSchedule(@PathVariable int scheduleId, @RequestBody CreateMovieScheduleDTO schedule) throws JsonProcessingException {
        log.info("updateSchedule {}", schedule);
        movieScheduleService.updateMovieSchedule(scheduleId, schedule);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //Admin endpoint (Needs to announce it to change projection service)
    @DeleteMapping("/schedules/{scheduleId}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable int scheduleId) throws JsonProcessingException {
        log.info("deleteSchedule {}", scheduleId);
        movieScheduleService.deleteMovieSchedule(scheduleId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
