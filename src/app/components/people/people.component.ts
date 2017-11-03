import { Component, ViewChild, OnInit } from '@angular/core';
import { ColorsComponent } from '../colors/colors.component';
import { ApiService } from '../../services/api.service';
import { DataShareService } from '../../services/data-share.service';

@Component({
  selector: 'app-people',
  templateUrl: './partials/people.component.html',
  styleUrls: ['./css/people.component.css']
})
export class PeopleComponent implements OnInit {
  @ViewChild('colors') colors : ColorsComponent;
  
  people = {};
  peopleList = [];

  constructor(private as: ApiService, private dss: DataShareService) { }

  ngOnInit() {
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
      this.peopleList.push( this.people[person] );
    }
    this.colors.loadColors(this.peopleList);
  }

}