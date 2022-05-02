import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerOptions, ShortenedRoom } from '../models/Room';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-starting-room',
  templateUrl: './starting-room.component.html',
  styleUrls: ['./starting-room.component.sass'],
})
export class StartingRoomComponent implements OnInit {
  /**
   * All available rooms.
   */
  public availableRooms: ShortenedRoom[] | null;

  constructor(private roomService: RoomService, private router: Router, private route: ActivatedRoute) {
    this.availableRooms = null;
  }

  ngOnInit(): void {
    this.availableRooms = this.roomService.availableRooms;
  }

  /**
   * Saves selected room id that is later used to join room.
   * @param selectedRoom - room selected from results table.
   */
  public saveSelectedRoomId(selectedRoom: ShortenedRoom): void {
    this.roomService.setSelectedRoomId = selectedRoom.roomId;
  }

  /**
   * Navigates to waiting room and sets query params.
   * @param options - ``{ color: string }``
   */
  public joinRoom(options: PlayerOptions): void {
    this.router.navigate(['./room/waiting-room'], {
      queryParams: { roomID: this.roomService.selectedRoomId, ...options },
      relativeTo: this.route,
    });
  }
}
