import { Tile } from './Tile';

export interface Room {
  players: Player[];
  board: {
    tiles: Tile[];
  };
  boardMoves: { moveCounter: number; player: string };
  gameStarted: boolean;
  roomId: string;
  numberOfPlayers: number;
  roomHost: string;
}

export interface Player {
  username: string;
  color: string;
  followers: number;
}
