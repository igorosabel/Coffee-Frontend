import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class ConfirmDialogComponent {

    public title: string;
    public content: string;
    public ok: string;
    public error: string;

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}
}