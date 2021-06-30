import { CalendarDayInterface } from '../interfaces/interfaces';

export class CalendarDay {
	constructor(
		public day: number = null,
		public month: number = null,
		public year: number = null
	) {}

	toInterface(): CalendarDayInterface {
		return {
			day: this.day,
			month: this.month,
			year: this.year
		};
	}
}