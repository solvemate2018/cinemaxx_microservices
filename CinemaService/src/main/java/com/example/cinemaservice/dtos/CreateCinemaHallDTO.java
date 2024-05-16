package com.example.cinemaservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateCinemaHallDTO {
    private String hallName;
    private int numberOfRows;
    private int numberOfSeats;
}
