import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  getActors() {
    return this.http.get('/actors');
  }
  getActor(id: string) {
    const url = '/actors/' + id;
    return this.http.get(url);
  }
  createActor(data) {
    return this.http.post('/actors', data, httpOptions);
  }
  updateActor(id, data) {
    const url = '/actors/' + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id) {
    let url = '/actors/' + id;
    return this.http.delete(url, httpOptions);
  }
  getMovies() {
    return this.http.get('/movies');
  }
  createMovie(data) {
    return this.http.post('/movies', data, httpOptions);
  }
  deleteMovie(id) {
    const url = '/movies/' + id;
    return this.http.delete(url, httpOptions);
  }
  deleteMovieBefore(year) {
    const url = '/movies' + '?beforeYear=' + year;
    return this.http.delete(url, httpOptions);
  }
  addActorToMovie(actorId, movieId) {
    const url = '/movies/' + movieId + '/' + actorId;
    return this.http.put(url, {}, httpOptions);
  }
  addMovieToActor(actorId, movieId) {
    const url = '/actors/' + actorId + '/movies';
    return this.http.post(url, { id: movieId }, httpOptions);
  }
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
