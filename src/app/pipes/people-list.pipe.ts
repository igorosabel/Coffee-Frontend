import { Pipe, PipeTransform } from '@angular/core';
import { PeopleListResult } from '../interfaces/interfaces';
import { CommonService } from '../services/common.service';

@Pipe({
  name: 'peopleList'
})
export class PeopleListPipe implements PipeTransform {
  
  constructor(private common: CommonService) { }

  transform(list: number[], people: PeopleListResult): string {
    const aux = [];
    list.forEach(num => aux.push( this.common.urldecode(people['person_'+num].name) ));
    return aux.join(', ');
  }

}