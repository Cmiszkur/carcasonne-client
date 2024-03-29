import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackBarError } from 'src/app/game/models/Room';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass'],
})
export class AlertComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarError, private snackBarRef: MatSnackBarRef<SnackBarError>) {}

  closeDialog() {
    this.snackBarRef.dismiss();
  }
}
