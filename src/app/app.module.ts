import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule, MatListModule, MatSidenavModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CoffeeComponent } from './coffee/coffee.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DetailComponent } from './detail/detail.component';
import { PeopleComponent } from './people/people.component';
import { ColorsComponent } from './colors/colors.component';

import { ApiService } from './coffee/services/api.service';

import { UrldecodePipe } from './pipes/urldecode.pipe';
import { PercentageTotalPipe } from './pipes/percentage-total.pipe';
import { PercentageFridaysPipe } from './pipes/percentage-fridays.pipe';

const appRoutes: Routes = [
  { path: '', component: CoffeeComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'people', component: PeopleComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CoffeeComponent,
    CalendarComponent,
    UrldecodePipe,
    PercentageTotalPipe,
    PercentageFridaysPipe,
    DetailComponent,
    PeopleComponent,
    ColorsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatSidenavModule,
    FlexLayoutModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
