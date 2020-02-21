import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public lex: any;
public lineChartData: any;
public lineChartData2: any;
public circularChart: any;
  conceptos2: any;
model: any = {};
  palabras: any;
optionsModel: number[];
    myOptions: IMultiSelectOption[];


  constructor(private http: HttpClient) {
    this.lex = "190.101.192.149"
    this.palabras = []
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

let dt = ["Pinera", "Gobierno"];
var ds = new Date();
this.getdatosdias(ds.getMonth()+1,dt).then(datos =>{
  this.lineChartData =  {
    chartType: 'LineChart',
    dataTable:
  datos
    ,
    options: {title: 'Datos del dia del mes',
    isStacked: false,
      seriesType: 'bars',
   legend: { position: 'bottom' }
 }
  };
});


this.getpalabrasdia(ds.getMonth()+1,ds.getDate()).then(data => {
  data.forEach(d => {
    console.log(d);
    this.palabras.push(d);
  })
})

console.log(this.palabras)
this.http.get('http://'+this.lex+'/lexia/api/getconceptos').subscribe(result => {
  this.conceptos = result as Concepto[];

});








  }

  onChange() {
    console.log(this.optionsModel);
}

cambiaFechaMes(){
let conceptos = this.optionsModel;
var ds = new Date();

this.getdatosdias(ds.getMonth()+1,conceptos).then(data => {
  this.lineChartData =  {
    chartType: 'ComboChart',
    dataTable:
  data,
    options: {title: 'Menciones en Redes Sociales',
        isStacked: true,
        seriesType: 'bars',
   legend: { position: 'bottom' },
   hAxis: {format: '0/9'}
 }
  };
})

}

getcirculardia(mes,dia,concepto){
return new Promise((resolve,reject) => {
  let datos = [];
  let header = ['Concepto','Menciones'];
  let q = "";
  concepto.forEach(c => {
    q = q+"concepto="+c+"&"

  })

  this.http.get('http://'+this.lex+'/lexia/api/circulardia?mes='+mes+'&dia='+dia+'&'+q).subscribe(data => {

    datos.push(header);
    data.forEach(d => {

      datos.push(d);
    })
    resolve(datos)
})
})
}

cambiaFecha(){
let conceptos = this.optionsModel;

let mes = this.model.fecha.month

  this.getdatoshoras(mes,this.model.fecha.day,conceptos).then(datos => {
    console.log(datos)
    this.lineChartData2 = {
      chartType: 'LineChart',
      dataTable: datos,
      options: {title: 'Menciones en Redes Sociales',
     legend: { position: 'bottom' },
     hAxis: {format: '0/Hrs'}
   }
    }
  });

  this.getcirculardia(mes,this.model.fecha.day,conceptos).then(datos2 => {
    console.log(datos2)
    this.circularChart = {
      chartType: 'PieChart',
      dataTable: datos2,

    }
  });
}

getpalabrasdia(mes,dia){
  return new Promise((resolve,reject) => {
    this.http.get('http://'+this.lex+'/lexia/api/getpalabrasdia?mes='+mes+'&dia='+dia).subscribe(data => {
      resolve(data);
    })
  })
}

getdatoshoras(mes,dia,concepto){
  return new Promise((resolve,reject) => {
    let datos = [];
    let header = ['Fecha'];
    let q = "";
    concepto.forEach(c => {
      q = q+"concepto="+c+"&"
      header.push(c);
    })

    this.http.get('http://'+this.lex+'/lexia/api/getdatoshoras?mes='+mes+'&dia='+dia+'&'+q).subscribe(data => {

      datos.push(header);
      data.forEach(d => {

        datos.push(d);
      })

      resolve(datos);
    })
  })
}




getdatosdias(mes,concepto){
  return new Promise((resolve,reject) => {
    let datos = [];
    let header = ['Fecha'];
    let q = "";
    concepto.forEach(c => {
      q = q+"concepto="+c+"&"
      header.push(c);
    })
    console.log(mes)

      this.http.get('http://'+this.lex+'/lexia/api/getdatosdia?mes='+mes+'&'+q).subscribe(data => {
        console.log(data);

        datos.push(header);
      data.forEach(d => {


        datos.push(d);
      })

      resolve(datos)


      })


  })
}
ngOnInit() {
}
}
