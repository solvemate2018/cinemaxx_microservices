package com.example.cinemaservice.services.cinema;

import com.example.cinemaservice.dtos.CreateCinemaDTO;
import com.example.cinemaservice.entities.Cinema;
import com.example.cinemaservice.entities.CinemaHall;
import com.example.cinemaservice.entities.ValidationResult;
import com.example.cinemaservice.integration.rabbitmq.RabbitMqProducer;
import com.example.cinemaservice.repositories.CinemaRepository;
import com.example.cinemaservice.services.validator.ValidationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.xml.bind.ValidationException;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Collection;

@Service
public class CinemaService implements CinemaServiceInterface {
    private final CinemaRepository cinemaRepository;
    private final ValidationService validationService;
    private final RabbitMqProducer mqProducer;

    public CinemaService(CinemaRepository cinemaRepository, ValidationService validationService, RabbitMqProducer mqProducer) {
        this.cinemaRepository = cinemaRepository;
        this.validationService = validationService;
        this.mqProducer = mqProducer;
    }

    @Override
    public Collection<Cinema> getAllCinemas() {
        return cinemaRepository.findAll();
    }

    @Override
    public Cinema getCinemaById(int id) {
        return cinemaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("There is no such cinema in our system!"));
    }

    @Override
    public Cinema createCinema(CreateCinemaDTO cinema) throws ValidationException {
        Cinema cinemaObject = new Cinema();
        cinemaObject.setName(cinema.getName());
        cinemaObject.setAddress(cinema.getAddress());
        validationService.validateCinema(cinemaObject);
        return cinemaRepository.save(cinemaObject);
    }

    @Override
    public boolean deleteCinema(int id) throws JsonProcessingException {
            Cinema cinema = cinemaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("There is no such cinema in our system!"));
            mqProducer.deleteCinema(cinema);
            cinemaRepository.delete(cinema);
            return true;
    }

    @Override
    public boolean updateCinema(int id, CreateCinemaDTO cinema) {
        Cinema _dbCinema = cinemaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("There is no such cinema in our system!"));

        Cinema cinemaObject = new Cinema();
        cinemaObject.setName(cinema.getName());
        cinemaObject.setAddress(cinema.getAddress());
        validationService.validateCinema(cinemaObject);
        _dbCinema.setName(cinemaObject.getName());
        _dbCinema.setAddress(cinemaObject.getAddress());
        cinemaRepository.save(_dbCinema);
        return true;
    }

    @Override
    public CinemaHall addHallToCinema(int id, CinemaHall hall) {
        Cinema cinema = getCinemaById(id);
        try{
            validationService.validateCinemaHall(hall);
            cinema.addCinemaHall(hall);
            cinemaRepository.save(cinema);
            return cinema.getCinemaHalls().stream().toList().get(cinema.getCinemaHalls().size() - 1);
        }
        catch (Exception exception){
            return null;
        }
    }
}
