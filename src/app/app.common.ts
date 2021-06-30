/*
 * Páginas
 */
 import { CoffeeComponent }     from './pages/coffee/coffee.component';
 import { DayComponent }        from './pages/day/day.component';
 import { PeopleComponent }     from './pages/people/people.component';
 import { AddPersonComponent }  from './pages/add-person/add-person.component';
 import { EditPersonComponent } from './pages/edit-person/edit-person.component';
 import { PersonComponent }     from './pages/person/person.component';
 import { DayListComponent }    from './pages/day-list/day-list.component';

export const PAGES: any[] = [
	CoffeeComponent,
	DayComponent,
	PeopleComponent,
	AddPersonComponent,
	EditPersonComponent,
	PersonComponent,
	DayListComponent
];

/*
 * Componentes
 */
import { CalendarComponent }      from './components/calendar/calendar.component';
import { ColorsComponent }        from './components/colors/colors.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent }   from './components/dialogs/alert-dialog/alert-dialog.component';

export const COMPONENTS: any[] = [
	CalendarComponent,
	ColorsComponent,
	ConfirmDialogComponent,
	AlertDialogComponent
];

/*
 * Pipes
 */
import { UrldecodePipe }         from './pipes/urldecode.pipe';
import { PercentageTotalPipe }   from './pipes/percentage-total.pipe';
import { PercentageFridaysPipe } from './pipes/percentage-fridays.pipe';
import { FormatNumPipe }         from './pipes/format-num.pipe';
import { PeopleListPipe }        from './pipes/people-list.pipe';
import { PeoplePayPipe }         from './pipes/people-pay.pipe';

export const PIPES: any[] = [
	UrldecodePipe,
	PercentageTotalPipe,
	PercentageFridaysPipe,
	FormatNumPipe,
	PeopleListPipe,
	PeopleListPipe,
	PeoplePayPipe
];

/*
 * Servicios
 */
import { CommonService }          from './services/common.service';
import { ApiService }             from './services/api.service';
import { DataShareService }       from './services/data-share.service';
import { DialogService }          from './services/dialog.service';

export const SERVICES: any[] = [
	CommonService,
	ApiService,
	DataShareService,
	DialogService
];

/*
 * Componentes Angular Material
 */
import { MatToolbarModule }  from '@angular/material/toolbar';
import { MatButtonModule }   from '@angular/material/button';
import { MatIconModule }     from '@angular/material/icon';
import { MatCardModule }     from '@angular/material/card';
import { MatListModule }     from '@angular/material/list';
import { MatSidenavModule }  from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule }    from '@angular/material/radio';
import { MatDialogModule }   from '@angular/material/dialog';
import { MatInputModule }    from '@angular/material/input';

export const MATERIAL: any[] = [
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
];