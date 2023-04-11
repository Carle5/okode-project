import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/shared/Movie';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit {

  movie!:Movie;
  constructor(activadeRoute:ActivatedRoute, movieService:MovieService) {
    activadeRoute.params.subscribe((params) => {
      if(params['id']) movieService.getMovieById(params['id']).subscribe(movie => this.movie = movie);
   })
  }

  ngOnInit(): void {
  }

}
