import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Coordinates } from "../models/emptytile";
import { Tile } from "../models/Tile";

@Injectable({
  providedIn: 'root'
})
export class BoardTilesService {

  private placedTilesCoordinates$: BehaviorSubject<{coordinates: Coordinates, tileValues: Tile["tileValues"]} | null>;

  private firstTilePosition$: BehaviorSubject<Coordinates | null>;

  private clickedEmptyTileState$: BehaviorSubject<[string, boolean] | null>;

  private tilePlacementConfirmed$ :BehaviorSubject<boolean>;

  constructor() {
    this.placedTilesCoordinates$ = new BehaviorSubject<{coordinates: Coordinates, tileValues: Tile["tileValues"]} | null>(null);
    this.firstTilePosition$ = new BehaviorSubject<Coordinates | null>(null);
    this.clickedEmptyTileState$ = new BehaviorSubject<[string, boolean] | null>(null);
    this.tilePlacementConfirmed$ = new BehaviorSubject<boolean>(false);
  }

  public get placedTilesCoordinates(): Observable<{coordinates: Coordinates, tileValues: Tile["tileValues"]} | null> {
    return this.placedTilesCoordinates$.asObservable();
  }

  public addPlacedTileCoordinates(placedTileCoordinates: {coordinates: Coordinates, tileValues: Tile["tileValues"]}): void {
    this.placedTilesCoordinates$.next(placedTileCoordinates);
  }

  public get firstTilePosition(): Observable<Coordinates | null> {
    return this.firstTilePosition$.asObservable();
  }

  public addFirstTilePosition(firstTilePostion: Coordinates): void {
    this.firstTilePosition$.next(firstTilePostion);
  }

  public get clickedEmptyTileState(): Observable<[string, boolean] | null> {
    return this.clickedEmptyTileState$.asObservable();
  }

  public changeClickedEmptyTileState(clickedEmptyTile: [string, boolean] | null): void {
    this.clickedEmptyTileState$.next(clickedEmptyTile);
  }

  public get tilePlacementConfirmed(): Observable<boolean> {
    return this.tilePlacementConfirmed$.asObservable();
  }

  public set changeTilePlacementConfirmed(isConfirmed: boolean) {
    this.tilePlacementConfirmed$.next(isConfirmed);
  }
}
