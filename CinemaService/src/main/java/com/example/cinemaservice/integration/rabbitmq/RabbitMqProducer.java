package com.example.cinemaservice.integration.rabbitmq;

import com.example.cinemaservice.entities.Cinema;
import com.example.cinemaservice.entities.CinemaHall;
import com.example.cinemaservice.entities.MovieSchedule;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitMqProducer {
    @Autowired
    private AmqpTemplate amqpTemplate;

    ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());

    public void deleteCinema(Cinema cinema) throws JsonProcessingException {
        amqpTemplate.convertAndSend("cinema.exchange", "cinema.deleted", mapper.writeValueAsString(cinema));
    }

    public void deleteCinemaHall(CinemaHall hall) throws JsonProcessingException {
        amqpTemplate.convertAndSend("cinema.exchange", "cinema.hall.deleted", mapper.writeValueAsString(hall));
    }

    public void createSchedule(MovieSchedule schedule) throws JsonProcessingException {
        amqpTemplate.convertAndSend("cinema.exchange", "cinema.hall.schedule.created", mapper.writeValueAsString(schedule));
    }

    public void updateSchedule(MovieSchedule schedule) throws JsonProcessingException {
        amqpTemplate.convertAndSend("cinema.exchange", "cinema.hall.schedule.updated", mapper.writeValueAsString(schedule));
    }

    public void deleteSchedule(MovieSchedule schedule) throws JsonProcessingException {
        amqpTemplate.convertAndSend("cinema.exchange", "cinema.hall.schedule.deleted", mapper.writeValueAsString(schedule));
    }
}
