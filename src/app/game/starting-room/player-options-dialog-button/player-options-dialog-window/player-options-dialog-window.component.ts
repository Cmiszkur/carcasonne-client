import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayerOptions, PlayersColors } from 'src/app/game/models/Room';

@Component({
  selector: 'app-player-options-dialog-window',
  templateUrl: './player-options-dialog-window.component.html',
  styleUrls: ['./player-options-dialog-window.component.sass'],
})
export class PlayerOptionsDialogWindowComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PlayerOptionsDialogWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PlayerOptions
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public get colors(): string[] {
    return Object.values(PlayersColors);
  }
}
