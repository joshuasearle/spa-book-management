import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-addactormovie',
  templateUrl: './addactormovie.component.html',
  styleUrls: ['./addactormovie.component.css'],
})
export class AddactormovieComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];

  selectedActorId: string = '';
  selectedMovieId: string = '';

  constructor(private dbService: DatabaseService, private router: Router) {}

  ngOnInit(): void {
    this.onGetActors();
    this.onGetMovies();
  }

  onGetMovies() {
    return this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  onGetActors() {
    return this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  // Update movie and actor
  // Once both have finished, update the actor and movie list
  // Finally, redirect to list of movies
  onAddActorToMovie() {
    forkJoin([
      this.dbService.addActorToMovie(
        this.selectedActorId,
        this.selectedMovieId
      ),
      this.dbService.addMovieToActor(
        this.selectedActorId,
        this.selectedMovieId
      ),
    ]).subscribe(() => {
      this.onGetActors();
      this.onGetMovies();
      this.router.navigate(['/listmovies']);
    });
  }
}
