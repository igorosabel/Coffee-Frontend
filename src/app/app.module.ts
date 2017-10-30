import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule, MatListModule, MatSidenavModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CoffeeComponent } from './components/coffee/coffee.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DayComponent } from './components/day/day.component';
import { PeopleComponent } from './components/people/people.component';
import { ColorsComponent } from './components/colors/colors.component';

import { ApiService } from './services/api.service';
import { DataShareService } from './services/data-share.service';

import { UrldecodePipe } from './pipes/urldecode.pipe';
import { PercentageTotalPipe } from './pipes/percentage-total.pipe';
import { PercentageFridaysPipe } from './pipes/percentage-fridays.pipe';
import { FormatNumPipe } from './pipes/format-num.pipe';

const appRoutes: Routes = [
  { path: '', component: CoffeeComponent },
  { path: 'day', component: DayComponent },
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
    DayComponent,
    PeopleComponent,
    ColorsComponent,
    FormatNumPipe
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
  providers: [ApiService, DataShareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
