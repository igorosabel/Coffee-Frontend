import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataShareService } from '../../services/data-share.service';
import { CalendarDay } from '../../interfaces/interfaces';

@Component({
  selector: 'detail',
  templateUrl: './partials/day.component.html',
  styleUrls: ['./css/day.component.css']
})
export class DayComponent implements OnInit {
	
  day: CalendarDay = {day: 0, month: 0, year: 0};
  special = false;
  people = {};
  peopleList = [];

  constructor(private dss: DataShareService, private router: Router) {
    this.dss.setSaveLocalStorage(true);
  }

  ngOnInit() {
    this.day = <CalendarDay> this.dss.getGlobal('day');
    const date = new Date(this.day.year, this.day.month-1, this.day.day);
    this.special = (date.getDay()===5);
    this.people = this.dss.getGlobal('people');
    this.loadPeopleList();
  }
  
  loadPeopleList(){
    for(let person in this.people){
      this.peopleList.push( this.people[person] );
    }
  }
  
  back(){
	  this.dss.removeGlobal('day');
	  this.router.navigate(['/']);
  }
  
  save(){
	  
  }
}