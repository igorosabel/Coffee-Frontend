import { DayResult } from './day-result.class';
import {
	DayResultInterface,
	MonthDayResultInterface
} from '../interfaces/interfaces';

export class MonthDayResult {
	constructor(
		public d: number = null,
		public list: DayResult[] = []
	) {}

	toInterface(): MonthDayResultInterface {
		const list: DayResultInterface[] = [];
		for (let d of this.list) {
			list.push(d.toInterface());
		}

		return {
			d: this.d,
			list: list
		};
	}
}
