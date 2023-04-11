import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, delay, map } from 'rxjs';
import { Movie } from '../shared/Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  //private readonly baseUrl = 'https://api.themoviedb.org/3/';
  private readonly baseUrlNode = 'http://localhost:5000/';
  /*private readonly params = {
    api_key: '850cbabd4109822978b7ee9caee2d449',
    language: 'es-ES'
  };*/

  constructor(private http: HttpClient) {}

  getPopularMovies() {
    /*Llamada desde el front a la API de tmdb
    return this.http.get(`${this.baseUrl}movie/popular?api_key=${this.params.api_key}&language=${this.params.language}&page=1`)
      .pipe(map((res: any) => <Movie[]>res.results))*/

    //Llamada desde el front a la API REST creada con Nodejs en http://localhost:5000/
    const headers = new HttpHeaders().set('Authorization', "contraseña");
    return this.http.get(`${this.baseUrlNode}api/movies`, { headers }).pipe(map((res: any) => <Movie[]>res.results))
  }

  getAllMoviesBySearchTerm(searchTerm:string){
    /*Llamada desde el front a la API de tmdb
    return this.http.get(`${this.baseUrl}/search/movie?api_key=${this.params.api_key}&language=${this.params.language}&query=${searchTerm}&page=1`)
      .pipe(map((res: any) => <Movie[]>res.results));*/

    //Llamada desde el front a la API REST creada con Nodejs en http://localhost:5000/
    const headers = new HttpHeaders().set('Authorization', "contraseña");
    return this.http.get(`${this.baseUrlNode}api/movies/search/${searchTerm}`, { headers }).pipe(map((res: any) => <Movie[]>res.results))
  }

  getMovieById(idMovie: string){
    //Llamada desde el front a la API de tmdb
    //return this.http.get(`${this.baseUrl}movie/${idMovie}?api_key=${this.params.api_key}&language=${this.params.language}`).pipe(map((res: any) => <Movie>res));

    //Llamada desde el front a la API REST creada con Nodejs en http://localhost:5000/
    const headers = new HttpHeaders().set('Authorization', "contraseña");
    return this.http.get(`${this.baseUrlNode}api/movies/${idMovie}`, { headers }).pipe(map((res: any) => <Movie>res));
  }

}
