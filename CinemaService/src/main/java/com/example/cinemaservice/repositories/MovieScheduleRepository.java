package com.example.cinemaservice.repositories;

import com.example.cinemaservice.entities.MovieSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
@RepositoryRestResource(exported = false)
public interface MovieScheduleRepository extends JpaRepository<MovieSchedule, Integer> {
    Collection<MovieSchedule> findByHall_Id(int hallId);
    Collection<MovieSchedule> findAllByMovieId(int movieId);
}
