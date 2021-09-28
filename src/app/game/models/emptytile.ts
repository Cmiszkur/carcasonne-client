export enum environment {
  ROAD = 'road',
  TOWN = 'town',
  FIELD = 'field'
}

export interface Coordinates {
  x: number,
  y: number,
}

export interface Emptytile {
  top?: environment,
  right?: environment,
  bottom?: environment,
  left?: environment,
  position: string
}
