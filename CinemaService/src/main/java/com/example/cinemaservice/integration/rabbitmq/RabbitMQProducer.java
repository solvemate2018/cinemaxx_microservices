package com.example.cinemaservice.integration.rabbitmq;

import com.example.cinemaservice.entities.Cinema;
import com.example.cinemaservice.entities.CinemaHall;
import com.example.cinemaservice.entities.MovieSchedule;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQProducer {
    @Autowired
    private AmqpTemplate amqpTemplate;

    public void deleteCinema(Cinema cinema) {
        amqpTemplate.convertAndSend("cinema.exchange", "cinema.deleted", cinema.toString());
    }

    public void deleteCinemaHall(CinemaHall hall) {
        amqpTemplate.convertAndSend("cinema.exchange", "cinema.hall.deleted", hall.toString());
    }

    public void createSchedule(MovieSchedule schedule) {
        amqpTemplate.convertAndSend("cinema.exchange", "cinema.hall.schedule.created", schedule.toString());
    }

    public void updateSchedule(MovieSchedule schedule) {
        amqpTemplate.convertAndSend("cinema.exchange", "cinema.hall.schedule.updated", schedule.toString());
    }

    public void deleteSchedule(MovieSchedule schedule) {
        amqpTemplate.convertAndSend("cinema.exchange", "cinema.hall.schedule.deleted", schedule.toString());
    }


}
