import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RoomService } from '../../services/room.service';
import { JoinRoomParams, SocketAnswer } from '../../models/socket';

@Injectable({
  providedIn: 'root',
})
export class JoinRoomResolver implements Resolve<SocketAnswer> {
  constructor(private roomService: RoomService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SocketAnswer> {
    const queryParams: JoinRoomParams = { ...state.root.queryParams };
    return this.roomService.joinRoom(queryParams.color, queryParams.roomID);
  }
}
