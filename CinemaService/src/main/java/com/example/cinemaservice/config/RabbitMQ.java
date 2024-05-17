package com.example.cinemaservice.config;

import com.rabbitmq.client.ConnectionFactory;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class RabbitMQ {
    @Autowired
    private Environment env;

    @Bean
    public ConnectionFactory connectionFactory() {
        String host = env.getProperty("rabbitmq.host");
        String port = env.getProperty("rabbitmq.port");
        String user = env.getProperty("rabbitmq.user");
        String password = env.getProperty("rabbitmq.password");

        ConnectionFactory factory = new ConnectionFactory();

        if(host != null && port != null && user != null && password != null) {
            factory.setHost(host);
            factory.setPort(Integer.getInteger(port));
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
}
