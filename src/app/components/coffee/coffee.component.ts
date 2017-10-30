import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColorsComponent } from '../colors/colors.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { ApiService } from '../../services/api.service';
import { DataShareService } from '../../services/data-share.service';

@Component({
  selector: 'coffee',
  templateUrl: './partials/coffee.component.html',
  styleUrls: ['./css/coffee.component.css']
})
export class CoffeeComponent implements OnInit {
  @ViewChild('colors') colors : ColorsComponent;
  @ViewChild('calendar') calendar : CalendarComponent;
  
  data = {
    day: 0,
    month: 0,
    year: 0
  };
  events = [];
  people = {};
  peopleList = [];

  constructor(private as: ApiService, private dss: DataShareService, private router: Router) {
    this.dss.setSaveLocalStorage(true);
    const d = new Date();
    this.data = {
      day: d.getDate(),
      month: d.getMonth(),
      year: d.getFullYear()
    };
	  this.as.getMonth(this.data.month+1, this.data.year).subscribe(result => {
  	  this.events = result.list;
  	  this.startCalendar();
    });
	  this.as.getPeople().subscribe(result => { this.people = result.people; this.loadPeopleList(); });
  }

  ngOnInit() {}
  
  startCalendar(){
    this.calendar.setDate(this.data);
    this.calendar.setEvents(this.events);
    this.calendar.draw();
  }
  
  loadPeopleList(){
    for(let person in this.people){
      this.peopleList.push( this.people[person] );
    }
    this.colors.loadColors(this.peopleList);
  }
  
  newDay(){
    const d = new Date();
    const day = {
		day: d.getDate(),
		month: d.getMonth()+1,
		year: d.getFullYear()
	};
	this.dss.setGlobal('day', day);
	this.router.navigate(['/day']);
  }
  
  selectDay(ev){
	this.dss.setGlobal('day', ev);
	this.router.navigate(['/day']);
  }
  
  changeOrder(mode, ev){
    ev.preventDefault();
    console.log(mode);
  }
}