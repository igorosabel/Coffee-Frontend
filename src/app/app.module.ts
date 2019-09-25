import { BrowserModule }           from '@angular/platform-browser';
import { NgModule }                from '@angular/core';
import { HttpClientModule }        from '@angular/common/http';
import { FlexLayoutModule }        from '@angular/flex-layout';
import { FormsModule }             from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule }        from './app-routing.module';
import { ColorPickerModule }       from 'ngx-color-picker';
import { AppComponent }            from './app.component';

import { PAGES, COMPONENTS, PIPES, SERVICES, MATERIAL } from './app.common';

import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent }   from './components/dialogs/alert-dialog/alert-dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
		AppComponent,
		...PAGES,
		...COMPONENTS,
		...PIPES
  ],
  imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		FlexLayoutModule,
		ColorPickerModule,
		...MATERIAL,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [ConfirmDialogComponent, AlertDialogComponent],
  providers: [
		...SERVICES
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
