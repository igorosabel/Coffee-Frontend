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
  
  content = '';

  constructor(public media:ObservableMedia) {
    this.content = this.draw();
  }

  ngOnInit() {}
  
  getDate(){
    return {d: this.day, m: this.month, y: this.year};
  }
  
  header(){
    const months = this.media.isActive('gt-xs') ? this.months : this.monthsShort;
    const days   = this.media.isActive('gt-xs') ? this.days   : this.daysShort;
    let header = `
      <div class="calendar-header">
        <a href="#" class="calendar-previous">&lt;</a>
        ${months[this.month]} ${this.year}
        <a href="#" class="calendar-next">&gt;</a>
      </div>
      <div class="calendar-row">`;
    for (let i in days){
      header += `<div class="calendar-header-day">${days[i]}</div>`;
    }
    header += `</div>`;
    return  header;
  }
  otherMonthDay(day){
    return `<div class="calendar-day-other">${day}</div>`;
  }
  currentMonthDay(day){
    const now = new Date();
    let today = (this.year===now.getFullYear() && this.month===now.getMonth() && this.day===day) ? ' calendar-today' : '';
    let clickable = (this.selectDay===null) ? '' : ' calendar-clickable';
    let marked = '';
    if (this.marked[this.year] && this.marked[this.year][this.month+1] && this.marked[this.year][this.month+1][day]){
      marked = ' ' + this.marked[this.year][this.month+1][day];
    }
    return `<div class="calendar-day${today}${clickable}${marked}">${day}</div>`;
  }
  draw(){
    // Obtengo el primer día del mes y el primer día de la semana
    const firstDay = new Date(this.year, this.month, 1);
    const firstDayWeekday = firstDay.getDay() === 0 ? 7 : firstDay.getDay();

    // Obtengo número de días en el mes
    const monthLength = new Date(this.year, this.month+1, 0).getDate();
    const previousMonthLength = new Date(this.year, this.month, 0).getDate();

    let html = `<div class="calendar-all">`;

    // Cabecera del calendario
    html += this.header();

    // Contenido del calendario
    html += `<div class="calendar-table">`;

    // Variables con valores por defecto para los días
    let day  = 1; // Día actual del mes
    let prev = 1; // Días del mes anterior
    let next = 1; // Días del mes siguiente

    html += `<div class="calendar-row">`;
    // Bucle de semanas (filas)
    for (let i = 0; i < 9; i++){
      // Bucle días de la semana (celdas)
      for (let j = 1; j <= 7; j++){
        if (day <= monthLength && (i > 0 || j >= firstDayWeekday)){
          // Mes actual
          html += this.currentMonthDay(day);
          day++;
        }
        else{
          if (day <= monthLength) {
            // Mes anterior
            html += this.otherMonthDay( previousMonthLength - firstDayWeekday + prev + 1 );
            prev++;
          }
          else{
            // Mes siguiente
            html += this.otherMonthDay(next);
            next++;
          }
        }
      }

      // Paro de hacer filas si es el final del mes
      if (day > monthLength) {
        html += `</div>`;
        break;
      } else {
        html += `</div><div class="calendar-row">`;
      }
    }
    html += `
      </div>
    </div>`;

    return html;
  }

}
