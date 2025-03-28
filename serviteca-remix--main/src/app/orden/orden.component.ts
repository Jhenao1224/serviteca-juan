import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit{

  ordenes: any[] = [];
  lista: any[] = [];
  servicios : any[] = [];
  mostrar: boolean = false;

  constructor(private dataService: DataService, 
    ){}

    ngOnInit(): void {
      this.dataService.obtenerOrdenes()
        .subscribe(
          (ordenes: any) => { 
            this.ordenes = ordenes;
            this.listarOrdenes()          
          }          
        );
    }

    listarOrdenes(){
      this.ordenes.forEach(item => {
        let size = item.length
        this.lista.push(item[size-1])
      })
    }

    listarServicios(){
      this.servicios = [];
      this.ordenes.forEach(item => {
        let size = item.length
        let orden = (<HTMLInputElement>document.getElementById("orden")).value;
        
        if(item[size-1] === orden){
          this.servicios.push(...item);
          this.servicios.pop();
          this.mostrar = true;
          console.log(this.mostrar)
          console.log(this.servicios.length)
        }
        
      })   
    }

    

}
