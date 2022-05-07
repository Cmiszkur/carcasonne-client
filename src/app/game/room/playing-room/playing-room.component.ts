import { ExtendedTile } from 'src/app/game/models/Room';
import { Component, OnInit } from '@angular/core';
import { Room } from '../../models/Room';
import { RoomService } from '../../services/room.service';
import { AuthService } from '../../../user/auth.service';
import { Tile } from '../../models/Tile';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './playing-room.component.html',
  styleUrls: ['./playing-room.component.sass'],
})
export class PlayingRoomComponent implements OnInit {
  public username: string | null;
  public tiles: ExtendedTile[] | null;
  public currentTile: ExtendedTile | null;
  private newRoom: Room | null;

  constructor(private roomService: RoomService, private authService: AuthService) {
    this.newRoom = this.roomService.currentRoomValue;
    this.currentTile = PlayingRoomComponent.setCurrentTile(this.newRoom?.lastChosenTile.tile);
    this.username = this.authService.user?.username || null;
    this.tiles = this.newRoom?.board || null;
  }

  ngOnInit(): void {}

  /**
   * Generates current tile with defaults values.
   * @param tile
   * @private
   */
  private static generateCurrentTile(tile: Tile): ExtendedTile {
    return {
      tile: tile,
      isFollowerPlaced: false,
      rotation: 0,
      tileValuesAfterRotation: tile.tileValues,
    };
  }

  /**
   * Sets current tile.
   * @param tile
   * @private
   */
  private static setCurrentTile(tile: Tile | null | undefined): ExtendedTile | null {
    return tile ? PlayingRoomComponent.generateCurrentTile(tile) : null;
  }
}
