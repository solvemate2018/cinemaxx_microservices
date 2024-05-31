package com.example.cinemaservice.integration.rabbitmq;

import com.example.cinemaservice.services.movieSchedule.MovieScheduleService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.util.Iterator;

@Slf4j
@Component
public class RabbitMqConsumer {

    private final ObjectMapper objectMapper = new ObjectMapper();

    private final MovieScheduleService movieScheduleService;

    public RabbitMqConsumer(MovieScheduleService movieScheduleService) {
        this.movieScheduleService = movieScheduleService;
    }

    @RabbitListener(queues = "cinema.movie.deleted.updateSchedules")
    public void receiveDeletedMovieMessage(String message) {
        try {
            JsonNode jsonNode = objectMapper.readTree(message);

            int movieId = jsonNode.get("Id").asInt();

            int deletedSchedules = movieScheduleService.deleteMovieSchedulesByMovieId(movieId);

            log.info("Deleted {} movie schedules for movie {}", deletedSchedules, movieId);

        } catch (JsonProcessingException e) {
            log.error("Error parsing JSON message: {}", e.getMessage());
        } catch (Exception e) {
            log.error(e.getMessage());
        }

    }
}
