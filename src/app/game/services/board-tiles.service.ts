import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Coordinates } from "../models/emptytile";
import { Tile } from "../models/Tile";

@Injectable({
  providedIn: 'root'
})
export class BoardTilesService {

  private placedTilesCoordinates$: BehaviorSubject<{coordinates: Coordinates, tileValues: Tile["tileValues"]} | null>

  private firstTilePosition$: BehaviorSubject<Coordinates | null>

  constructor() {
    this.placedTilesCoordinates$ = new BehaviorSubject<{coordinates: Coordinates, tileValues: Tile["tileValues"]} | null>(null)
    this.firstTilePosition$ = new BehaviorSubject<Coordinates | null>(null)
  }

  public get placedTilesCoordinates(): Observable<{coordinates: Coordinates, tileValues: Tile["tileValues"]} | null> {
    return this.placedTilesCoordinates$.asObservable()
  }

  public addPlacedTileCoordinates(placedTileCoordinates: {coordinates: Coordinates, tileValues: Tile["tileValues"]}): void {
    this.placedTilesCoordinates$.next(placedTileCoordinates)
  }

  public get firstTilePosition(): Observable<Coordinates | null> {
    return this.firstTilePosition$.asObservable()
  }

  public addFirstTilePosition(firstTilePostion: Coordinates): void {
    this.firstTilePosition$.next(firstTilePostion)
  }
}
