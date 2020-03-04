import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
public lex: any;
public palabramesChart: any;
public palabrahorasChart: any;
public enproceso: any;
public palabra: any;
  constructor(private http: HttpClient, private router: Router) {
    this.lex = "190.101.192.149"
this.frases = []
   }


  reportePalabras(){
    this.frases = []
    console.log(this.model.palabras)


    this.palabra = this.model.palabras;
    this.http.get('http://'+this.lex+'/lexia/api/reportepalabrasnew?palabra='+this.palabra).subscribe(data => {
      console.log(data)
      data.forEach(d => {
        console.log(d._id)

        this.frases.push(d);
      })
      console.log(this.frases)
      /*
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
*/
  })



  }

  detalleConcepto(frase){
    this.router.navigate(['detallefrase'],{queryParams:{idfrase:frase,palabra:this.palabra}});
    console.log(frase)

  }

  ngOnInit() {
  }

}
