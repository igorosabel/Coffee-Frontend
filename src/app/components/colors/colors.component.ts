import { Component, Inject } from '@angular/core';
import { DOCUMENT }          from "@angular/common";
import { CommonService }     from '../../services/common.service';

@Component({
	selector: 'colors',
	template: '',
	styleUrls: []
})
export class ColorsComponent {
	css: string = '';

	constructor(@Inject(DOCUMENT) private document, private common: CommonService) { }

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