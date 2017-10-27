import { Component, ViewChild, OnInit } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'coffee',
  templateUrl: './partials/coffee.component.html',
  styleUrls: ['./css/coffee.component.css']
})
export class CoffeeComponent implements OnInit {
  @ViewChild('calendar') calendar : CalendarComponent;
  
  data = {
    day: 0,
    month: 0,
    year: 0
  };
  events = [];

  constructor(private as: ApiService) {
    const d = new Date();
    this.data = {
      day: d.getDate(),
      month: d.getMonth(),
      year: d.getFullYear()
    };
	this.as.getMonth(this.data.month, this.data.year).subscribe(result => this.events = result.list);
  }

  ngOnInit() {
    this.startCalendar();
  }
  
  startCalendar(){
	this.calendar.setDate(this.data);
	this.calendar.draw();
  }
  
  changeOrder(mode, ev){
    ev.preventDefault();
    console.log(mode);
  }
}