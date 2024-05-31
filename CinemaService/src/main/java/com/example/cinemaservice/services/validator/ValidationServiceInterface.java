package com.example.cinemaservice.services.validator;

import com.example.cinemaservice.entities.Cinema;
import com.example.cinemaservice.entities.CinemaHall;
import com.example.cinemaservice.entities.MovieSchedule;
import com.example.cinemaservice.entities.ValidationResult;

public interface ValidationServiceInterface {
    ValidationResult validateCinema(Cinema cinema);
    ValidationResult validateCinemaHall(CinemaHall cinemaHall);
    ValidationResult validateMovieSchedule(MovieSchedule movieSchedule);
}
