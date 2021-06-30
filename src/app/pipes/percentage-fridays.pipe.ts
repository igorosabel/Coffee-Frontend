import { Pipe, PipeTransform } from '@angular/core';
import { PeopleResult } from '../model/people-result.class';

@Pipe({
	name: 'percentageFridays'
})
export class PercentageFridaysPipe implements PipeTransform {
	transform(person: PeopleResult): string {
		let num = 0;
		if (person.num_coffee!==0) {
			num = Math.floor((person.num_pay / person.num_coffee) * 100);
		}
		return `${num}% (${person.num_pay}/${person.num_coffee})`;
	}
}