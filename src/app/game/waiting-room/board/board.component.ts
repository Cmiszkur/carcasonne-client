import { Component, ElementRef, Input, OnInit, } from '@angular/core';
import { Tile, TileEnvironments } from '../../models/Tile';
import { KeyValue } from '@angular/common';
import { Coordinates, Emptytile } from '../../models/emptytile';
import { BoardTilesService } from "../../services/board-tiles.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: [ './board.component.sass' ],
})
export class BoardComponent implements OnInit {
  @Input() public tiles: Tile[] | null;
  @Input() public currentTile: Tile | null
  public emptyTiles: Map<string, Emptytile>;
  public translateValueCurrentTile: string;
  private tilesCoordinates: Set<string>;
  private firstTilePosition: Coordinates;
  private previouslyClickedTileCoordinates: string

  constructor(private el: ElementRef, private boardTileService: BoardTilesService) {
    this.tiles = null;
    this.currentTile = null;
    this.tilesCoordinates = new Set<string>();
    this.emptyTiles = new Map<string, Emptytile>();
    this.firstTilePosition = {} as Coordinates;
    this.translateValueCurrentTile = '';
    this.previouslyClickedTileCoordinates = '';

  }

  ngOnInit(): void {
    this.tiles?.forEach((tile) => {
      this.placeTilesFromBackendOnBoard(tile);
      this.placeEmptyTileInMap(
        tile.tileValues,
        tile.rotation,
        tile.positionRef?.coordinates
      );
    });
  }

  public emptyTileSelected(
    clickedEmptyTile: KeyValue<string, Emptytile>
  ): void {

    if (this.previouslyClickedTileCoordinates === clickedEmptyTile.key) {
      if (this.currentTile) this.currentTile.rotation >= 270 ? this.currentTile.rotation = 0 : this.currentTile.rotation += 90;
    }
    this.previouslyClickedTileCoordinates = clickedEmptyTile.key

    const coordinates = JSON.parse(clickedEmptyTile.key) as Coordinates;
    this.translateValueCurrentTile = this.makeTranslateString(coordinates);

    this.boardTileService.changeClickedEmptyTileState(
      [ clickedEmptyTile.key, this.checkCurrentTilePlacement(clickedEmptyTile.value) ])

  }

  public placeTilesFromBackendOnBoard(tile: Tile): void {
    const hostWidth = this.el.nativeElement.offsetWidth;
    const hostHeight = this.el.nativeElement.offsetHeight;

    if (!tile.positionRef) {
      this.tilesCoordinates.add(JSON.stringify({ x: 0, y: 0 }));
      this.firstTilePosition = {
        x: hostWidth / 2 - 56,
        y: hostHeight / 2 - 56,
      };
    } else {
      this.tilesCoordinates.add(JSON.stringify(tile.positionRef.coordinates));
    }
  }

  public makeTranslateStringForBackendTiles(tile: Tile): string {
    if (!tile.positionRef) {
      return `translate(${ this.firstTilePosition.x }px, ${ this.firstTilePosition.y }px`;
    } else {
      return this.makeTranslateString(tile.positionRef?.coordinates);
    }
  }

  public placeEmptyTileInMap(
    tileValues: Tile['tileValues'],
    tileRotation: number,
    coordinates?: { x: number; y: number }
  ) {
    this.tiles?.forEach(() => {
      if (!coordinates) coordinates = { x: 0, y: 0 };

      const tileEnvironments = this.tileValuesToTileEnvironments(
        tileValues,
        tileRotation
      );

      const emptyTile = (
        coordinates: Coordinates,
        emptyTileKeyPosition: keyof Emptytile,
        TileKeyValue: keyof TileEnvironments
      ) => {
        const value = this.emptyTiles.get(JSON.stringify(coordinates));
        const object = { position: this.makeTranslateString(coordinates) } as Emptytile;
        return {
          ...(value || object),
          [emptyTileKeyPosition]: tileEnvironments[TileKeyValue],
        } as Emptytile;
      };

      this.emptyTiles.set(
        JSON.stringify({ x: coordinates.x + 1, y: coordinates.y }),
        emptyTile({ x: coordinates.x + 1, y: coordinates.y }, 'left', 'right')
      );
      this.emptyTiles.set(
        JSON.stringify({ x: coordinates.x - 1, y: coordinates.y }),
        emptyTile({ x: coordinates.x - 1, y: coordinates.y }, 'right', 'left')
      );
      this.emptyTiles.set(
        JSON.stringify({ x: coordinates.x, y: coordinates.y + 1 }),
        emptyTile({ x: coordinates.x, y: coordinates.y + 1 }, 'bottom', 'top')
      );
      this.emptyTiles.set(
        JSON.stringify({ x: coordinates.x, y: coordinates.y - 1 }),
        emptyTile({ x: coordinates.x, y: coordinates.y - 1 }, 'top', 'bottom')
      );

      this.tilesCoordinates.forEach((coordinates) => {
        this.emptyTiles.delete(coordinates);
      });
    });
  }

  private checkCurrentTilePlacement(clickedEmptyTile: Emptytile): boolean {
    if (this.currentTile) {
      const currentTileEnvironments = this.tileValuesToTileEnvironments(
        this.currentTile.tileValues,
        this.currentTile.rotation
      );
      let checker: boolean = true;
      for (const [ key, value ] of Object.entries(clickedEmptyTile)) {
        switch (key) {
          case 'bottom':
            checker = value === currentTileEnvironments.bottom;
            break;
          case 'top':
            checker = value === currentTileEnvironments.top;
            break;
          case 'right':
            checker = value === currentTileEnvironments.right;
            break;
          case 'left':
            checker = value === currentTileEnvironments.left;
            break;
        }
        if (!checker) break;
      }
      return checker;
    } else {
      return false;
    }
  }

  private tileValuesToTileEnvironments(
    tileValues: Tile['tileValues'],
    tileRotation: number
  ): TileEnvironments {

    const tileEnvironments: TileEnvironments = {
      top: 'fields',
      right: 'fields',
      bottom: 'fields',
      left: 'fields',
    };

    const tileEnvironmentsKeys = () => {
      const shiftValue = tileRotation >= 360 ? 0 : tileRotation / 90;
      const tileEnvironmentsKeysArray: string[] = [
        'top',
        'right',
        'bottom',
        'left',
      ];

      for (let i = 1; i <= shiftValue; i++) {
        let firstElement = tileEnvironmentsKeysArray.shift();
        if (firstElement) tileEnvironmentsKeysArray.push(firstElement);
      }

      return tileEnvironmentsKeysArray;
    };

    // TODO: dodać obsługę rotacji!!!
    for (const [ key, value ] of Object.entries(tileValues)) {
      value.forEach((array) =>
        array.forEach((string) => {
          switch (string) {
            case 'TOP':
              tileEnvironments[tileEnvironmentsKeys()[0] as keyof TileEnvironments] = key;
              break;
            case 'LEFT':
              tileEnvironments[tileEnvironmentsKeys()[1] as keyof TileEnvironments] = key;
              break;
            case 'BOTTOM':
              tileEnvironments[tileEnvironmentsKeys()[2] as keyof TileEnvironments] = key;
              break;
            case 'RIGHT':
              tileEnvironments[tileEnvironmentsKeys()[3] as keyof TileEnvironments] = key;
              break;
          }
        })
      );
    }

    return tileEnvironments;
  }

  private makeTranslateString(coordinates: Coordinates): string {
    if (this.firstTilePosition) {
      return `translate(
        ${ this.firstTilePosition.x + 112 * coordinates.x }px,
        ${ this.firstTilePosition.y - 112 * coordinates.y }px)`;
    } else {
      return '';
    }
  }
}
