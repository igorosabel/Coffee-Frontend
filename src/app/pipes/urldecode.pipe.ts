import { Pipe, PipeTransform } from '@angular/core';
import { CommonService } from '../services/common.service';

@Pipe({
	name: 'urldecode'
})
export class UrldecodePipe implements PipeTransform {
	constructor(private common: CommonService) { }

	transform(str: string): string {
		return this.common.urldecode(str);
	}  
}