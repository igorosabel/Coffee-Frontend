import { HttpClient }  from '@angular/common/http';
import { Injectable }  from '@angular/core';
import { Observable }  from 'rxjs';
import { environment } from '../../environments/environment';
import {
	MonthResultInterface,
	PeopleListResult,
	CoffeeData,
	StatusResult,
	CalendarDay,
	DayData,
	Person,
	PersonResult,
	PersonDetailResult
} from '../interfaces/interfaces';

@Injectable()
export class ApiService {
	apiUrl = environment.apiUrl;

	constructor(private http : HttpClient) {}

	getMonth(month: number, year: number): Observable<MonthResultInterface> {
		return this.http.post<MonthResultInterface>(this.apiUrl + 'coffee/get-month-list', {month, year});
	}

	getPeople(): Observable<PeopleListResult> {
		return this.http.post<PeopleListResult>(this.apiUrl + 'person/get-people', {});
	}

	saveCoffee(coffeData: CoffeeData): Observable<StatusResult> {
		return this.http.post<StatusResult>(this.apiUrl + 'coffee/save', coffeData);
	}

	getDay(day: CalendarDay): Observable<DayData> {
		return this.http.post<DayData>(this.apiUrl + 'get-day', day);
	}

	getCoffee(id: number): Observable<DayData> {
		return this.http.post<DayData>(this.apiUrl + 'coffee/get', {id});
	}

	deleteCoffee(id: number): Observable<StatusResult> {
		return this.http.post<StatusResult>(this.apiUrl + 'coffee/delete', {id});
	}

	savePerson(person: Person): Observable<PersonResult> {
		return this.http.post<PersonResult>(this.apiUrl + 'person/save', person);
	}

	deletePerson(id: number): Observable<StatusResult> {
		return this.http.post<StatusResult>(this.apiUrl + 'person/delete', {id});
	}

	getPerson(id: number): Observable<PersonDetailResult> {
		return this.http.post<PersonDetailResult>(this.apiUrl + 'person/get', {id});
	}
}