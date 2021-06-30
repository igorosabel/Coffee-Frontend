import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'formatNum'
})
export class FormatNumPipe implements PipeTransform {
	transform(num: string): string {
		const check = parseInt(num);
		return (check<10) ? '0' + check : check.toString();
	}
}