package com.example.cinemaservice.services.cinemaHall;

import com.example.cinemaservice.dtos.CreateCinemaHallDTO;
import com.example.cinemaservice.entities.CinemaHall;
import com.example.cinemaservice.entities.MovieSchedule;
import com.example.cinemaservice.entities.ValidationResult;
import com.example.cinemaservice.integration.rabbitmq.RabbitMqProducer;
import com.example.cinemaservice.repositories.CinemaHallRepository;
import com.example.cinemaservice.services.cinema.CinemaService;
import com.example.cinemaservice.services.validator.ValidationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class CinemaHallService implements CinemaHallServiceInterface {
    private final CinemaHallRepository cinemaHallRepository;
    private final CinemaService cinemaService;
    private final RabbitMqProducer mqProducer;
    private final ValidationService validationService;

    public CinemaHallService(CinemaHallRepository cinemaHallRepository, CinemaService cinemaService, RabbitMqProducer mqProducer, ValidationService validationService) {
        this.cinemaHallRepository = cinemaHallRepository;
        this.cinemaService = cinemaService;
        this.mqProducer = mqProducer;
        this.validationService = validationService;
    }

    @Override
    public Collection<CinemaHall> getCinemaHallsByCinemaId(int cinemaId) {
        return cinemaHallRepository.findByCinema_Id(cinemaId);
    }

    @Override
    public CinemaHall getCinemaHall(int id) {
        return cinemaHallRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("There is no such hall in our system!"));
    }

    @Override
    public CinemaHall createCinemaHall(int cinemaId, CreateCinemaHallDTO cinemaHall) {
        CinemaHall hall = new CinemaHall(cinemaHall.getNumberOfSeats(), cinemaHall.getNumberOfRows());
        hall.setName(cinemaHall.getHallName());

        validationService.validateCinemaHall(hall);
        return cinemaService.addHallToCinema(cinemaId, hall);
    }

    @Override
    public boolean updateCinemaHall(int cinemaHallId, CreateCinemaHallDTO cinemaHall) {
        CinemaHall _dbCinemaHall = cinemaHallRepository.findById(cinemaHallId).orElseThrow(() -> new ResourceNotFoundException("There is no such cinema in our system!"));

        _dbCinemaHall.setName(cinemaHall.getHallName());
        cinemaHallRepository.save(_dbCinemaHall);
        return true;
    }

    @Override
    public boolean deleteCinemaHall(int cinemaHallId) throws JsonProcessingException {
        CinemaHall cinemaHall = cinemaHallRepository.findById(cinemaHallId).orElseThrow(() -> new ResourceNotFoundException("There is no such cinema hall in our system!"));
        mqProducer.deleteCinemaHall(cinemaHall);
        cinemaHallRepository.delete(cinemaHall);
        return true;
    }

    @Override
    public MovieSchedule addMovieSchedule(int cinemaHallId, MovieSchedule movieSchedule) {
        CinemaHall hall = getCinemaHall(cinemaHallId);
        validationService.validateMovieSchedule(movieSchedule);
        hall.addSchedule(movieSchedule);
        cinemaHallRepository.save(hall);
        return hall.getSchedules().stream().toList().get(hall.getSchedules().size() - 1);
    }
}
