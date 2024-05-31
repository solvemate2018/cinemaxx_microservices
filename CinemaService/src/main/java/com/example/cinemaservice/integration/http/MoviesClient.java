package com.example.cinemaservice.integration.http;

import com.example.cinemaservice.dtos.MovieResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class MoviesClient {
    private WebClient webClient;
    private final WebClient.Builder webClientBuilder;
    @Autowired
    private Environment env;

    public MoviesClient(WebClient.Builder webClientBuilder) {
        this.webClientBuilder = webClientBuilder;
    }

    private void initializeWebClient() {
        String moviesURL = env.getProperty("movies.url");
        this.webClient = webClientBuilder.baseUrl(moviesURL == null ? "http://localhost:5100" : moviesURL).build();
    }

    public MovieResult getMovieById(int id) {
        if(webClient == null){
            initializeWebClient();
        }
        try {
            return webClient.get()
                    .uri("/movies/{id}", id)
                    .retrieve()
                    .bodyToMono(MovieResult.class)
                    .block();
        } catch (Exception ex) {
            log.error("Error occurred while fetching movie: " + ex.getMessage());
            return null;
        }
    }}
