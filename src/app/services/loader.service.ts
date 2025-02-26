import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoaderComponent } from '../components/loader/loader.component';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private dialogRef: MatDialogRef<LoaderComponent> | null = null;

  constructor(private dialog: MatDialog) {}

  show(): void {
    if (!this.dialogRef) {
      this.dialogRef = this.dialog.open(LoaderComponent, {
        disableClose: true,
        panelClass: 'custom-loader-dialog'
      });
    }
  }

  hide(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }
}