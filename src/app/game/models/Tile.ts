export interface Tile {
  _id: string;
  rotation: number;
  tileType: string;
  extraPoints: boolean;
  hasChurch: boolean;
  followerPlacement?: {
    username: string;
    playerColor: string;
    placement: string;
  };
  isFollowerPlaced: boolean;
  tileValues: {
    cities?: Array<string>[];
    roads?: Array<string>[];
  };
  positionRef: {
    referenceTile: string;
    position: string;
    coordinates: {
      x: number,
      y: number
    }
  } | null;
}

export interface TileEnvironments {
  top: string,
  right: string,
  bottom: string,
  left: string
}
