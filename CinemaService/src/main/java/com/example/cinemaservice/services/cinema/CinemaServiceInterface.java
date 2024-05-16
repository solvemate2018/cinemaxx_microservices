package com.example.cinemaservice.services.cinema;

import com.example.cinemaservice.entities.Cinema;
import com.example.cinemaservice.entities.CinemaHall;

import java.util.Collection;

public interface CinemaServiceInterface {
    Collection<Cinema> getAllCinemas();
    Cinema getCinemaById(int id);
    Cinema createCinema(Cinema cinema);
    boolean deleteCinema(int id);
    boolean updateCinema(int id, Cinema cinema);
    CinemaHall addHallToCinema(int id, CinemaHall hall);
}
