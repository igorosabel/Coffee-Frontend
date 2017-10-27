import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'calendar',
  templateUrl: './partials/calendar.component.html',
  styleUrls: ['./css/calendar.component.css']
})
export class CalendarComponent implements OnInit {

  months = ['Urtarrila','Otsaila','Martxoa','Apirila','Maiatza','Ekaina','Uztaila','Abuztua','Iraila','Urria','Azaroa','Abendua'];
  monthsShort = ['Urt','Ots','Mar','Api','Mai','Eka','Uzt','Abu','Ira','Urr','Aza','Abe'];
  days = ['Astelehena','Asteartea','Asteazkena','Osteguna','Ostirala','Larunbata','Igandea'];
  daysShort = ['Asl','Ast','Asz','Ost','Osi','Lar','Iga'];
  
  day = null;
  month = null;
  year = null;
  selectDay = null;
  marked = {};
  
  currentMonth = null;
  currentYear = null;
  headerDays = [];
  rows = [];
  
  constructor(public media:ObservableMedia) {}

  ngOnInit() {}
  
  setDate(d){
	  this.day = d.day;
	  this.month = d.month;
	  this.year = d.year;
  }
  
  getDate(){
    return {d: this.day, m: this.month, y: this.year};
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
    let clickable = (this.selectDay===null) ? '' : ' calendar-clickable';
    let marked = '';
    if (this.marked[this.year] && this.marked[this.year][this.month+1] && this.marked[this.year][this.month+1][day]){
      marked = ' ' + this.marked[this.year][this.month+1][day];
    }
    return {class:'calendar-day'+today+clickable+marked, day: day};
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
