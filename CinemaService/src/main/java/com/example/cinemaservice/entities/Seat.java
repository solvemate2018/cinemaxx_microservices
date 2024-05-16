package com.example.cinemaservice.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, updatable = false)
    private int seatNumber;

    @Column(nullable = false, updatable = false, name = "row_char")
    private char row;

    @ManyToOne(fetch = FetchType.LAZY)
    private CinemaHall hall;

    public Seat(int seatNumber, char row, CinemaHall hall) {
        this.seatNumber = seatNumber;
        this.row = row;
        this.hall = hall;
    }
}
