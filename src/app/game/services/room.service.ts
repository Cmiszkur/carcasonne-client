import { Room } from '../models/Room';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../constants/httpOptions';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  /**
   * Socket io client.
   */
  private socket: Socket;

  /**
   * Backend base url.
   */
  private baseUrl: string;

  /**
   * Available rooms from backend.
   */
  private availableRooms$: BehaviorSubject<Room[] | null>;

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:80', {
      withCredentials: true,
      autoConnect: false,
    });
    this.baseUrl = 'http://localhost:3000';
    this.availableRooms$ = new BehaviorSubject<Room[] | null>(null);
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
    return new Observable(subscriber => {
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

  public getRooms(): Observable<Room[]> {
    const getRoomsUrl = `${Constants.baseUrl}room/get-rooms`;
    return this.http.get<Room[]>(getRoomsUrl, Constants.httpOptions).pipe(tap(rooms => this.availableRooms$.next(rooms)));
  }

  public get availableRooms(): Room[] | null {
    return this.availableRooms$.value;
  }
}
