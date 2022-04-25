import { ExtendedTile } from 'src/app/game/models/Room';
import { Component, OnInit } from '@angular/core';
import { Room } from '../../models/Room';
import { RoomService } from '../../services/room.service';
import { AuthService } from "../../../user/auth.service";

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
    this.currentTile = null;
    this.newRoom = null;
    this.username = this.authService.user?.username || null;
    this.tiles = null;
  }

  ngOnInit(): void {}

}
