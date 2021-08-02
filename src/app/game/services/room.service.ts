import { Room } from '../models/Room';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private socket;

  constructor() {
    this.socket = io('http://localhost:80', {
      withCredentials: true,
      autoConnect: false,
    });
  }

  public disconnect(): void {
    this.socket.disconnect();
  }

  public connect(): void {
    this.socket.connect();
  }

  public testMessage(): void {
    this.connect();
    this.socket.emit('message', 'polska gurom');
  }

  public getRoom(): Observable<Room> {
    this.connect();
    return new Observable((subscriber) => {
      this.socket.on('created_room_response', (newRoom: Room) => {
        subscriber.next(newRoom);
        subscriber.complete();
      });
    });
  }

  public createRoom() {
    this.connect();
    this.socket.emit('create_room');
  }
}
