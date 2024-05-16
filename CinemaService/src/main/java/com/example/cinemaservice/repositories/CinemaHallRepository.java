package com.example.cinemaservice.repositories;

import com.example.cinemaservice.entities.CinemaHall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
@RepositoryRestResource(exported = false)
public interface CinemaHallRepository extends JpaRepository<CinemaHall, Integer> {
    Collection<CinemaHall> findByCinema_Id(int id);
}
