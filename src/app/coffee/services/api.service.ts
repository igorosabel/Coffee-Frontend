import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class ApiService {

  constructor(private http : Http){}

  getMonth(month: number, year: number): Observable<MonthResult> {
    return this.http.post("https://coffee.osumi.es/api/coffee/get-month", {month, year}).map((response:Response) => response.json());
  }
  
  getPeople(): Observable<PeopleListResult> {
    return this.http.post("https://coffee.osumi.es/api/person/get-people", {}).map((response:Response) => response.json());
  }
}

export interface MonthResult {
  status: string;
  m: number;
  y: number;
  list: MonthDayResult[];
}

export interface MonthDayResult {
	d: number;
	id_person: number;
	people: number[];
}


export interface PeopleListResult {
  [key: string]: PeopleResult
}

export interface PeopleResult {
  id: number;
  name: string;
  num_coffee: number;
  num_pay: number;
  num_special: number;
  num_special_pay: number;
  color: string;
  did_go: boolean;
}