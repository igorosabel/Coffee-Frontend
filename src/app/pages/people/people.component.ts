import { Component, ViewChild, OnInit } from '@angular/core';
import { Router }                       from '@angular/router';
import { ColorsComponent }              from '../../components/colors/colors.component';
import { ApiService }                   from '../../services/api.service';
import { DataShareService }             from '../../services/data-share.service';
import {  PeopleResult }                from '../../interfaces/interfaces';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: []
})
export class PeopleComponent implements OnInit {
  @ViewChild('colors', { static: true }) colors : ColorsComponent;

  people = {};
  peopleList: PeopleResult[] = [];

  constructor(private as: ApiService, private dss: DataShareService, private router: Router) {}

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

  loadPeopleList() {
    for (let person in this.people){
      this.peopleList.push( this.people[person] );
    }
    this.colors.loadColors(this.peopleList);
  }

  editPerson(id) {
	  this.router.navigate(['/edit-person', id]);
  }
}