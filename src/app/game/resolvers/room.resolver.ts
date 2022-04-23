import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Room } from '../models/Room';
import { RoomService } from '../services/room.service';

@Injectable({
  providedIn: 'root',
})
export class RoomResolver implements Resolve<Room[] | null> {
  constructor(private roomService: RoomService) {}

  resolve(): Observable<Room[] | null> {
    return this.roomService.getRooms();
  }
}
