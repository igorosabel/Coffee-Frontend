import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import {
  MonthResult,
  MonthDayResult,
  PeopleListResult,
  PeopleResult,
  CoffeeData,
  SaveResult
} from '../interfaces/interfaces';

@Injectable()
export class ApiService {

  constructor(private http : Http){}

  getMonth(month: number, year: number): Observable<MonthResult> {
    return this.http.post('https://coffee.osumi.es/api/coffee/get-month', {month, year}).map((response:Response) => response.json());
  }
  
  getPeople(): Observable<PeopleListResult> {
    return this.http.post('https://coffee.osumi.es/api/person/get-people', {}).map((response:Response) => response.json());
  }
  
  saveCoffee(coffeData: CoffeeData): Observable<SaveResult> {
    return this.http.post('https://coffee.osumi.es/api/coffee/save', coffeData).map((response:Response) => response.json());
  }
}