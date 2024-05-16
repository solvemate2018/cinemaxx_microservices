package com.example.cinemaservice.services.seat;


import com.example.cinemaservice.entities.Seat;

import java.util.Collection;

public interface SeatServiceInterface {
    Collection<Seat> getSeatsForCinemaHall(int cinemaHallId);
}
