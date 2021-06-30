import { Injectable }     from '@angular/core';
import { CalendarDay }    from '../model/calendar-day.class';
import { MonthResult }    from '../model/month-result.class';
import { MonthDayResult } from '../model/month-day-result.class';
import { DayResult }      from '../model/day-result.class';
import { PeopleResult }   from '../model/people-result.class';
import {
	CalendarDayInterface,
	MonthResultInterface,
	MonthDayResultInterface,
	DayResultInterface,
	PeopleResultInterface
} from '../interfaces/interfaces';

@Injectable({
	providedIn: 'root'
})
export class ClassMapperService {
	constructor() {}

	getCalendarDay(cd: CalendarDayInterface): CalendarDay {
		return new CalendarDay(
			cd.day,
			cd.month,
			cd.year
		);
	}

	getMonth(m: MonthResultInterface): MonthResult {
		const dayList: MonthDayResult[] = [];

		for (let d of m.list) {
			dayList.push( this.getMonthDay(d) );
		}

		return new MonthResult(
			m.status,
			m.m,
			m.y,
			dayList
		);
	}

	getMonthDay(d: MonthDayResultInterface): MonthDayResult {
		const dayList: DayResult[] = [];

		for (let i of d.list) {
			dayList.push( this.getDay(i) );
		}

		return new MonthDayResult(
			d.d,
			dayList
		);
	}

	getDay(i: DayResultInterface): DayResult {
		return new DayResult(
			i.id,
			i.id_person,
			i.people
		);
	}

	getPeople(list: any): PeopleResult[] {
		const people: PeopleResult[] = [];
console.log(list);
		for (let p of list) {
			people.push( this.getPeopleResult(p) );
		}

		return people;
	}

	getPeopleResult(p: PeopleResultInterface): PeopleResult {
		return new PeopleResult(
			p.id,
			p.name,
			p.num_coffee,
			p.num_pay,
			p.num_special,
			p.num_special_pay,
			p.color,
			p.did_go
		);
	}
}