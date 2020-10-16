import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css'],
})
export class AddmovieComponent {
  title: string = '';
  year: number = 0;
  rating: number = 0;

  constructor(private dbService: DatabaseService, private router: Router) {}

  onSaveMovie() {
    const obj = {
      title: this.title,
      year: this.year,
      rating: this.rating,
      actors: [],
    };
    this.dbService.createMovie(obj).subscribe((result) => {
      this.router.navigate(['/listmovies']);
    });
  }
}
