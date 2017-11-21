import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'calendar',
  templateUrl: './partials/calendar.component.html',
  styleUrls: ['./css/calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Output() select = new EventEmitter();
  @Output() change = new EventEmitter();

  months = ['Urtarrila','Otsaila','Martxoa','Apirila','Maiatza','Ekaina','Uztaila','Abuztua','Iraila','Urria','Azaroa','Abendua'];
  monthsShort = ['Urt','Ots','Mar','Api','Mai','Eka','Uzt','Abu','Ira','Urr','Aza','Abe'];
  days = ['Astelehena','Asteartea','Asteazkena','Osteguna','Ostirala','Larunbata','Igandea'];
  daysShort = ['Asl','Ast','Asz','Ost','Osi','Lar','Iga'];
  
  day = null;
  month = null;
  year = null;
  events = [];
  marked = {};
  
  currentMonth = null;
  currentYear = null;
  headerDays = [];
  rows = [];
  
  constructor(public media:ObservableMedia) {}

  ngOnInit() {}
  
  selectDay(d){
    this.select.emit({day: d.day, month: this.month+1, year: this.year});
  }
  
  setDate(d){
	  this.day = d.day;
	  this.month = d.month;
	  this.year = d.year;
  }
  
  getDate(){
    return {day: this.day, month: this.month, year: this.year};
  }
  
  setEvents(events){
    this.rows = [];
    this.events = events;
    this.marked = {};
    this.events.forEach(element => this.marked[element.d] = element);
  }
  
  previousMonth(ev){
    ev.preventDefault();
    this.month--;
    if (this.month==-1){
      this.month = 11;
      this.year--;
    }
    this.setEvents([]);
    this.change.emit(this.getDate());
  }
  
  nextMonth(ev){
    ev.preventDefault();
    this.month++;
    if (this.month==12){
      this.month = 0;
      this.year++;
    }
    this.setEvents([]);
    this.change.emit(this.getDate());
  }
  
  header(){
    const months = this.media.isActive('gt-xs') ? this.months : this.monthsShort;
    const days = this.media.isActive('gt-xs') ? this.days   : this.daysShort;
	
    this.currentMonth = months[this.month];
    this.currentYear = this.year;
    this.headerDays = days;
  }
  
  otherMonthDay(day){
    return {class:'calendar-day-other', day: day};
  }
  
  currentMonthDay(day){
    const now = new Date();
    let today = (this.year===now.getFullYear() && this.month===now.getMonth() && this.day===day) ? ' calendar-today' : '';
    let marked = '';
    console.log(this.marked);
    console.log(day);
    if (this.marked[day] && this.marked[day].list && this.marked[day].list.length==1){
      marked = ' person_' + this.marked[day].list[0].id_person;
    }
    return {class:'calendar-day calendar-clickable'+today+marked, day: day, events: this.marked[day]};
  }
  
  draw(){
    // Obtengo el primer día del mes y el primer día de la semana
    const firstDay = new Date(this.year, this.month, 1);
    const firstDayWeekday = firstDay.getDay() === 0 ? 7 : firstDay.getDay();

    // Obtengo número de días en el mes
    const monthLength = new Date(this.year, this.month+1, 0).getDate();
    const previousMonthLength = new Date(this.year, this.month, 0).getDate();

    // Cabecera del calendario
    this.header();

    // Contenido del calendario
    // Variables con valores por defecto para los días
    let day  = 1; // Día actual del mes
    let prev = 1; // Días del mes anterior
    let next = 1; // Días del mes siguiente
	  let nextMonth = false;

    // Bucle de semanas (filas)
    for (let i = 0; i < 9; i++){
	  if (nextMonth){ continue; }
	  let days = [];
	  
      // Bucle días de la semana (celdas)
      for (let j = 1; j <= 7; j++){
        if (day <= monthLength && (i > 0 || j >= firstDayWeekday)){
          // Mes actual
          days.push( this.currentMonthDay(day) );
          day++;
        }
        else{
          if (day <= monthLength) {
            // Mes anterior
            days.push( this.otherMonthDay( previousMonthLength - firstDayWeekday + prev + 1 ) );
            prev++;
          }
          else{
            // Mes siguiente
            days.push( this.otherMonthDay(next) );
            next++;
			      nextMonth = true;
          }
        }
      }
	  
	    this.rows.push(days);
    }
  }
}