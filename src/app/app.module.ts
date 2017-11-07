import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing, appRoutingProviders } from './app.routes';
import { ColorPickerModule } from 'ngx-color-picker';
import {
	MatToolbarModule,
	MatButtonModule,
	MatIconModule,
	MatCardModule,
	MatListModule,
	MatSidenavModule,
	MatCheckboxModule,
  MatRadioModule,
	MatDialogModule,
	MatInputModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { CoffeeComponent } from './components/coffee/coffee.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DayComponent } from './components/day/day.component';
import { PeopleComponent } from './components/people/people.component';
import { ColorsComponent } from './components/colors/colors.component';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { EditPersonComponent } from './components/edit-person/edit-person.component';

import { ApiService } from './services/api.service';
import { DataShareService } from './services/data-share.service';
import { DialogService } from './services/dialog.service';
import { ConfirmDialogComponent } from './services/dialogs/confirm-dialog.component';
import { AlertDialogComponent } from './services/dialogs/alert-dialog.component';

import { UrldecodePipe } from './pipes/urldecode.pipe';
import { PercentageTotalPipe } from './pipes/percentage-total.pipe';
import { PercentageFridaysPipe } from './pipes/percentage-fridays.pipe';
import { FormatNumPipe } from './pipes/format-num.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CoffeeComponent,
    CalendarComponent,
	DayComponent,
    PeopleComponent,
    ColorsComponent,
    UrldecodePipe,
    PercentageTotalPipe,
    PercentageFridaysPipe,
    FormatNumPipe,
	ConfirmDialogComponent,
	AlertDialogComponent,
	AddPersonComponent,
	EditPersonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
	FormsModule,
	FlexLayoutModule,
    routing,
    ColorPickerModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatSidenavModule,
	MatCheckboxModule,
	MatRadioModule,
	MatDialogModule,
	MatInputModule
  ],
  entryComponents: [ConfirmDialogComponent, AlertDialogComponent],
  providers: [appRoutingProviders, ApiService, DataShareService, DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
