package com.example.cinemaservice.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Time;
import java.time.Duration;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MovieSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JsonIgnoreProperties("schedules")
    private CinemaHall hall;

    @Column(nullable = false)
    private int movieId;

    @Column(nullable = false)
    private Date startDate;

    @Column(nullable = false)
    private Date endDate;

    @Column(nullable = false)
    private int duration;

    @ElementCollection
    @CollectionTable(name = "start_times", joinColumns = @JoinColumn(name = "schedule_id"))
    @Column(name = "start_time")
    private Collection<LocalTime> startTimes = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "days_of_week", joinColumns = @JoinColumn(name = "schedule_id"))
    @Column(name = "day_of_week")
    private Collection<Integer> daysOfWeek = new ArrayList<>();
}
