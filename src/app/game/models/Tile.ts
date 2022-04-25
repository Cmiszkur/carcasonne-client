export interface Tile {
  _id: string;
  tileName: string;
  tileValues: TileValues;
  extraPoints: boolean;
  hasChurch: boolean;
}

export interface TileEnvironments {
  top: string;
  right: string;
  bottom: string;
  left: string;
}

export interface FollowerDetails {
  username: string;
  playerColor: string;
  placement: TileEnvironments;
  position: Position;
}

export enum Position {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
}

export interface TileValues {
  roads?: [Position[]];
  cities?: [Position[]];
}

export interface Coordinates {
  x: number;
  y: number;
}
