import { PlayerOptions } from 'src/app/game/models/Room';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PlayerOptionsDialogWindowComponent } from './player-options-dialog-window/player-options-dialog-window.component';

@Component({
  selector: 'app-player-options-dialog-button',
  templateUrl: './player-options-dialog-button.component.html',
  styleUrls: ['./player-options-dialog-button.component.sass'],
})
export class PlayerOptionsDialogButtonComponent {
  /**
   * Text inside a button.
   */
  @Input() public text: string;
  @Output() public playerOptions: EventEmitter<PlayerOptions>;

  constructor(public dialog: MatDialog) {
    this.playerOptions = new EventEmitter<PlayerOptions>();
    this.text = '';
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
