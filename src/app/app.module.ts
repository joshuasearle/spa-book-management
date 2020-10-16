import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AddactorComponent } from './addactor/addactor.component';
import { ListactorsComponent } from './listactors/listactors.component';
import { UpdateactorComponent } from './updateactor/updateactor.component';
import { DeleteactorComponent } from './deleteactor/deleteactor.component';

import { DatabaseService } from './database.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ListmoviesComponent } from './listmovies/listmovies.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { DeletemovieComponent } from './deletemovie/deletemovie.component';
import { AddactormovieComponent } from './addactormovie/addactormovie.component';
import { NotfoundviewComponent } from './notfoundview/notfoundview.component';

const appRoutes: Routes = [
  { path: 'listactors', component: ListactorsComponent },
  { path: 'addactor', component: AddactorComponent },
  { path: 'deleteactor', component: DeleteactorComponent },
  { path: 'updateactor', component: UpdateactorComponent },
  { path: 'listmovies', component: ListmoviesComponent },
  { path: 'addmovie', component: AddmovieComponent },
  { path: 'deletemovie', component: DeletemovieComponent },
  { path: 'addactormovie', component: AddactormovieComponent },
  { path: '', redirectTo: '/listactors', pathMatch: 'full' },
  { path: '**', component: NotfoundviewComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AddactorComponent,
    ListactorsComponent,
    UpdateactorComponent,
    DeleteactorComponent,
    NavbarComponent,
    ListmoviesComponent,
    AddmovieComponent,
    DeletemovieComponent,
    AddactormovieComponent,
    NotfoundviewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
