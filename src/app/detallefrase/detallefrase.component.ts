import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-detallefrase',
  templateUrl: './detallefrase.component.html',
  styleUrls: ['./detallefrase.component.css']
})
export class DetallefraseComponent implements OnInit {
  frase: any;
  palabra:any;
  lex: any;
  constructor(public route: ActivatedRoute, private http: HttpClient) {
    this.lex = "190.101.192.149"
    this.route.queryParams.subscribe(params => {
      this.frase = params['idfrase'];
      this.palabra = params['palabra']
      console.log(this.palabra);
      console.log(this.frase);
        this.http.get('http://'+this.lex+'/lexia/api/detallepalabra?palabra='+this.palabra+'&concepto='+this.frase).subscribe(data => {
          console.log(data);
        })
    })



  }


  ngOnInit() {
  }

}
