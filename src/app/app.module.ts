import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule, MatListModule, MatSidenavModule} from '@angular/material';

import { AppComponent } from './app.component';
import { CoffeeComponent } from './coffee/coffee.component';
import { ApiService } from './coffee/services/api.service';
import { CalendarComponent } from './calendar/calendar.component';


@NgModule({
  declarations: [
    AppComponent,
    CoffeeComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
	HttpModule,
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
