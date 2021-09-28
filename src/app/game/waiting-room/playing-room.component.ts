import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player, Room } from '../models/Room';
import { RoomService } from '../services/room.service';
import { Tile } from "../models/Tile";

@Component({
  selector: 'app-waiting-room',
  templateUrl: './playing-room.component.html',
  styleUrls: [ './playing-room.component.sass' ],
})
export class PlayingRoomComponent implements OnInit {
  public player: Player | null;
  public username: string | null;
  public color: string | null;
  public numberOfFollowers: number | null;
  public arrayToIterate: Array<number>;
  public tiles: Tile[] | null;
  private newRoom: Room | null;

  constructor(private roomService: RoomService, private router: Router) {
    // this.newRoom = history.state.room || null;
    this.newRoom = {
      players: [
        {
          username: 'SavagePope',
          color: 'green',
          followers: 6,
        },
      ],
      board: {
        tiles: [
          {
            _id: '610b9de4e2694343a04ee090',
            rotation: 0,
            isFollowerPlaced: false,
            tileType: 'road_top_bottom_town_right',
            tileValues: {
              cities: [ [ 'RIGHT' ] ],
              roads: [ [ 'TOP', 'BOTTOM' ] ],
            },
            extraPoints: false,
            hasChurch: true,
            positionRef: null,
          },
          {
            _id: '610b9dasdsadsadase090',
            rotation: 180,
            isFollowerPlaced: false,
            tileType: 'road_top_bottom_town_right',
            tileValues: {
              cities: [ [ 'RIGHT' ] ],
              roads: [ [ 'TOP', 'BOTTOM' ] ],
            },
            extraPoints: false,
            hasChurch: true,
            positionRef: {
              referenceTile: '610b9de4e2694343a04ee090', position: 'LEFT',
              coordinates: {
                x: -1,
                y: 0
              }
            },
          },
          {
            _id: '61fdsfds694343a04ee090',
            rotation: 0,
            isFollowerPlaced: false,
            tileType: 'road_top_bottom_town_right',
            tileValues: {
              cities: [ [ 'RIGHT' ] ],
              roads: [ [ 'TOP', 'BOTTOM' ] ],
            },
            extraPoints: false,
            hasChurch: true,
            positionRef:
              {
                referenceTile: '610b9de4e2694343a04ee090',
                position: 'TOP',
                coordinates: {
                  x: 0,
                  y: 1
                }
              },
          },
        ],
      },
      boardMoves: {
        moveCounter: 1,
        player: 'start',
      },
      gameStarted: false,
      roomId: 'd4763e80754cb50bfd451fa801f7e60e5af59cf0',
      numberOfPlayers: 1,
      roomHost: 'SavagePope',
    };
    this.username = this.newRoom?.roomHost || null;
    this.player = this.findPlayer();
    this.color = this.player?.color || null;
    this.numberOfFollowers = this.player?.followers || null;
    this.arrayToIterate = Array(this.numberOfFollowers || 1).fill(1);
    this.tiles = this.newRoom.board?.tiles || null;
  }

  ngOnInit(): void {
  }

  findPlayer() {
    if (this.newRoom) {
      const players = this.newRoom.players;
      for (const player of players) {
        if (player.username === this.username) {
          return player;
        }
      }
    }
    return null;
  }
}
