package com.backend_spring.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.backend_spring.services.MovieService;

@RestController
public class MovieController {

    @Autowired
    MovieService movieService;
    
    @GetMapping("/api/movies/search/{searchTerm}")
    public Object getAllMoviesBySearch(@PathVariable("searchTerm") String searchTerm) {
        return movieService.getAllMoviesBySearchTerm(searchTerm);
    }
    
}


