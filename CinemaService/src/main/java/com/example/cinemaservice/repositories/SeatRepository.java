package com.example.cinemaservice.repositories;

import com.example.cinemaservice.entities.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
@RepositoryRestResource(exported = false)
public interface SeatRepository extends JpaRepository<Seat, Integer> {
    Collection<Seat> getSeatByHall_Id(int hallId);
}
