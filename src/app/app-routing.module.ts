import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoffeeComponent }     from './pages/coffee/coffee.component';
import { CoffeeListComponent } from './pages/coffee-list/coffee-list.component';
import { DayComponent }        from './pages/day/day.component';
import { PeopleComponent }     from './pages/people/people.component';
import { AddPersonComponent }  from './pages/add-person/add-person.component';
import { EditPersonComponent } from './pages/edit-person/edit-person.component';
import { PersonComponent }     from './pages/person/person.component';
import { DayListComponent }    from './pages/day-list/day-list.component';

const routes: Routes = [
  { path: '',                component: CoffeeComponent },
  { path: 'list',            component: CoffeeListComponent },
  { path: 'day',             component: DayComponent },
  { path: 'people',          component: PeopleComponent },
  { path: 'add-person',      component: AddPersonComponent },
  { path: 'edit-person/:id', component: EditPersonComponent },
  { path: 'person/:id',      component: PersonComponent },
  { path: 'day-list',        component: DayListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
