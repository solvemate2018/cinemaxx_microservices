package com.example.cinemaservice.services.cinemaHall;

import com.example.cinemaservice.dtos.CreateCinemaHallDTO;
import com.example.cinemaservice.entities.CinemaHall;
import com.example.cinemaservice.entities.MovieSchedule;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.Collection;

public interface CinemaHallServiceInterface {
    Collection<CinemaHall> getCinemaHallsByCinemaId(int cinemaId);
    CinemaHall getCinemaHall(int id);
    CinemaHall createCinemaHall(int cinemaId, CreateCinemaHallDTO cinemaHall);
    boolean updateCinemaHall(int cinemaHallId, CreateCinemaHallDTO cinemaHall);
    boolean deleteCinemaHall(int cinemaHallId) throws JsonProcessingException;
    MovieSchedule addMovieSchedule(int cinemaHallId, MovieSchedule movieSchedule);
}
