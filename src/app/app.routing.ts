import { NgModule,Injectable } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PalabrasComponent } from './palabras/palabras.component';
import { PalanalisisComponent } from './palanalisis/palanalisis.component';

const routes: Routes = [
  {path: '',component: HomeComponent },
  {path: 'palabras', component: PalabrasComponent},
  {path: 'palanalisis', component: PalanalisisComponent}
  ]

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule],
})



export class AppRoutingModule{}

export const routingComponents = [HomeComponent, PalabrasComponent, PalanalisisComponent];
