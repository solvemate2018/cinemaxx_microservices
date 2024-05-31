package com.example.cinemaservice.services.movieSchedule;

import com.example.cinemaservice.dtos.CreateMovieScheduleDTO;
import com.example.cinemaservice.entities.MovieSchedule;
import com.example.cinemaservice.integration.http.MoviesClient;
import com.example.cinemaservice.integration.rabbitmq.RabbitMqProducer;
import com.example.cinemaservice.repositories.MovieScheduleRepository;
import com.example.cinemaservice.services.cinemaHall.CinemaHallService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class MovieScheduleService implements MovieScheduleServiceInterface {
    private static final Logger log = LoggerFactory.getLogger(MovieScheduleService.class);
    private final MovieScheduleRepository movieScheduleRepository;
    private final CinemaHallService cinemaHallService;
    private final RabbitMqProducer mqProducer;
    private final MoviesClient moviesClient;

    public MovieScheduleService(MovieScheduleRepository movieScheduleRepository, CinemaHallService cinemaHallService, RabbitMqProducer mqProducer, MoviesClient moviesClient) {
        this.movieScheduleRepository = movieScheduleRepository;
        this.cinemaHallService = cinemaHallService;
        this.mqProducer = mqProducer;
        this.moviesClient = moviesClient;
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
    public MovieSchedule createMovieSchedule(int cinemaHallId, CreateMovieScheduleDTO movieSchedule) throws JsonProcessingException {
        var result = moviesClient.getMovieById(movieSchedule.getMovieId());
        if (result != null) {
            MovieSchedule schedule = new MovieSchedule();
            schedule.setMovieId(result.getId());
            schedule.setDuration(result.getDuration());
            schedule.setStartDate(movieSchedule.getStartDate());
            schedule.setEndDate(movieSchedule.getEndDate());
            schedule.setStartTimes(movieSchedule.getStartTimes());
            schedule.setDaysOfWeek(movieSchedule.getDaysOfWeek());
            var _dbSchedule = cinemaHallService.addMovieSchedule(cinemaHallId, schedule);
            mqProducer.createSchedule(_dbSchedule);
            return _dbSchedule;
        } else {
            throw new ResourceNotFoundException("There is no such movie in our system!");
        }
    }

    @Override
    public boolean updateMovieSchedule(int id, CreateMovieScheduleDTO movieSchedule) throws JsonProcessingException {
        MovieSchedule _dbMovieSchedule = movieScheduleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("There is no such schedule in our system!"));
        if (_dbMovieSchedule.getMovieId() != movieSchedule.getMovieId()) {
            var result = moviesClient.getMovieById(movieSchedule.getMovieId());

            if (result != null) {
                _dbMovieSchedule.setMovieId(result.getId());
                _dbMovieSchedule.setDuration(result.getDuration());
            } else {
                throw new ResourceNotFoundException("There is no such movie in our system!");
            }
        }

        _dbMovieSchedule.setStartDate(movieSchedule.getStartDate());
        _dbMovieSchedule.setEndDate(movieSchedule.getEndDate());
        _dbMovieSchedule.setStartTimes(movieSchedule.getStartTimes());
        _dbMovieSchedule.setDaysOfWeek(movieSchedule.getDaysOfWeek());


        movieScheduleRepository.save(_dbMovieSchedule);
        mqProducer.updateSchedule(_dbMovieSchedule);
        return true;
    }

    @Override
    public boolean deleteMovieSchedule(int id) throws JsonProcessingException {
        var _dbMovieSchedule = movieScheduleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("There is no such schedule in our system!"));
        mqProducer.deleteSchedule(_dbMovieSchedule);
        movieScheduleRepository.delete(_dbMovieSchedule);
        return true;
    }

    @Override
    public int deleteMovieSchedulesByMovieId(int movieId) {
        var _dbMovieSchedules = movieScheduleRepository.findAllByMovieId(movieId);
        var entitiesCount = _dbMovieSchedules.size();
        movieScheduleRepository.deleteAll(_dbMovieSchedules);
        return entitiesCount;
    }
}
