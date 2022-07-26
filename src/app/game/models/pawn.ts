import { Position } from './Tile';

export interface Pawn {
  transformValue: string;
  direction: Position[];
  position: string;
  selected?: boolean;
}
