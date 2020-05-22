import { Component, OnInit } from '@angular/core';
import { IndicatorService } from '../../services/indicators.service';
import { Datos } from 'src/app/models/datos.model';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.css']
})

export class IndicatorsComponent implements OnInit {
  public indicators:Datos[] = [];
  private names:string[] = ['cobre', 'dolar', 'euro', 'ipc', 'ivp', 'oro', 'plata', 'uf', 'utm', 'yen'];

  constructor(private ind:IndicatorService) {}

  ngOnInit(): void {
    registerLocaleData( es );
    this.getData();    
  }

  getData(){
    this.ind.getLast().subscribe(
      data => {
      this.names.forEach(name=> {
        const datos:Datos = data[name];
        this.indicators.push(datos);
      });        
      }, 
      error => {
        console.error('Cant read data');
        throw new Error(error);
      },
      () => {
        this.getVariation(this.indicators);
      }
    ); 
  }

  getVariation<String>(datos: Datos[]){
    for(let i in datos){      
      this.ind.getYesterday(datos[i].key).subscribe(
        data =>{
          datos[i].variation = Number(datos[i].value) - Number(data.value);
        }
      )
    }
  }

  updateBadgeClasses(variation:number){
    return{
      'badge-success' :variation > 0,
      'badge-danger': variation < 0,
      'badge-warning': variation == 0      
    }
  }

  updateTrendingClasses(variation:number){
    return{
      'mdi-trending-up' :variation > 0,
      'mdi-trending-down': variation < 0,
      'mdi-trending-neutral': variation == 0
    }
  }
  
}
