import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  changeOrder(mode, ev){
    ev.preventDefault();
    console.log(mode);
  }

}
