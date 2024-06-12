package com.example.cinemaservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.retry.annotation.EnableRetry;

@SpringBootApplication
@EnableRetry
public class CinemaServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CinemaServiceApplication.class, args);
    }

}
