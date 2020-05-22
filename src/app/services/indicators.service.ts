import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/';
import { historico } from '../models/historico.model';


@Injectable({
  providedIn: 'root'
})
export class IndicatorService  implements OnInit {

  

  private urlapi
    = 'https://api.exchangeratesapi.io/latest';
  
  constructor(public http: HttpClient) { }
  
  ngOnInit(): void {}

  public getCurrentEuroRates() {
    return this.http.get(`${this.urlapi}`);    
  }  

  public getLast():Observable<any>{
    return this.http.get<any>(`${environment.indeconUrl.endpoint}/last`,
      {
        headers : new HttpHeaders(
          {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
          })
      }
    );
  }
  
  public getYesterday(key:string){
    return this.http.get<any>('https://www.mocky.io/v2/5ebaeb4c3600006400f7e459');
  }

  public getHistorical(key:string):Observable<historico>{
    return this.http.get<historico>('https://www.mocky.io/v2/5ebc4a4d31000034005b0aca');
  }
  
  
}
