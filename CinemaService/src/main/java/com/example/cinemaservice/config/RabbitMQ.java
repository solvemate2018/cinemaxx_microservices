package com.example.cinemaservice.config;

import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
@Slf4j
public class RabbitMQ {
    @Autowired
    private Environment env;

    @Bean
    public ConnectionFactory connectionFactory() {
        String host = env.getProperty("rabbitmq.host");
        String port = env.getProperty("rabbitmq.port");
        String user = env.getProperty("rabbitmq.user");
        String password = env.getProperty("rabbitmq.password");

        CachingConnectionFactory factory = new CachingConnectionFactory();

        if(host != null && port != null && user != null && password != null) {
            factory.setHost(host);
            factory.setPort(Integer.parseInt(port));
            factory.setUsername(user);
            factory.setPassword(password);
        }
        else {
            factory.setHost("localhost");
            factory.setPort(5672);
            factory.setUsername("guest");
            factory.setPassword("guest");
        }

        return factory;
    }

    @Bean
    public TopicExchange cinemaExchange(){
        return new TopicExchange("cinema.exchange", true, false);
    }

    @Bean
    public Queue cinemaDeletedQueue() {
        return new Queue("cinema.deleted", true, false, false);
    }

    @Bean
    public Queue cinemaHallDeletedQueue() {
        return new Queue("cinema.hall.deleted", true, false, false);
    }

    @Bean
    public Queue cinemaHallScheduleCreatedQueue() {
        return new Queue("cinema.hall.schedule.created", true, false, false);
    }

    @Bean
    public Queue cinemaHallScheduleUpdatedQueue() {
        return new Queue("cinema.hall.schedule.updated", true, false, false);
    }

    @Bean
    public Queue cinemaHallScheduleDeletedQueue() {
        return new Queue("cinema.hall.schedule.deleted", true, false, false);
    }

    @Bean
    public Queue cinemaMovieDeletedQueue() {
        return new Queue("cinema.movie.deleted.updateSchedules", true, false, false);
    }

    @Bean
    public Binding cinemaDeletedBinding() {
        return BindingBuilder.bind(cinemaDeletedQueue()).to(cinemaExchange()).with("cinema.deleted");
    }

    @Bean
    public Binding cinemaHallDeletedBinding() {
        return BindingBuilder.bind(cinemaHallDeletedQueue()).to(cinemaExchange()).with("cinema.hall.deleted");
    }

    @Bean
    public Binding cinemaHallScheduleCreatedBinding() {
        return BindingBuilder.bind(cinemaHallScheduleCreatedQueue()).to(cinemaExchange()).with("cinema.hall.schedule.created");
    }

    @Bean
    public Binding cinemaHallScheduleUpdatedBinding() {
        return BindingBuilder.bind(cinemaHallScheduleUpdatedQueue()).to(cinemaExchange()).with("cinema.hall.schedule.updated");
    }

    @Bean
    public Binding cinemaHallScheduleDeletedBinding() {
        return BindingBuilder.bind(cinemaHallScheduleDeletedQueue()).to(cinemaExchange()).with("cinema.hall.schedule.deleted");
    }

    @Bean
    public Binding cinemaMovieDeletedBinding() {
        return BindingBuilder.bind(cinemaMovieDeletedQueue()).to(cinemaExchange()).with("cinema.movie.deleted");
    }
}
