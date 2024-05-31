package com.example.cinemaservice.dtos;

import com.example.cinemaservice.entities.CinemaHall;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateMovieScheduleDTO {
    private int movieId;

    private Date startDate;

    private Date endDate;

    private Collection<LocalTime> startTimes = new ArrayList<>();

    private Collection<Integer> daysOfWeek = new ArrayList<>();
}
