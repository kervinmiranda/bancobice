import { Component, OnInit } from '@angular/core';
import { IndicatorService } from '../../services/indicators.service'; 
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType, controllers } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as moment from 'moment';
import { historico } from 'src/app/models/historico.model';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.css']
})

export class HistoricalComponent implements OnInit {

  private historical: historico;
  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public datos:number[] = [];
  public labels:string[] = [];  
  public lineChartOptions: ChartOptions = {
    responsive: true,
      scales:{
      xAxes: [{
        ticks: {
            autoSkip: true,
            maxTicksLimit: 15
        }
    }]
    }
  };  
  public lineChartColors: Color[] = [
    {
      borderWidth: 2,
      borderColor: 'blue',
      backgroundColor: 'rgba(124, 176, 232)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor(private ind: IndicatorService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getdata();
    this.fillData();
  }

  //Get Data From Api
  private getdata(){    
    this.ind.getHistorical(this.activeRoute.snapshot.params.key).subscribe(
      data => {
        this.historical = data;
      }, 
      error => {
        console.error('Cant read data');
        throw new Error(error);
      },
      () => {
        let labels2:string[] = [];
        let values2:number[] = [];
        for (var i in this.historical.values) {    
          labels2.push(moment.unix(Number(i)).format("DD/MM/YYYY"));
          values2.push(this.historical.values[i]);          
        }        
        if (labels2.length > 30 ){
          this.labels = labels2.slice(labels2.length - 30, labels2.length);
          this.datos = values2.slice(values2.length - 30, values2.length);         
        }
        this.fillData();
      }
    )
      
  }

  //Fill data to Chart
  private fillData(){
    this.lineChartData = [
      { 
        data: this.datos,
        label: this.activeRoute.snapshot.params.key
      },
    ],
    this.lineChartLabels = this.labels;    
  }
  

}
