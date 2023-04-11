import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/shared/Movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies:Movie[] = [];
  constructor(movieService: MovieService, activatedRoute:ActivatedRoute ) {
    activatedRoute.params.subscribe((params) => {
      if(params['searchTerm']) movieService.getAllMoviesBySearchTerm(params['searchTerm']).subscribe(movies => this.movies = movies);
      else movieService.getPopularMovies().subscribe(movies => this.movies = movies);;
    })
   }

  ngOnInit(): void {
    this.movies.forEach(movie => {
      console.log(movie);
    });
  }

}
