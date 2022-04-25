import { PlayerOptions } from 'src/app/game/models/Room';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PlayerOptionsDialogWindowComponent } from './player-options-dialog-window/player-options-dialog-window.component';

@Component({
  selector: 'app-player-options-dialog-button',
  templateUrl: './player-options-dialog-button.component.html',
  styleUrls: ['./player-options-dialog-button.component.sass'],
})
export class PlayerOptionsDialogButtonComponent {
  @Output() public playerOptions: EventEmitter<PlayerOptions>;

  constructor(public dialog: MatDialog) {
    this.playerOptions = new EventEmitter<PlayerOptions>();
  }

  public openDialog(): void {
    const dialogRef: MatDialogRef<PlayerOptionsDialogWindowComponent, PlayerOptions> = this.dialog.open(
      PlayerOptionsDialogWindowComponent,
      {
        data: { color: null },
      }
    );
    this.listenForDialogClosing(dialogRef);
  }

  private listenForDialogClosing(dialogRef: MatDialogRef<PlayerOptionsDialogWindowComponent, PlayerOptions>): void {
    dialogRef.afterClosed().subscribe(result => this.playerOptions.emit(result));
  }
}
