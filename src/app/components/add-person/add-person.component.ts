import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DataShareService } from '../../services/data-share.service';
import { DialogService } from '../../services/dialog.service';
import { Person } from '../../interfaces/interfaces';

@Component({
  selector: 'app-add-person',
  templateUrl: './partials/add-person.component.html',
  styleUrls: ['./css/add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  
  name = '';
  color = '#ffffff';
  sending = false;

  constructor(private as: ApiService, private dss: DataShareService, private dialog: DialogService, private router: Router) {
    this.dss.setSaveLocalStorage(true);
  }

  ngOnInit() {}
  
  save(){
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
      id: 0,
      name: this.name,
      color: this.color
    }
    this.as.savePerson(person).subscribe(result => {
      this.sending = false;
      if (result.status==='ok'){
        this.dss.removeGlobal('people')
        this.router.navigate(['/']);
      }
      else{
        this.dialog.alert({title: 'Errorea', content: 'Errore bat gertatu da kafezale berria gehitzean!', ok: 'Ados'});
      }
    });
  }

}