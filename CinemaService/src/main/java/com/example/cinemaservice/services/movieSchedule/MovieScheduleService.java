package com.example.cinemaservice.services.movieSchedule;

import com.example.cinemaservice.entities.CinemaHall;
import com.example.cinemaservice.entities.MovieSchedule;
import com.example.cinemaservice.repositories.MovieScheduleRepository;
import com.example.cinemaservice.services.cinemaHall.CinemaHallService;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class MovieScheduleService implements MovieScheduleServiceInterface {
    private final MovieScheduleRepository movieScheduleRepository;
    private final CinemaHallService cinemaHallService;

    public MovieScheduleService(MovieScheduleRepository movieScheduleRepository, CinemaHallService cinemaHallService) {
        this.movieScheduleRepository = movieScheduleRepository;
        this.cinemaHallService = cinemaHallService;
    }

    @Override
    public Collection<MovieSchedule> getMovieSchedulesForCinemaHall(int cinemaHallId) {
        return movieScheduleRepository.findByHall_Id(cinemaHallId);
    }

    @Override
    public MovieSchedule getMovieSchedule(int id) {
        return movieScheduleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("There is no such schedule in our system!"));
    }

    @Override
    public MovieSchedule createMovieSchedule(int cinemaHallId, MovieSchedule movieSchedule) {
        MovieSchedule schedule = new MovieSchedule();
        schedule.setMovieId(movieSchedule.getMovieId());
        schedule.setDuration(movieSchedule.getDuration());
        schedule.setStartDate(movieSchedule.getStartDate());
        schedule.setEndDate(movieSchedule.getEndDate());
        schedule.setStartTimes(movieSchedule.getStartTimes());
        schedule.setDaysOfWeek(movieSchedule.getDaysOfWeek());
        return cinemaHallService.addMovieSchedule(cinemaHallId, schedule);
    }

    @Override
    public boolean updateMovieSchedule(int id, MovieSchedule movieSchedule) {
        MovieSchedule _dbMovieSchedule = movieScheduleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("There is no such cinema in our system!"));

        try{
            _dbMovieSchedule.setMovieId(movieSchedule.getMovieId());
            _dbMovieSchedule.setDuration(movieSchedule.getDuration());
            _dbMovieSchedule.setStartDate(movieSchedule.getStartDate());
            _dbMovieSchedule.setEndDate(movieSchedule.getEndDate());
            _dbMovieSchedule.setStartTimes(movieSchedule.getStartTimes());
            _dbMovieSchedule.setDaysOfWeek(movieSchedule.getDaysOfWeek());
            movieScheduleRepository.save(_dbMovieSchedule);
            return true;
        }
        catch (Exception exception){
            return false;
        }
    }

    @Override
    public boolean deleteMovieSchedule(int id) {
        try {
            movieScheduleRepository.deleteById(id);
            return true;
        }
        catch (Exception exception){
            return false;
        }
    }
}
