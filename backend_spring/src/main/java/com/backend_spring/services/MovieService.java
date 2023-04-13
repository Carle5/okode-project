package com.backend_spring.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MovieService {

    @Autowired
    private RestTemplate restTemplate;

    public Object getAllMoviesBySearchTerm(String searchTerm) {
        return restTemplate.getForObject("https://api.themoviedb.org/3/search/movie?api_key=850cbabd4109822978b7ee9caee2d449&language=es-ES&query=" + searchTerm + "&page=1", Object.class);
    }
}
