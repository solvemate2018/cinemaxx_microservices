package com.example.cinemaservice.services.cinemaHall;

import com.example.cinemaservice.dtos.CreateCinemaHallDTO;
import com.example.cinemaservice.entities.CinemaHall;
import com.example.cinemaservice.entities.MovieSchedule;
import com.example.cinemaservice.integration.rabbitmq.RabbitMqProducer;
import com.example.cinemaservice.repositories.CinemaHallRepository;
import com.example.cinemaservice.services.cinema.CinemaService;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class CinemaHallService implements CinemaHallServiceInterface {
    private final CinemaHallRepository cinemaHallRepository;
    private final CinemaService cinemaService;
    private final RabbitMqProducer mqProducer;

    public CinemaHallService(CinemaHallRepository cinemaHallRepository, CinemaService cinemaService, RabbitMqProducer mqProducer) {
        this.cinemaHallRepository = cinemaHallRepository;
        this.cinemaService = cinemaService;
        this.mqProducer = mqProducer;
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
        return cinemaService.addHallToCinema(cinemaId, hall);
    }

    @Override
    public boolean updateCinemaHall(int cinemaHallId, CreateCinemaHallDTO cinemaHall) {
        CinemaHall _dbCinemaHall = cinemaHallRepository.findById(cinemaHallId).orElseThrow(() -> new ResourceNotFoundException("There is no such cinema in our system!"));

        try{
            _dbCinemaHall.setName(cinemaHall.getHallName());
            cinemaHallRepository.save(_dbCinemaHall);
            return true;
        }
        catch (Exception exception){
            return false;
        }
    }

    @Override
    public boolean deleteCinemaHall(int cinemaHallId) {
        try {
            CinemaHall cinemaHall = cinemaHallRepository.findById(cinemaHallId).orElseThrow(() -> new ResourceNotFoundException("There is no such cinema hall in our system!"));
            mqProducer.deleteCinemaHall(cinemaHall);
            cinemaHallRepository.delete(cinemaHall);
            return true;
        }
        catch (Exception exception){
            return false;
        }
    }

    @Override
    public MovieSchedule addMovieSchedule(int cinemaHallId, MovieSchedule movieSchedule) {
        CinemaHall hall = getCinemaHall(cinemaHallId);
        try{
            hall.addSchedule(movieSchedule);
            cinemaHallRepository.save(hall);
            return hall.getSchedules().stream().toList().get(hall.getSchedules().size() - 1);
        }
        catch (Exception exception){
            return null;
        }
    }
}
