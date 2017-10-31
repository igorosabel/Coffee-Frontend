import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DataShareService } from '../../services/data-share.service';
import { DialogService } from '../../services/dialog.service';
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
  payed = null;

  constructor(private as: ApiService, private dss: DataShareService, private dialog: DialogService, private router: Router) {
    this.dss.setSaveLocalStorage(true);
  }

  ngOnInit() {
    this.day = <CalendarDay> this.dss.getGlobal('day');
    const date = new Date(this.day.year, this.day.month-1, this.day.day);
    this.special = (date.getDay()===5);
	if (this.dss.getGlobal('people') === null){
      this.as.getPeople().subscribe(result => {
		  this.people = result.people;
		  this.dss.setGlobal('people', this.people);
		  this.loadPeopleList();
      });
    }
	else{
      this.people = this.dss.getGlobal('people');
      this.loadPeopleList();
	}
  }
  
  loadPeopleList(){
    for(let person in this.people){
      this.people[person].didGo = false;
      this.peopleList.push( this.people[person] );
    }
  }
  
  back(){
	  this.dss.removeGlobal('day');
	  this.router.navigate(['/']);
  }
  
  save(){
	  console.log(this.peopleList);
	  console.log(this.payed);
	  this.dialog
      .confirm('Izenburua', 'Mezua')
      .subscribe(res => console.log(res));
  }
}