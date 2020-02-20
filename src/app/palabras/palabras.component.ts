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
      this.lex = "181.43.93.109"  
    this.myOptions = [

                      {id: "Pinera",name: 'Piñera'},
                      {id:"Bachelet", name: 'Bachelet'},
                      {id: "Ossandon", name: 'Ossandon'},
                      {id: "JoseAKast", name:'JoseAKast'},
                      {id: "Lavin", name:'Lavin'},
                      {id: "Guillier", name:'Guillier'},
                      {id: "Pinochet", name:'Pinochet'},
                      {id: "Allende",name:'Allende'}
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
      apiKey: 'AIzaSyCziung57MnFDCP4B5M2S-MBo_qu6VvKe4',
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
        apiKey: 'AIzaSyCziung57MnFDCP4B5M2S-MBo_qu6VvKe4',
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
    apiKey: 'AIzaSyCziung57MnFDCP4B5M2S-MBo_qu6VvKe4',
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
    apiKey: 'AIzaSyCziung57MnFDCP4B5M2S-MBo_qu6VvKe4',
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
