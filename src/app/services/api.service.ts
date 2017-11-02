import { HttpClient } from '@angular/common/http';
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

  constructor(private http : HttpClient){}

  getMonth(month: number, year: number): Observable<MonthResult> {
    return this.http.post<MonthResult>('https://coffee.osumi.es/api/coffee/get-month', {month, year});
  }
  
  getPeople(): Observable<PeopleListResult> {
    return this.http.post<PeopleListResult>('https://coffee.osumi.es/api/person/get-people', {});
  }
  
  saveCoffee(coffeData: CoffeeData): Observable<SaveResult> {
    return this.http.post<SaveResult>('https://coffee.osumi.es/api/coffee/save', coffeData);
  }
}