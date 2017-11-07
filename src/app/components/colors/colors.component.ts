import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'colors',
  templateUrl: './partials/colors.component.html',
  styleUrls: ['./css/colors.component.css']
})
export class ColorsComponent implements OnInit {
  
  css = '';

  constructor(@Inject(DOCUMENT) private document, private common: CommonService) { }

  ngOnInit() {}
  
  loadColors(peopleList){
    for (let i in peopleList){
      this.css += `
        .person_${peopleList[i].id}{
          color: ${this.common.invertColor(peopleList[i].color,true)} !important;
          background-color: ${peopleList[i].color} !important;
          width: 100%;
          height: 42px;
          margin-top: 3px;
          padding-left: 10px;
          display: flex;
          align-items: center;
        }
      `;
    }
    const st = this.document.createElement('style');
    st.type = 'text/css';
    st.innerHTML = this.css;
    this.document.querySelector('head').appendChild(st);
  }
}