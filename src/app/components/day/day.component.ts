import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DataShareService } from '../../services/data-share.service';
import { DialogService } from '../../services/dialog.service';
import { CalendarDay } from '../../interfaces/interfaces';
import { DialogOptions } from '../../interfaces/interfaces';

@Component({
  selector: 'detail',
  templateUrl: './partials/day.component.html',
  styleUrls: ['./css/day.component.css']
})
export class DayComponent implements OnInit {
	
  day: CalendarDay = {day: 0, month: 0, year: 0};
  idCoffee = 0;
  special = false;
  people = {};
  peopleList = [];
  payed = null;
  sending = false;

  constructor(private as: ApiService, private dss: DataShareService, private dialog: DialogService, private router: Router) {
    this.dss.setSaveLocalStorage(true);
  }

  ngOnInit() {
    this.idCoffee = this.dss.getGlobal('idDay');
    this.day = <CalendarDay> this.dss.getGlobal('day');
    const date = new Date(this.day.year, this.day.month-1, this.day.day);
    this.special = (date.getDay()===5);
	  
	  if (this.idCoffee===null){
  	  this.as.getDay(this.day).subscribe(result => {
  	    this.idCoffee = result.id_coffee;
  	    this.payed = result.id_pay;
  	  
  	    this.people = result.list;
  	    this.loadPeopleList();
	    });
	  }
	  else{
	    this.as.getCoffee(this.idCoffee).subscribe(result => {
  	    this.idCoffee = result.id_coffee;
  	    this.payed = result.id_pay;
  	  
  	    this.people = result.list;
  	    this.loadPeopleList();
	    });
	  }
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
    let ok = false;
    for (let i in this.peopleList){
      if (this.peopleList[i].did_go){
        ok = true;
        break;
      }
    }
    if (!ok){
      this.dialog.alert({title: 'Errorea', content: 'Ez da inor joan kafera?', ok: 'Ados'});
      return false;
    }
    
    if (this.payed===null){
      this.dialog.alert({title: 'Errorea', content: 'Ez du inor ordaindu?', ok: 'Ados'});
      return false;
    }
    
    this.sending = true;
    const saveObj = {
      id: this.idCoffee,
      d: this.day.day,
      m: this.day.month,
      y: this.day.year,
      special: this.special,
      id_pay: this.payed,
      list: []
    };
    
    for (let i in this.peopleList){
      if (this.peopleList[i].did_go){
        saveObj.list.push(this.peopleList[i].id);
      }
    }
    
    this.as.saveCoffee(saveObj).subscribe(result => {
      if (result.status==='ok'){
        this.dss.removeGlobal('events');
        this.router.navigate(['/']);
      }
      else{
        this.dialog.alert({title: 'Errorea', content: 'Akats bat gertatu da datuak gordetzerakoan.', ok: 'Ados'});
      }
    });
  }
  
  deleteDay(){
    this.dialog.confirm({title: 'Kafea ezabatu', content: 'Ziur zaude kafe hau ezabatu nahi duzula?', ok: 'Ados', cancel: 'Utzi'})
    .subscribe(result => {
      if (result===true){
        this.as.deleteCoffee(this.idCoffee).subscribe(result => {
          this.dss.removeGlobal('events');
          this.back();
        });
      }
    });
  }
  
  addNew(){
    this.idCoffee = 0;
    for (let i in this.peopleList){
      this.peopleList[i].did_go = false;
    }
    this.payed = null;
  }
}