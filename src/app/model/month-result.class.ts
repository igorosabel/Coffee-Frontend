import { MonthDayResult } from './month-day-result.class';
import {
	MonthResultInterface,
	MonthDayResultInterface
} from '../interfaces/interfaces';

export class MonthResult {
	constructor(
		public status: string = null,
		public m: number = null,
		public y: number = null,
		public list: MonthDayResult[] = []
	) {}

	toInterface(): MonthResultInterface {
		const list: MonthDayResultInterface[] = [];

		for (let md of this.list) {
			list.push(md.toInterface());
		}

		return {
			status: this.status,
			m: this.m,
			y: this.y,
			list: list
		}
	}
}
