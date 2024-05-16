package com.example.cinemaservice.services.movieSchedule;

import com.example.cinemaservice.entities.MovieSchedule;

import java.util.Collection;

public interface MovieScheduleServiceInterface {
    Collection<MovieSchedule> getMovieSchedulesForCinemaHall(int cinemaHallId);
    MovieSchedule getMovieSchedule(int id);
    MovieSchedule createMovieSchedule(int cinemaHallId, MovieSchedule movieSchedule);
    boolean updateMovieSchedule(int id, MovieSchedule movieSchedule);
    boolean deleteMovieSchedule(int id);

}
