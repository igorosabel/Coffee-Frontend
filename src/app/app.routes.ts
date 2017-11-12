import { Routes, RouterModule } from '@angular/router';
import { CoffeeComponent } from './components/coffee/coffee.component';
import { CoffeeListComponent } from './components/coffee-list/coffee-list.component';
import { DayComponent } from './components/day/day.component';
import { PeopleComponent } from './components/people/people.component';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { EditPersonComponent } from './components/edit-person/edit-person.component';
import { PersonComponent } from './components/person/person.component';
import { DayListComponent } from './components/day-list/day-list.component';

const appRoutes: Routes = [
  { path: '', component: CoffeeComponent },
  { path: 'list', component: CoffeeListComponent },
  { path: 'day', component: DayComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'add-person', component: AddPersonComponent },
  { path: 'edit-person/:id', component: EditPersonComponent },
  { path: 'person/:id', component: PersonComponent },
  { path: 'day-list', component: DayListComponent }
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);