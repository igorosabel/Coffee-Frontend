import { Injectable }              from '@angular/core';
import { Observable }              from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent }  from '../components/dialogs/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent }    from '../components/dialogs/alert-dialog/alert-dialog.component';
import { DialogOptions }           from '../interfaces/interfaces';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public confirm(options: DialogOptions): Observable<boolean> {
    let dialogRef: MatDialogRef<ConfirmDialogComponent>;
    dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.componentInstance.title = options.title;
    dialogRef.componentInstance.content = options.content;
    dialogRef.componentInstance.ok = options.ok;
    dialogRef.componentInstance.cancel = options.cancel;

    return dialogRef.afterClosed();
  }

  public alert(options: DialogOptions): Observable<boolean> {
    let dialogRef: MatDialogRef<AlertDialogComponent>;
    dialogRef = this.dialog.open(AlertDialogComponent);

    dialogRef.componentInstance.title = options.title;
    dialogRef.componentInstance.content = options.content;
    dialogRef.componentInstance.ok = options.ok;

    return dialogRef.afterClosed();
  }

}
