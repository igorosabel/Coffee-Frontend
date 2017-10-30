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
	
  day = {};
  special = false;
  people = [];

  constructor(private dss: DataShareService, private router: Router) {}

  ngOnInit() {
    this.day = <CalendarDay>this.dss.getGlobal('day');
	const date = new Date(this.day.year, this.day.month-1, this.day.day);
	this.special = (date.getDay()===5);
    console.log(this.day);
  }
  
  back(){
	  this.dss.removeGlobal('day');
	  this.router.navigate(['/']);
  }
  
  save(){
	  
  }

}