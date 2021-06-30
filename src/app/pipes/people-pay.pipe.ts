import { Pipe, PipeTransform } from '@angular/core';
import { PeopleListResult } from '../interfaces/interfaces';
import { CommonService } from '../services/common.service';

@Pipe({
	name: 'peoplePay'
})
export class PeoplePayPipe implements PipeTransform {
	constructor(private common: CommonService) {}

	transform(id_person: number, people: PeopleListResult): string {
		return this.common.urldecode( people['person_'+id_person].name );
	}
}