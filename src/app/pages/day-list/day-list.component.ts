import { Component, OnInit }           from '@angular/core';
import { Router }                      from '@angular/router';
import { ApiService }                  from '../../services/api.service';
import { DataShareService }            from '../../services/data-share.service';
import { MonthDayResultInterface, CalendarDay } from '../../interfaces/interfaces';

@Component({
  selector: 'app-day-list',
  templateUrl: './day-list.component.html',
  styleUrls: []
})
export class DayListComponent implements OnInit {
  day: CalendarDay = {day: 0, month: 0, year: 0};
  events: MonthDayResultInterface[] = [];
  people = {};
  selectedDay: MonthDayResultInterface;

  constructor(private as: ApiService, private dss: DataShareService, private router: Router) {
    this.dss.setSaveLocalStorage(true);
  }

  ngOnInit() {
    this.day = <CalendarDay> this.dss.getGlobal('day');
    if (this.dss.getGlobal('events') === null){
      this.as.getMonth(this.day.month+1, this.day.year).subscribe(result => {
  	    this.events = result.list;
	      this.dss.setGlobal('events', this.events);
  	    this.loadPeopleList();
      });
	  }
    else{
       this.events = this.dss.getGlobal('events');
       this.loadPeopleList();
	  }
  }

  back() {
	  this.dss.removeGlobal('day');
	  this.router.navigate(['/']);
  }

  loadPeopleList() {
    if (this.dss.getGlobal('people') === null){
      this.as.getPeople().subscribe(result => {
		    this.people = result.people;
        this.dss.setGlobal('people', this.people);
        this.loadDayList();
      });
    }
    else{
      this.people = this.dss.getGlobal('people');
      this.loadDayList();
	  }
  }

  loadDayList() {
    const check = this.day.day;
    this.selectedDay = this.events.find(function (obj) { return obj.d === check; });
  }

  goToEvent(id) {
    this.dss.setGlobal('idDay', id);
    this.router.navigate(['/day']);
  }
}
