package com.example.cinemaservice.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Collection;

@Entity
@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class CinemaHall {
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("cinemaHalls")
    private Cinema cinema;

    @OneToMany(mappedBy = "hall", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("hall")
    private Collection<Seat> seats = new ArrayList<>();

    @OneToMany(mappedBy = "hall", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("hall")
    private Collection<MovieSchedule> schedules = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 20)
    private String name;

    @Transient
    private transient int capacity;

    public int getCapacity() {
        return seats != null ? seats.size() : 0;
    }

    public CinemaHall(int numberOfSeats, int numberOfRows){
        //Creates all the seats for the cinemaHall
        for (int i = 1; i < numberOfRows + 1; i++) {
            for (int j = 0; j < numberOfSeats; j++) {
                seats.add(new Seat(i, (char) ('A' + j), this));
            }
        }
    }

    public void addSchedule(MovieSchedule schedule){
        schedules.add(schedule);
        schedule.setHall(this);
    }

    @Override
    public String toString() {
        return name;
    }
}
