package com.example.cinemaservice.repositories;

import com.example.cinemaservice.entities.Cinema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RepositoryRestResource(exported = false)
public interface CinemaRepository extends JpaRepository<Cinema, Integer> {
    Optional<Cinema> findCinemaByName(String cinemaName);
}
