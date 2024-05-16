package com.example.cinemaservice.services.seat;

import com.example.cinemaservice.entities.Seat;
import com.example.cinemaservice.repositories.SeatRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class SeatService implements SeatServiceInterface {
    private final SeatRepository seatRepository;

    public SeatService(SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    @Override
    public Collection<Seat> getSeatsForCinemaHall(int cinemaHallId) {
        return seatRepository.getSeatByHall_Id(cinemaHallId);
    }
}
