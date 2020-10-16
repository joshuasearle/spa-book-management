import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  navdata: Navitem[] = [
    { name: 'List Actors', link: '/listactors' },
    { name: 'Add Actor', link: '/addactor' },
    { name: 'Update Actor', link: '/updateactor' },
    { name: 'Delete Actor', link: '/deleteactor' },
    { name: 'List Movies', link: '/listmovies' },
    { name: 'Add Movie', link: '/addmovie' },
    { name: 'Delete Movie', link: '/deletemovie' },
    { name: 'Add Actor to Movie', link: '/addactormovie' },
    { name: 'Not found test', link: '/notareallink' },
  ];
}

type Navitem = {
  name: string;
  link: string;
};
