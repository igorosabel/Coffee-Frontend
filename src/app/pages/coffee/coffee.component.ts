import { Component, ViewChild, OnInit } from '@angular/core';
import { Router }                       from '@angular/router';
import { SwPush }                       from '@angular/service-worker';
import { ColorsComponent }              from '../../components/colors/colors.component';
import { CalendarComponent }            from '../../components/calendar/calendar.component';
import { ApiService }                   from '../../services/api.service';
import { DataShareService }             from '../../services/data-share.service';
import { CalendarDay }                  from '../../interfaces/interfaces';
import { MonthDayResult, PeopleResult } from '../../interfaces/interfaces';

@Component({
  selector: 'coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss']
})
export class CoffeeComponent implements OnInit {
  @ViewChild('colors', { static: true }) colors : ColorsComponent;
  @ViewChild('calendar', { static: true }) calendar : CalendarComponent;

  data: CalendarDay = {day: 0, month: 0, year: 0};
  events: MonthDayResult[] = [];
  people = {};
  peopleList: PeopleResult[] = [];
  sortField: string = 'percentage';
  sortOrder: string = 'down';

  sub: PushSubscription;
  readonly VAPID_PUBLIC_KEY = "BJmNESR66LzKi6Br7STuqAZaCE47ZAnczDDJbrd3uMP-TsFbIuq2XpE1eVQF2JaygS80q6YG5Bkuxgb0sS5q1Wo";
  // {"publicKey":"BJmNESR66LzKi6Br7STuqAZaCE47ZAnczDDJbrd3uMP-TsFbIuq2XpE1eVQF2JaygS80q6YG5Bkuxgb0sS5q1Wo","privateKey":"5XlB5qZeYEQXWAUZx4mfHSLHqYdfLfqJ12pu9UVDL4Y"}

  constructor(private as: ApiService, private dss: DataShareService, private router: Router, private swPush: SwPush) {
    this.dss.setSaveLocalStorage(true);
  }

  ngOnInit() {
    const d = new Date();
    this.data = {
      day: d.getDate(),
      month: d.getMonth(),
      year: d.getFullYear()
    };
    if (this.dss.getGlobal('data') === null){
      this.dss.setGlobal('data', this.data);
    }
    else{
      const checkData = this.dss.getGlobal('data');
      if (this.data.day!==checkData.day || this.data.month!==checkData.month || this.data.year!==checkData.year){
        this.dss.resetGlobals();
        this.dss.setGlobal('data', this.data);
      }
    }
    if (this.dss.getGlobal('events') === null){
      this.as.getMonth(this.data.month+1, this.data.year).subscribe(result => {
  	    this.events = result.list;
	      this.dss.setGlobal('events', this.events);
  	    this.startCalendar();
      });
	  }
    else{
       this.events = this.dss.getGlobal('events');
       this.startCalendar();
	  }
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

  startCalendar() {
    this.calendar.setDate(this.data);
    this.calendar.setEvents(this.events);
    this.calendar.draw();
  }

  loadPeopleList() {
    for(let person in this.people){
      this.peopleList.push( this.people[person] );
    }
    this.colors.loadColors(this.peopleList);
  }

  newDay() {
    const d = new Date();
    const day = <CalendarDay>{
  		day: d.getDate(),
  		month: d.getMonth()+1,
  		year: d.getFullYear()
  	};
  	this.dss.setGlobal('day', day);
  	this.router.navigate(['/day']);
  }

  selectDay(ev) {
    const day = this.events.find(function (obj) { return obj.d === ev.day; });
	  this.dss.setGlobal('day', ev);
	  if (day && day.list.length>1){
  	  this.router.navigate(['/day-list']);
	  }
	  else{
      if (day){
        this.dss.setGlobal('idDay', day.list[0].id);
      }
      else{
        this.dss.setGlobal('idDay', null);
      }
      this.router.navigate(['/day']);
	  }
  }

  changeMonth(ev) {
    this.dss.removeGlobal('data');
    this.dss.removeGlobal('events');

    this.data = ev;
    this.dss.setGlobal('data', this.data);

    this.as.getMonth(this.data.month+1, this.data.year).subscribe(result => {
	    this.events = result.list;
      this.dss.setGlobal('events', this.events);
	    this.startCalendar();
    });
  }

  listOrder() {
    if (this.sortField=='percentage'){
      if (this.sortOrder=='down'){
        this.peopleList.sort(function(a, b) {
          return (b.num_pay / b.num_coffee) - (a.num_pay / a.num_coffee);
        });
      }
      if (this.sortOrder=='up'){
        this.peopleList.sort(function(a, b) {
          return (a.num_pay / a.num_coffee) - (b.num_pay / b.num_coffee);
        });
      }
    }
    if (this.sortField=='special'){
      if (this.sortOrder=='down'){
        this.peopleList.sort(function(a, b) {
          return (b.num_special_pay / b.num_special) - (a.num_special_pay / a.num_special);
        });
      }
      if (this.sortOrder=='up'){
        this.peopleList.sort(function(a, b) {
          return (a.num_special_pay / a.num_special) - (b.num_special_pay / b.num_special);
        });
      }
    }
  }

  changeOrder(mode, ev) {
    ev.preventDefault();
    this.sortField = mode;
    this.sortOrder = (this.sortOrder=='up') ? 'down' : 'up';
    this.listOrder();
  }

  goToPerson(id) {
    this.router.navigate(['/person', id]);
  }

  subscribeToNotifications() {
    console.log('subscribe');
    console.log(this.swPush);

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => {
      this.sub = sub;
      console.log("Notification Subscription: ", sub);
      /*this.newsletterService.addPushSubscriber(sub).subscribe(
          () => console.log('Sent push subscription object to server.'),
          err =>  console.log('Could not send subscription object to server, reason: ', err)
      );*/
      })
      .catch(err => console.error("Could not subscribe to notifications", err));
  }
}
