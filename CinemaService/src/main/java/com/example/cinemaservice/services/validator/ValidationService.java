package com.example.cinemaservice.services.validator;

import com.example.cinemaservice.entities.Cinema;
import com.example.cinemaservice.entities.CinemaHall;
import com.example.cinemaservice.entities.MovieSchedule;
import com.example.cinemaservice.entities.ValidationResult;
import jakarta.validation.ValidationException;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.time.ZoneId;

@Service
public class ValidationService implements ValidationServiceInterface {

    @Override
    public ValidationResult validateCinema(Cinema cinema) {
        ValidationResult validationResult = new ValidationResult();

        if (cinema == null) {
            validationResult.addError("Cinema object is null.");
            return validationResult;
        }

        if (!StringUtils.hasText(cinema.getName())) {
            validationResult.addError("Cinema name is required.");
        } else if (cinema.getName().length() > 20) {
            validationResult.addError("Cinema name must be at most 20 characters.");
        }

        if (!StringUtils.hasText(cinema.getAddress())) {
            validationResult.addError("Cinema address is required.");
        } else if (cinema.getAddress().length() > 30) {
            validationResult.addError("Cinema address must be at most 30 characters.");
        }

        if(validationResult.isValid()){
            return validationResult;
        }
        throw new ValidationException(validationResult.toString());
    }

    @Override
    public ValidationResult validateCinemaHall(CinemaHall cinemaHall) {
        ValidationResult validationResult = new ValidationResult();

        if (cinemaHall == null) {
            validationResult.addError("CinemaHall object is null.");
            return validationResult;
        }

        if (!StringUtils.hasText(cinemaHall.getName())) {
            validationResult.addError("CinemaHall name is required.");
        } else if (cinemaHall.getName().length() > 20) {
            validationResult.addError("CinemaHall name must be at most 20 characters.");
        }

        if (cinemaHall.getSeats().size() < 10) {
            validationResult.addError("CinemaHall must have at least 10 seats.");
        }

        if(validationResult.isValid()){
            return validationResult;
        }
        throw new ValidationException(validationResult.toString());
    }

    @Override
    public ValidationResult validateMovieSchedule(MovieSchedule movieSchedule) {
        ValidationResult validationResult = new ValidationResult();

        if (movieSchedule == null) {
            validationResult.addError("MovieSchedule object is null.");
            return validationResult;
        }

        LocalDate oneWeekFromNow = LocalDate.now().plusWeeks(1);

        if (movieSchedule.getStartDate() == null || movieSchedule.getEndDate() == null) {
            validationResult.addError("Start date and end date are required.");
        } else {
            LocalDate startDate = movieSchedule.getStartDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            LocalDate endDate = movieSchedule.getEndDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

            if (startDate.isBefore(oneWeekFromNow)) {
                validationResult.addError("Start date must be at least one week from now.");
            }

            if (endDate.isBefore(oneWeekFromNow)) {
                validationResult.addError("End date must be at least one week from now.");
            }

            if (startDate.isAfter(endDate)) {
                validationResult.addError("Start date must be before end date.");
            }
        }

        if (movieSchedule.getDuration() <= 0) {
            validationResult.addError("Duration must be a positive value.");
        }

        if (CollectionUtils.isEmpty(movieSchedule.getStartTimes())) {
            validationResult.addError("At least one start time must be provided.");
        }

        if (CollectionUtils.isEmpty(movieSchedule.getDaysOfWeek())) {
            validationResult.addError("At least one day of week must be provided.");
        } else {
            for (Integer day : movieSchedule.getDaysOfWeek()) {
                if (day < 0 || day > 6) {
                    validationResult.addError("Invalid day of week value. Must be between 0 and 6.");
                    break;
                }
            }
        }

        if(validationResult.isValid()){
            return validationResult;
        }
        throw new ValidationException(validationResult.toString());
    }

}
