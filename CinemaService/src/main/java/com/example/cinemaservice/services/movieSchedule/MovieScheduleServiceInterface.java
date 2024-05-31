package com.example.cinemaservice.services.movieSchedule;

import com.example.cinemaservice.dtos.CreateMovieScheduleDTO;
import com.example.cinemaservice.entities.MovieSchedule;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.Collection;

public interface MovieScheduleServiceInterface {
    Collection<MovieSchedule> getMovieSchedulesForCinemaHall(int cinemaHallId);
    MovieSchedule getMovieSchedule(int id);
    MovieSchedule createMovieSchedule(int cinemaHallId, CreateMovieScheduleDTO movieSchedule) throws JsonProcessingException;
    boolean updateMovieSchedule(int id, CreateMovieScheduleDTO movieSchedule) throws JsonProcessingException;
    boolean deleteMovieSchedule(int id) throws JsonProcessingException;
    int deleteMovieSchedulesByMovieId(int movieId);
}
