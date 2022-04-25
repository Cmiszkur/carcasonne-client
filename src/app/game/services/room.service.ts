import { Room, ShortenedRoom } from '../models/Room';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../constants/httpOptions';
import { tap } from 'rxjs/operators';
import { JoinRoomPayload, RoomError, SocketAnswer } from '../models/socket';
import { CustomError } from 'src/app/commons/customErrorHandler';
import { SocketService } from '../../commons/services/socket.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService extends SocketService {
  /**
   * Backend base url.
   */
  private baseUrl: string;

  /**
   * Available rooms from backend.
   */
  private availableRooms$: BehaviorSubject<ShortenedRoom[] | null>;

  /**
   * Id of room selected, later to bo joined by player.
   */
  private selectedRoomId$: BehaviorSubject<string | null>;

  /**
   * Room which player joined to.
   */
  private currentRoom$: BehaviorSubject<Room | null>;

  constructor(private http: HttpClient) {
    super();
    this.baseUrl = 'http://localhost:3000';
    this.availableRooms$ = new BehaviorSubject<ShortenedRoom[] | null>(null);
    this.selectedRoomId$ = new BehaviorSubject<string | null>(null);
    this.currentRoom$ = new BehaviorSubject<Room | null>(null);
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

  public getRooms(): Observable<ShortenedRoom[]> {
    const getRoomsUrl = `${Constants.baseUrl}room/get-rooms`;
    return this.http.get<ShortenedRoom[]>(getRoomsUrl, Constants.httpOptions).pipe(tap(rooms => this.availableRooms$.next(rooms)));
  }

  public currentRoomAsObservable(): Observable<Room | null> {
    return this.currentRoom$.asObservable();
  }

  public get availableRooms(): ShortenedRoom[] | null {
    return this.availableRooms$.value;
  }

  public get selectedRoomId(): string | null {
    return this.selectedRoomId$.value;
  }

  public get currentRoom(): Room | null {
    return this.currentRoom$.value;
  }

  public set setSelectedRoomId(roomId: string) {
    this.selectedRoomId$.next(roomId);
  }

  public set setCurrentRoom(room: Room) {
    this.currentRoom$.next(room);
  }

  /**
   * Joins room of specified ID and returns socket response.
   * @param color - meeple color
   * @param roomID - id of room to join
   */
  public joinRoom(color?: string, roomID?: string): Observable<SocketAnswer> {
    const _roomID: string | undefined = this.selectedRoomId || roomID;
    if (!_roomID) {
      throw new CustomError(RoomError.ROOM_ID_NOT_SPECIFIED, 'Choose room which you want to join');
    }
    if (!color) {
      throw new CustomError(RoomError.MEEPLE_COLOR_NOT_SPECIFIED, 'Choose your meeple color');
    }
    const joinRoomPayload: JoinRoomPayload = { roomID: _roomID, color };
    this.connect();
    this.socket.emit('join_room', joinRoomPayload);
    return this.receiveJoinRoomResponse();
  }

  /**
   * Listens for ``joined_room`` response from socket.io backend.
   * If room is returned it's being set as current room.
   */
  public receiveJoinRoomResponse(): Observable<SocketAnswer> {
    return this.fromEventOnce<SocketAnswer>('joined_room').pipe(
      tap(socketAnswer => {
        const room: Room | null = socketAnswer.answer?.room || null;
        if (room) this.setCurrentRoom = room;
      })
    );
  }
}
