import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { ApiService }        from '../../services/api.service';
import { DataShareService }  from '../../services/data-share.service';
import { CommonService }     from '../../services/common.service';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: []
})
export class PersonComponent implements OnInit {
  id: number;
  private sub: any;
  name: string = '';
  color: string = '#000';
  headerColor: string = '#fff';
  coffees = [];

  constructor(private common: CommonService, private as: ApiService, private dss: DataShareService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];

      this.as.getPerson(this.id).subscribe(result => {
        this.name = this.common.urldecode(result.name);
        this.color = this.common.urldecode(result.color);
        this.headerColor = this.common.invertColor(this.color,true);
        let list = [];
        for (let i in result.list){
          list.push({
            id: result.list[i].id,
            d: result.list[i].d,
            m: result.list[i].m,
            y: result.list[i].y,
            special: result.list[i].special,
            pay: (result.list[i].id_person===this.id)
          });
        }
        this.coffees = list;
      });
    });
  }
}
