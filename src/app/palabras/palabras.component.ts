import { Component, OnInit } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-palabras',
  templateUrl: './palabras.component.html',
  styleUrls: ['./palabras.component.css']
})
export class PalabrasComponent implements OnInit {
    public lex: any;

  optionsModel: number[];
  public geoChart: any;
  myOptions: IMultiSelectOption[];
model: any = {};
datos: any;
  constructor(private http: HttpClient) {
      this.lex = "190.101.192.149"
    this.myOptions = [

      {id: "Pinera",name: 'Piñera'},
      {id:"18 Octubre", name: '18 Octubre'},
      {id: "Estallido Social", name: 'Estallido Social'},
      {id: "Seguridad Ciudadana", name:'Seguridad Ciudadana'},
      {id: "Pensiones", name:'Pensiones'},
      {id: "Carabineros", name:'Carabineros'},
      {id: "Plebiscito", name:'Plebiscito'},
      {id: "Gobierno",name:'Gobierno'},
      {id: "Medios",name:'Medios'}
    ];

    this.datos = [];


  }


reporteMapa(){
  let conceptos = this.optionsModel;
  let dia = this.model.fecha.day;
  let mes = this.model.fecha.month;
  console.log(conceptos);
  console.log(dia);
  console.log(mes);

  this.getGeo(mes,dia,conceptos).then(data => {
    console.log(data)
    this.datos = data;
    this.geoChart = {
      chartType: 'GeoChart',
      dataTable:  this.datos,
      apiKey: 'AIzaSyBtsfIjavCuuMkxKCOcz3BE00q-Np5f2X4',
      options:{
          'region': 'CL',
         'displayMode':'markers',
         'magnifyingGlass': {enable: true, zoomFactor: 12},
         colorAxis: {colors: ['green']}
      }
    }
  })
}

mapaAmerica(){
  console.log("AMERICA")
  let conceptos = this.optionsModel;
  let dia = this.model.fecha.day;
  let mes = this.model.fecha.month;
  this.getGeo(mes,dia,conceptos).then(data => {
    console.log(data)
      this.geoChart = {
        chartType: 'GeoChart',
        dataTable:  data,
        apiKey: 'AIzaSyBtsfIjavCuuMkxKCOcz3BE00q-Np5f2X4',
        options:{
            'region': '005',
           'displayMode':'markers',
           'magnifyingGlass': {enable: true, zoomFactor: 12}
        }
      }
  })

}


mapaChile(){
  console.log("AMERICA")
  this.geoChart = {
    chartType: 'GeoChart',
    dataTable:  this.datos,
    apiKey: 'AIzaSyBtsfIjavCuuMkxKCOcz3BE00q-Np5f2X4',
    options:{
        'region': 'CL',
       'displayMode':'markers',
       'magnifyingGlass': {enable: true, zoomFactor: 12}
    }
  }
}
mapaMundo(){
  let conceptos = this.optionsModel;
  let dia = this.model.fecha.day;
  let mes = this.model.fecha.month;
this.getGeo(mes,dia,conceptos).then(data => {
  console.log(data);
  this.geoChart = {
    chartType: 'GeoChart',
    dataTable:  data,
    apiKey: 'AIzaSyBtsfIjavCuuMkxKCOcz3BE00q-Np5f2X4',
    options:{

       'displayMode':'markers',
       'magnifyingGlass': {enable: true, zoomFactor: 12}
    }
  }
})

}


  getGeo(mes,dia,concepto){
    return new Promise((resolve,reject) => {
      let datosgeo = [];
      let header = ['Ciudad','Menciones'];
      let q = "";
      concepto.forEach(c => {
        q = q+"concepto="+c+"&"

      })
        this.http.get('http://'+this.lex+'/lexia/api/getgeodia?mes='+mes+'&dia='+dia+'&'+q).subscribe(data => {
          console.log(data)
          datosgeo.push(header);
          data.forEach(d => {
            datosgeo.push(d);
          })
          this.datos = datosgeo
          resolve(this.datos)
      })
    })

  }

  ngOnInit() {
  }

}
