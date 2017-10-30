import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../../services/data-share.service';

@Component({
  selector: 'detail',
  templateUrl: './partials/day.component.html',
  styleUrls: ['./css/day.component.css']
})
export class DayComponent implements OnInit {
	
  day = {};

  constructor(private dss: DataShareService) {
	  this.day = this.dss.getGlobal('day');
	  console.log(this.day);
  }

  ngOnInit() {}

}