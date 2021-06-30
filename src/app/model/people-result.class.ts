import { PeopleResultInterface } from '../interfaces/interfaces';

export class PeopleResult {
	constructor(
		public id: number = null,
		public name: string = null,
		public num_coffee: number = null,
		public num_pay: number = null,
		public num_special: number = null,
		public num_special_pay: number = null,
		public color: string = null,
		public did_go: boolean = false
	) {}
	
	toInterface(): PeopleResultInterface {
		return {
			id: this.id,
			name: this.name,
			num_coffee: this.num_coffee,
			num_pay: this.num_pay,
			num_special: this.num_special,
			num_special_pay: this.num_special_pay,
			color: this.color,
			did_go: this.did_go
		};
	}
}