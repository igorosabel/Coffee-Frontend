import { Pipe, PipeTransform } from '@angular/core';
import { PeopleResult } from '../interfaces/interfaces';

@Pipe({
	name: 'percentageTotal'
})
export class PercentageTotalPipe implements PipeTransform {
	transform(person: PeopleResult): string {
		let num = 0;
		if (person.num_special!==0) {
			num = Math.floor((person.num_special_pay / person.num_special) * 100);
		}
		return `${num}% (${person.num_special_pay}/${person.num_special})`;
	}
}