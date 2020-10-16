import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateactor',
  templateUrl: './updateactor.component.html',
  styleUrls: ['./updateactor.component.css'],
})
export class UpdateactorComponent implements OnInit {
  fullName: string = '';
  bYear: number = 0;
  actorId: string = '';
  actorsDB: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.onGetActors();
  }

  onGetActors() {
    return this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }

  onUpdateActor() {
    const obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe((result) => {
      this.onGetActors();
      this.router.navigate(['/listactors']);
    });
  }
}
