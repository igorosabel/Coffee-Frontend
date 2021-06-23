import { DayResultInterface } from '../interfaces/interfaces';

export class DayResult {
	constructor(
		public id: number = null,
		public id_person: number = null,
		public people: number[] = []
	) {}

	toInterface(): DayResultInterface {
		return {
			id: this.id,
			id_person: this.id_person,
			people: this.people
		};
	}
}
