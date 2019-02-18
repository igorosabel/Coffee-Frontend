import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService }             from '../../services/api.service';
import { DataShareService }       from '../../services/data-share.service';
import { DialogService }          from '../../services/dialog.service';
import { Person }                 from '../../interfaces/interfaces';

@Component({
  selector: 'app-edit-person',
  templateUrl: './html/edit-person.component.html',
  styleUrls: ['./css/edit-person.component.css']
})
export class EditPersonComponent implements OnInit {
  id: number;
  private sub: any;
  name: string = '';
  color: string = '#ffffff';
  sending: boolean = false;

  people = {};

  constructor(private as: ApiService, private dss: DataShareService, private dialog: DialogService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];
	   this.loadPerson();
    });
  }

  loadPerson() {
	if (this.dss.getGlobal('people') === null){
      this.as.getPeople().subscribe(result => {
		  this.people = result.people;
		  this.dss.setGlobal('people', this.people);
		  this.loadPerson();
      });
    }
    else{
      if (!this.people['person_'+this.id]){
        this.dss.removeGlobal('people');
        this.loadPerson();
      }
      else{
        this.name = this.people['person_'+this.id].name;
        this.color = this.people['person_'+this.id].color;
      }
    }
  }

  save() {
    if (this.name===''){
      this.dialog.alert({title: 'Errorea', content: 'Izena ezinbestekoa da!', ok: 'Ados'});
      return false;
    }
    if (this.color===''){
      this.dialog.alert({title: 'Errorea', content: 'Kolore bat aukeratu behar duzu!', ok: 'Ados'});
      return false;
    }

    this.sending = true;
    const person: Person = {
      id: this.id,
      name: this.name,
      color: this.color
    }
    this.as.savePerson(person).subscribe(result => {
      this.sending = false;
      if (result.status==='ok'){
        this.dss.removeGlobal('people')
        this.router.navigate(['/people']);
      }
      else{
        this.dialog.alert({title: 'Errorea', content: 'Errore bat gertatu da kafezalea editatzerakoan!', ok: 'Ados'});
      }
    });
  }

  deletePerson() {
	this.dialog.confirm({title: 'Kafezalea ezabatu', content: 'Ziur zaude pertsona hau ezabatu nahi duzula?', ok: 'Ados', cancel: 'Utzi'})
    .subscribe(result => {
      if (result===true){
        this.as.deletePerson(this.id).subscribe(result => {
          this.dss.removeGlobal('people');
          this.router.navigate(['/people']);
        });
      }
    });
  }
}
