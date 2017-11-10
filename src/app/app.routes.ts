import { Routes, RouterModule } from '@angular/router';
import { CoffeeComponent } from './components/coffee/coffee.component';
import { CoffeeListComponent } from './components/coffee-list/coffee-list.component';
import { DayComponent } from './components/day/day.component';
import { PeopleComponent } from './components/people/people.component';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { EditPersonComponent } from './components/edit-person/edit-person.component';
import { PersonComponent } from './components/person/person.component';

const appRoutes: Routes = [
  { path: '', component: CoffeeComponent },
  { path: 'list', component: CoffeeListComponent },
  { path: 'day', component: DayComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'add-person', component: AddPersonComponent },
  { path: 'edit-person/:id', component: EditPersonComponent },
  { path: 'person/:id', component: PersonComponent },
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);