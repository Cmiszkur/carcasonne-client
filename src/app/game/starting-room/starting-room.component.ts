import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../models/Room';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-starting-room',
  templateUrl: './starting-room.component.html',
  styleUrls: ['./starting-room.component.sass'],
})
export class StartingRoomComponent implements OnInit {
  private newRoom: Room | null;

  constructor(
    private roomService: RoomService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.newRoom = null;
  }

  ngOnInit(): void {
    this.roomService.getRoom().subscribe((newRoom) => {
      console.log(newRoom);
      this.goToPlayingRoom();
    });
  }

  public testSocket() {
    this.roomService.testMessage();
  }

  public createRoom() {
    this.roomService.createRoom();
  }

  private goToPlayingRoom() {
    this.router.navigate(['./playing-room'], {
      state: { room: this.newRoom },
      relativeTo: this.route,
    });
  }
}
