package com.example.cinemaservice.services.cinema;

import com.example.cinemaservice.entities.Cinema;
import com.example.cinemaservice.entities.CinemaHall;
import com.example.cinemaservice.integration.rabbitmq.RabbitMqProducer;
import com.example.cinemaservice.repositories.CinemaRepository;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class CinemaService implements CinemaServiceInterface {
    private final CinemaRepository cinemaRepository;
    private final RabbitMqProducer mqProducer;

    public CinemaService(CinemaRepository cinemaRepository, RabbitMqProducer mqProducer) {
        this.cinemaRepository = cinemaRepository;
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
    public Cinema createCinema(Cinema cinema) {
        return cinemaRepository.save(cinema);
    }

    @Override
    public boolean deleteCinema(int id) {
        try {
            Cinema cinema = cinemaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("There is no such cinema in our system!"));
            mqProducer.deleteCinema(cinema);
            cinemaRepository.delete(cinema);
            return true;
        }
        catch (Exception exception){
            return false;
        }
    }

    @Override
    public boolean updateCinema(int id, Cinema cinema) {
        Cinema _dbCinema = cinemaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("There is no such cinema in our system!"));

        try{
            _dbCinema.setName(cinema.getName());
            _dbCinema.setAddress(cinema.getAddress());

            cinemaRepository.save(_dbCinema);
            return true;
        }
        catch (Exception exception){
            return false;
        }

    }

    @Override
    public CinemaHall addHallToCinema(int id, CinemaHall hall) {
        Cinema cinema = getCinemaById(id);
        try{
            cinema.addCinemaHall(hall);
            cinemaRepository.save(cinema);
            return cinema.getCinemaHalls().stream().toList().get(cinema.getCinemaHalls().size() - 1);
        }
        catch (Exception exception){
            return null;
        }
    }
}
