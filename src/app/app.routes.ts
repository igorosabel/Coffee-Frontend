import { Routes, RouterModule } from '@angular/router';
import { CoffeeComponent } from './components/coffee/coffee.component';
import { DayComponent } from './components/day/day.component';
import { PeopleComponent } from './components/people/people.component';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { EditPersonComponent } from './components/edit-person/edit-person.component';

const appRoutes: Routes = [
  { path: '', component: CoffeeComponent },
  { path: 'day', component: DayComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'add-person', component: AddPersonComponent },
  { path: 'edit-person/:id', component: EditPersonComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);