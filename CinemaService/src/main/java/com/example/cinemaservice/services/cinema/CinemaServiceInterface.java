package com.example.cinemaservice.services.cinema;

import com.example.cinemaservice.dtos.CreateCinemaDTO;
import com.example.cinemaservice.entities.Cinema;
import com.example.cinemaservice.entities.CinemaHall;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.xml.bind.ValidationException;

import java.util.Collection;

public interface CinemaServiceInterface {
    Collection<Cinema> getAllCinemas();
    Cinema getCinemaById(int id);
    Cinema createCinema(CreateCinemaDTO cinema) throws ValidationException;
    boolean deleteCinema(int id) throws JsonProcessingException;
    boolean updateCinema(int id, CreateCinemaDTO cinema);
    CinemaHall addHallToCinema(int id, CinemaHall hall);
}
