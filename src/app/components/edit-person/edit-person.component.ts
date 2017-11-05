import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-person',
  templateUrl: './partials/edit-person.component.html',
  styleUrls: ['./css/edit-person.component.css']
})
export class EditPersonComponent implements OnInit {
  id: number;
  private sub: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];
    });
  }

}