import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Coordinates, Emptytile } from "../../../models/emptytile";
import { Tile } from "../../../models/Tile";
import { BoardTilesService } from "../../../services/board-tiles.service";

@Component({
  selector: 'app-empty-tiles',
  templateUrl: './empty-tile.component.html',
  styleUrls: ['./empty-tile.component.sass']
})
export class EmptyTileComponent implements OnInit {

  // @Input() tilesCoordinates: Set<string>
  //
  // public emptyTiles: Map<string, Emptytile>
  //
  // private firstTilePosition: Coordinates

  constructor(private boardTilesService: BoardTilesService, private cdf: ChangeDetectorRef) {
    // this.firstTilePosition = {} as Coordinates
    // this.emptyTiles= new Map<string, Emptytile>()
    // this.tilesCoordinates = new Set<string>()
  }

  ngOnInit(): void {
    // this.listenForPlacedTiles()
    // this.listenForFirstTilePosition()
  }

  // private listenForPlacedTiles(): void {
  //   this.boardTilesService.placedTilesCoordinates.subscribe(placedTiles => {
  //     placedTiles && this.placeEmptyTileInMap(placedTiles.coordinates, placedTiles.tileValues)
  //   })
  // }
  //
  // private listenForFirstTilePosition(): void {
  //   this.boardTilesService.firstTilePosition.subscribe(firstTilePostion => {
  //     firstTilePostion && (this.firstTilePosition = firstTilePostion)
  //   })
  // }

  // private placeEmptyTileInMap(coordinates: Coordinates, tileValues: Tile["tileValues"]) {
  //   const tileEnvironments = {
  //     top: 'fields',
  //     right: 'fields',
  //     bottom: 'fields',
  //     left: 'fields'
  //   }
  //   for(const [key, value] of Object.entries(tileValues)) {
  //     value.forEach(array => array.forEach(string => {
  //       switch(string) {
  //         case("TOP"):
  //           tileEnvironments.top = key
  //           break
  //         case("LEFT"):
  //           tileEnvironments.left = key
  //           break
  //         case("BOTTOM"):
  //           tileEnvironments.bottom = key
  //           break
  //         case("RIGHT"):
  //           tileEnvironments.right = key
  //           break
  //       }
  //     }))
  //   }
  //   const TopTile = () => {
  //     const value = this.emptyTiles.get(JSON.stringify({ x: coordinates.x, y: coordinates.y + 1 }))
  //     const object = { position: `translate(${this.firstTilePosition.x + 112 * (coordinates.x)}px, ${this.firstTilePosition.y - 112 * (coordinates.y + 1)}px)` }
  //     return {...value || object, bottom: tileEnvironments.top} as Emptytile
  //   }
  //   const LeftTile = () => {
  //     const value = this.emptyTiles.get(JSON.stringify({ x: coordinates.x - 1, y: coordinates.y }))
  //     const object = { position: `translate(${this.firstTilePosition.x + 112 * (coordinates.x - 1)}px, ${this.firstTilePosition.y - 112 * (coordinates.y)}px)` }
  //     return {...value || object, right: tileEnvironments.left} as Emptytile
  //   }
  //   const BottomTile = () => {
  //     const value = this.emptyTiles.get(JSON.stringify({ x: coordinates.x, y: coordinates.y - 1 }))
  //     const object = { position: `translate(${this.firstTilePosition.x + 112 * (coordinates.x)}px, ${this.firstTilePosition.y - 112 * (coordinates.y - 1)}px)` }
  //     return {...value || object, top: tileEnvironments.bottom} as Emptytile
  //   }
  //   const RightTile = () => {
  //     const value = this.emptyTiles.get(JSON.stringify({ x: coordinates.x + 1, y: coordinates.y }))
  //     const object = { position: `translate(${this.firstTilePosition.x + 112 * (coordinates.x + 1)}px, ${this.firstTilePosition.y - 112 * (coordinates.y)}px)` }
  //     return {...value || object, left: tileEnvironments.right} as Emptytile
  //   }
  //   this.emptyTiles.set(JSON.stringify({ x: coordinates.x + 1, y: coordinates.y }), RightTile());
  //   this.emptyTiles.set(JSON.stringify({ x: coordinates.x - 1, y: coordinates.y }), LeftTile());
  //   this.emptyTiles.set(JSON.stringify({ x: coordinates.x, y: coordinates.y + 1 }), TopTile());
  //   this.emptyTiles.set(JSON.stringify({ x: coordinates.x, y: coordinates.y - 1 }), BottomTile());
  //
  //   this.tilesCoordinates.forEach((coordinates) => {
  //     this.emptyTiles.delete(coordinates);
  //   })
  // }

}
