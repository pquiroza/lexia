import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-palanalisis',
  templateUrl: './palanalisis.component.html',
  styleUrls: ['./palanalisis.component.css']
})
export class PalanalisisComponent implements OnInit {
model: any = {};
frases: any;
public palabramesChart: any;
public palabrahorasChart: any;
public enproceso: any; 
  constructor(private http: HttpClient) {

this.frases = []
   }


  reportePalabras(){
    console.log(this.model.palabras)
    console.log(this.model.fecha.day)
    console.log(this.model.fecha.month)
    let mes = this.model.fecha.month;
    let dia = this.model.fecha.day;
    let palabra = this.model.palabras;
    this.http.get('http://181.43.88.7/lexia/api/reportediapalabra?mes='+mes+'&dia='+dia+'&palabra='+palabra).subscribe(data => {
      console.log(data)
      if (data.length===1){
        this.enproceso = true;
      }
      else{
        this.enproceso = false;

      let graficodias = []
      let headerdias = ['Fecha','Menciones'];

      let graficohoras = []
      let headerhoras = ['Hora','Menciones']

      graficodias.push(headerdias);
      graficohoras.push(headerhoras);
      data['reportemes'].forEach(drd => {
        graficodias.push(drd)
      })
      console.log(graficodias);
      this.palabramesChart = {
        chartType: 'LineChart',
        dataTable: graficodias,
        options: {title: 'Datos por dia del mes',
       legend: { position: 'bottom' }
     }
      }

      data['reportedia'].forEach(drh => {
        graficohoras.push(drh)
      });
      console.log(graficohoras)
      this.palabrahorasChart = {
        chartType: 'LineChart',
        dataTable: graficohoras,
        options: {title: 'Datos por Hora del Dia',
       legend: { position: 'bottom' }
     }
      }


      data['frases'].forEach(dfr => {
        let f = {
          'frase': dfr[0],
          'contador': dfr[1]
        }
        this.frases.push(f)
      })
      console.log(this.frases)


}
  })



  }

  ngOnInit() {
  }

}
