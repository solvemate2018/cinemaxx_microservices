package com.example.cinemaservice.config;

import com.example.cinemaservice.entities.Cinema;
import com.example.cinemaservice.entities.CinemaHall;
import com.example.cinemaservice.entities.MovieSchedule;
import com.example.cinemaservice.repositories.CinemaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Component
public class DataSeeder implements CommandLineRunner {
    private final CinemaRepository cinemaRepository;

    public DataSeeder(CinemaRepository cinemaRepository) {
        this.cinemaRepository = cinemaRepository;
    }

    private static final String[] CINEMA_NAMES = {"Aarhus Movies", "Copenhagen Movies", "Aalborg Movies", "Odense Movies"};
    private static final String[] CINEMA_ADDRESSES = {"Skolegyden 99", "Nørremarksvej 93", "Kamperhoug 35", "Møllebakken 82"};
    private static final String[] HALL_NAMES = {"Hall A", "Hall B", "Hall C", "VIP Hall"};
    private static final int[] SCHEDULE_MOVIE_IDS = {4, 7, 12, 15};
    private static final LocalTime[] START_TIMES = {LocalTime.NOON, LocalTime.NOON.plusHours(2), LocalTime.NOON.plusHours(4), LocalTime.NOON.plusHours(6)};
    private static final int[] DAYS_OF_WEEK = {0, 1, 3, 5};
    private static final int[] DURATIONS = {115, 125, 104, 138};
    private static final Date[] START_DATES = {new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(3)), new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(10)), new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(3)), new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(10))};
    private static final Date[] END_DATES = {new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(10)), new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(19)), new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(23)), new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(43))};

    @Override
    public void run(String... args) throws Exception {
        seedCinemas();
    }

    private void seedCinemas() {
        for (int i = 0; i < CINEMA_NAMES.length; i++) {
            String cinemaName = CINEMA_NAMES[i];
            Optional<Cinema> existingCinema = cinemaRepository.findCinemaByName(cinemaName);

            if (existingCinema.isPresent()) {
                continue; // Cinema already exists, skip to next one
            }

            Cinema cinema = new Cinema();
            cinema.setName(CINEMA_NAMES[i]);
            cinema.setAddress(CINEMA_ADDRESSES[i]);
            for (int j = 0; j < HALL_NAMES.length; j++) {
                CinemaHall hall = new CinemaHall(j + i + 3, j + i + 2);
                hall.setName(HALL_NAMES[j]);
                cinema.addCinemaHall(hall);
                for (int k = 0; k < SCHEDULE_MOVIE_IDS.length; k++) {
                    MovieSchedule movieSchedule = new MovieSchedule();
                    movieSchedule.setMovieId(SCHEDULE_MOVIE_IDS[k]);
                    movieSchedule.setStartTimes(List.of(START_TIMES));
                    movieSchedule.setDaysOfWeek(Arrays.stream(DAYS_OF_WEEK).boxed().collect(Collectors.toList()));
                    movieSchedule.setDuration(DURATIONS[k]);
                    movieSchedule.setStartDate(START_DATES[k]);
                    movieSchedule.setEndDate(END_DATES[k]);
                    hall.addSchedule(movieSchedule);
                }
            }
            cinemaRepository.save(cinema);
        }
    }
}
