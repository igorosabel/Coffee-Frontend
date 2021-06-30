import { Injectable }     from '@angular/core';
import { CalendarDay }    from '../model/calendar-day.class';
import { MonthResult }    from '../model/month-result.class';
import { MonthDayResult } from '../model/month-day-result.class';
import { DayResult }      from '../model/day-result.class';

import {
	CalendarDayInterface,
	MonthResultInterface,
	MonthDayResultInterface
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
			
		}

		return new MonthDayResult(
			d.d,
			dayList
		);
	}
}