package com.example.cinemaservice.integration.http;

import com.example.cinemaservice.dtos.MovieResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientRequestException;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import javax.naming.ServiceUnavailableException;

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

    @Retryable(retryFor = WebClientRequestException.class, maxAttempts = 3, backoff = @Backoff(delay = 2000))
    public MovieResult getMovieById(int id) {
        if(webClient == null){
            initializeWebClient();
        }
        return webClient.get()
                    .uri("/movies/{id}", id)
                    .retrieve()
                    .bodyToMono(MovieResult.class)
                    .block();
        }

    @Recover
    MovieResult recover(WebClientRequestException e, int id) throws ServiceUnavailableException {
        log.error("Error occurred while fetching movie: " + id);
        throw new ServiceUnavailableException("Movie service is currently unavailable please try again later.");
    }
}


