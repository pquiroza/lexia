import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule, routingComponents } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { PalabrasComponent } from './palabras/palabras.component';
import { PalanalisisComponent } from './palanalisis/palanalisis.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PalabrasComponent,
    PalanalisisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2GoogleChartsModule,
    NgbModule.forRoot(),
    FormsModule,
    MultiselectDropdownModule  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
