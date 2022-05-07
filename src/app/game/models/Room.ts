import { RoomError } from './socket';
import { Coordinates, FollowerDetails, Tile, TileValues } from './Tile';

export interface Room {
  players: Player[];
  board: ExtendedTile[];
  boardMoves: BoardMove[];
  gameStarted: boolean;
  lastChosenTile: TileAndPlayer;
  tilesLeft: Tile[];
  gameEnded: boolean;
  roomId: string;
  numberOfPlayers: number;
  roomHost: string;
}

export interface Player {
  username: string;
  color: string;
  followers: number;
}

export interface ExtendedTile {
  tile: Tile;
  coordinates?: Coordinates;
  isFollowerPlaced: boolean;
  rotation: number;
  fallowerDetails?: FollowerDetails;
  tileValuesAfterRotation: TileValues;
}

export interface TileAndPlayer {
  tile: Tile;
  player: string;
}

export type ShortenedRoom = Pick<Room, 'players' | 'numberOfPlayers' | 'roomHost' | 'roomId' | 'gameStarted' | 'gameEnded'>;

export interface BoardMove {
  player: string | null;
  coordinates: Coordinates | null;
}

export interface PlayerOptions {
  color: PlayersColors | null;
}

export enum PlayersColors {
  GREEN = 'green',
  BLUE = 'blue',
  YELLOW = 'yellow',
  RED = 'red',
}

export interface SnackBarError {
  error: RoomError;
  errorMessage?: string;
}
