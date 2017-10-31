import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog.component';
import { AlertDialogComponent } from './dialogs/alert-dialog.component';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }
  
  public confirm(title: string, message: string): Observable<boolean> {
    let dialogRef: MatDialogRef<ConfirmDialogComponent>;
    dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }
  
  public alert(title: string, message: string): Observable<boolean> {
    let dialogRef: MatDialogRef<AlertDialogComponent>;
    dialogRef = this.dialog.open(AlertDialogComponent);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }

}