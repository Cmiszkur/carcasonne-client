import { AfterViewChecked, Component, Inject, Input } from '@angular/core';
import { Tile, TileEnvironments } from "../../models/Tile";
import { DomElementsService } from "../../../dom-elements.service";
import { DOCUMENT, KeyValue } from "@angular/common";
import { Coordinates, Emptytile } from "../../models/emptytile";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: [ './board.component.sass' ]
})
export class BoardComponent implements AfterViewChecked {

  @Input() public tiles: Tile[] | null;
  public tilesAreaWidth: number | null;
  public tilesAreaHeight: number | null;
  public emptyTiles: Map<string, Emptytile>;
  public translateValueCurrentTile: string;
  private tilesMatrix: Array<[ Tile | undefined ]>
  private tilesCoordinates: Set<string>;
  private firstTilePosition: Coordinates;

  constructor(private dom: DomElementsService,
              @Inject(DOCUMENT) private document: Document) {
    this.tiles = null;
    this.tilesAreaWidth = null;
    this.tilesAreaHeight = null;
    this.tilesMatrix = [];
    this.tilesCoordinates = new Set<string>();
    this.emptyTiles = new Map<string, Emptytile>();
    this.firstTilePosition = {} as Coordinates;
    this.translateValueCurrentTile = ''
  }

  ngAfterViewChecked() {
    this.tilesAreaWidth = this.dom.getTilesAreaWidth();
    this.tilesAreaHeight = this.dom.getTilesAreaHeight();
  }

  public onImageLoad(): void {
    this.positionTilesOnBoard();
  }

  public emptyTileSelected(clickedEmptyTile: KeyValue<string, Emptytile>): void {
    console.log(clickedEmptyTile)
    const coordinates = JSON.parse(clickedEmptyTile.key) as Coordinates
    this.translateValueCurrentTile = this.makeTranslateString(coordinates)
    // this.checkCurrentTilePlacement(clickedEmptyTile.value)
    console.log(this.checkCurrentTilePlacement(clickedEmptyTile.value))
  }

  private checkCurrentTilePlacement(clickedEmptyTile: Emptytile): boolean {
    if(this.tiles) {
      // TODO: Narazie jako układany kafalek jest używany pierwszy kafelek z tablicy, w przyszłości zmienić na kafelek zwracany z API
      const currentTileEnvironments = this.tileValuesToTileEnvironments(this.tiles[0].tileValues, this.tiles[0].rotation)
      console.log(currentTileEnvironments)
      let checker: boolean = true
      for(const [key, value] of Object.entries(clickedEmptyTile)) {
        switch (key) {
          case 'bottom':
            checker = value === currentTileEnvironments.bottom
            break
          case 'top':
            checker = value === currentTileEnvironments.top
            break
          case 'right':
            checker = value === currentTileEnvironments.right
            break
          case 'left':
            checker = value === currentTileEnvironments.left
            break
        }
        if(!checker) break
      }
      return checker
    } else {
      return false
    }

  }

  private createMatrix(tile: Tile) {
    if (!tile.positionRef) {
      this.tilesMatrix = [ [ tile ] ];
    } else {
      const referencedTileId = tile.positionRef.referenceTile;
      let matrixRowIndex = 0;
      let matrixColumnIndex = 0;
      this.tilesMatrix.forEach((row, rowIndex) => {
        if (row.findIndex(tileInMatrix => tileInMatrix?._id === referencedTileId) !== -1) {
          matrixRowIndex = rowIndex;
          matrixColumnIndex = row.findIndex(tileInMatrix => tileInMatrix?._id === referencedTileId);
          const referenceTileRotation = this.tiles?.find(tile => tile._id === referencedTileId)?.rotation;
          const placeRight = () => {
            this.tilesMatrix[matrixRowIndex][matrixColumnIndex + 1] = tile;
          };
          const placeLeft = () => {
            if (matrixColumnIndex === 0) {
              this.tilesMatrix[matrixRowIndex].unshift(tile);
              this.tilesMatrix.forEach((tilesRow, row, array) => {
                row === matrixRowIndex ? null : tilesRow.unshift(undefined);
              })
            } else {
              this.tilesMatrix[matrixRowIndex][matrixColumnIndex - 1] = tile;
            }
          };
          const placeTop = () => {
            if (matrixRowIndex === 0) {
              this.tilesMatrix.unshift([ undefined ]);
              this.tilesMatrix[matrixRowIndex][matrixColumnIndex] = tile;
            } else {
              this.tilesMatrix[matrixRowIndex - 1][matrixColumnIndex] = tile;
            }
          };
          const placeBottom = () => {
            this.tilesMatrix[matrixRowIndex + 1] ? null : this.tilesMatrix[matrixRowIndex + 1] = [ undefined ]
            this.tilesMatrix[matrixRowIndex + 1][matrixColumnIndex] = tile;
          }
          switch (referenceTileRotation) {
            case 0:
              switch (tile.positionRef?.position) {
                case 'RIGHT':
                  placeRight();
                  break;
                case 'LEFT':
                  placeLeft();
                  break;
                case 'TOP':
                  placeTop();
                  break;
                case 'BOTTOM':
                  placeBottom();
                  break;
              }
              break;
            case 90:
              switch (tile.positionRef?.position) {
                case 'RIGHT':
                  placeBottom();
                  break;
                case 'LEFT':
                  placeTop();
                  break;
                case 'TOP':
                  placeRight();
                  break;
                case 'BOTTOM':
                  placeLeft();
                  break;
              }
              break;
            case 180:
              switch (tile.positionRef?.position) {
                case 'RIGHT':
                  placeLeft();
                  break;
                case 'LEFT':
                  placeRight();
                  break;
                case 'TOP':
                  placeBottom();
                  break;
                case 'BOTTOM':
                  placeTop();
                  break;
              }
              break;
            case 270:
              switch (tile.positionRef?.position) {
                case 'RIGHT':
                  placeTop();
                  break;
                case 'LEFT':
                  placeBottom();
                  break;
                case 'TOP':
                  placeLeft();
                  break;
                case 'BOTTOM':
                  placeRight();
                  break;
              }
              break;
          }
        }
      })

    }
  }

  private positionTilesOnBoard() {
    if (this.tiles) {

      const tiles = this.tiles;

      tiles.forEach((tile, index, tiles) => {

        const currentTileAsHtmlElement = this.document.getElementById(tile._id);

        if (currentTileAsHtmlElement && this.tilesAreaWidth && this.tilesAreaHeight) {

          const previousTile = tile.positionRef?.referenceTile ? tiles[tiles.findIndex(tileInArray => tileInArray._id === tile.positionRef?.referenceTile)] : '';
          const previousTileId = tile.positionRef?.referenceTile.toString() || '';
          const previousTileAsHtmlElement = this.document.getElementById(previousTileId);
          const tilesAreaPosition = this.document.getElementById('tiles-area')?.getBoundingClientRect();
          const currentTileRotation = tile.rotation;

          if (!tile.positionRef) {

            this.tilesCoordinates.add(JSON.stringify({ x: 0, y: 0 }));
            this.firstTilePosition = { x: (this.tilesAreaWidth / 2) - 50, y: (this.tilesAreaHeight / 2) - 50 };
            this.placeEmptyTileInMap({ x: 0, y: 0 }, tile.tileValues, tile.rotation);
            currentTileAsHtmlElement.style.transform = `translate(${ (this.tilesAreaWidth / 2) - 50 }px, ${ (this.tilesAreaHeight / 2) - 50 }px)`;
            currentTileAsHtmlElement.style.transform += ` rotate(${ currentTileRotation }deg)`;

          } else {
            if (previousTileAsHtmlElement && tilesAreaPosition && previousTile) {

              const previousTilePosition = previousTileAsHtmlElement.getBoundingClientRect();
              this.placeTilesRelativeToPrevious(currentTileAsHtmlElement, tile, tilesAreaPosition, previousTilePosition, previousTile, currentTileRotation);

            }
          }
        }
        this.createMatrix(tile);
      })
    }
  }

  private placeTilesRelativeToPrevious(
    currentTileAsHtmlElement: HTMLElement,
    tile: Tile,
    tilesAreaPosition: DOMRect,
    previousTilePosition: DOMRect,
    previousTile: Tile,
    currentTileRotation: number) {

    const placeLeft = `translate(${ previousTilePosition.x - tilesAreaPosition.x - previousTilePosition.width }px, ${ previousTilePosition.y - tilesAreaPosition.y }px)`;
    const placeRight = `translate(${ previousTilePosition.x - tilesAreaPosition.x + previousTilePosition.width }px, ${ previousTilePosition.y - tilesAreaPosition.y }px)`;
    const placeTop = `translate(${ previousTilePosition.x - tilesAreaPosition.x }px, ${ previousTilePosition.y - tilesAreaPosition.y - previousTilePosition.height }px)`;
    const placeBottom = `translate(${ previousTilePosition.x - tilesAreaPosition.x }px, ${ previousTilePosition.y - tilesAreaPosition.y + previousTilePosition.height }px)`;
    const previousTileRotation = previousTile.rotation;

    switch (previousTileRotation) {
      case 0:
        switch (tile.positionRef?.position) {
          case 'LEFT':
            currentTileAsHtmlElement.style.transform = placeLeft;
            break;
          case 'RIGHT':
            currentTileAsHtmlElement.style.transform = placeRight;
            break;
          case 'TOP':
            currentTileAsHtmlElement.style.transform = placeTop;
            break;
          case 'BOTTOM':
            currentTileAsHtmlElement.style.transform = placeBottom;
            break;
        }
        break;
      case 90:
        switch (tile.positionRef?.position) {
          case 'LEFT':
            currentTileAsHtmlElement.style.transform = placeTop;
            break;
          case 'RIGHT':
            currentTileAsHtmlElement.style.transform = placeBottom;
            break;
          case 'TOP':
            currentTileAsHtmlElement.style.transform = placeRight;
            break;
          case 'BOTTOM':
            currentTileAsHtmlElement.style.transform = placeLeft;
            break;
        }
        break;
      case 180:
        switch (tile.positionRef?.position) {
          case 'LEFT':
            currentTileAsHtmlElement.style.transform = placeRight;
            break;
          case 'RIGHT':
            currentTileAsHtmlElement.style.transform = placeLeft;
            break;
          case 'TOP':
            currentTileAsHtmlElement.style.transform = placeBottom;
            break;
          case 'BOTTOM':
            currentTileAsHtmlElement.style.transform = placeTop;
            break;
        }
        break;
      case 270:
        switch (tile.positionRef?.position) {
          case 'LEFT':
            currentTileAsHtmlElement.style.transform = placeBottom;
            break;
          case 'RIGHT':
            currentTileAsHtmlElement.style.transform = placeTop;
            break;
          case 'TOP':
            currentTileAsHtmlElement.style.transform = placeLeft;
            break;
          case 'BOTTOM':
            currentTileAsHtmlElement.style.transform = placeRight;
            break;
        }
        break;
    }

    currentTileAsHtmlElement.style.transform += ` rotate(${ currentTileRotation }deg)`;

    this.tilesCoordinates.add(JSON.stringify(tile.positionRef?.coordinates || { x: 0, y: 0 }));
    this.placeEmptyTileInMap(tile.positionRef?.coordinates || { x: 0, y: 0 }, tile.tileValues, tile.rotation);
    console.log(this.emptyTiles)
  }


  private placeEmptyTileInMap(coordinates: { x: number, y: number }, tileValues: Tile["tileValues"], tileRotation: number) {

    const tileEnvironments = this.tileValuesToTileEnvironments(tileValues, tileRotation)

    const emptyTile = (coordinates: Coordinates, emptyTileKeyPosition: keyof Emptytile, TileKeyValue: keyof TileEnvironments) => {
      const value = this.emptyTiles.get(JSON.stringify(coordinates))
      const object = { position: this.makeTranslateString(coordinates) } as Emptytile
      return { ...value || object, [emptyTileKeyPosition]: tileEnvironments[TileKeyValue]} as Emptytile
    }

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
    console.log(this.emptyTiles.get(JSON.stringify({ x: coordinates.x, y: coordinates.y - 1 })))

    this.tilesCoordinates.forEach((coordinates) => {
      this.emptyTiles.delete(coordinates);
    })
  }

  private tileValuesToTileEnvironments(tileValues: Tile["tileValues"], tileRotation: number): TileEnvironments {

    const tileEnvironments: TileEnvironments = {
      top: 'fields',
      right: 'fields',
      bottom: 'fields',
      left: 'fields'
    }


    const tileEnvironmentsKeys = () => {
      const shiftValue = tileRotation >= 360 ? 0 : tileRotation / 90
      const tileEnvironmentsKeysArray: string[] = ['top', 'right', 'bottom', 'left']

      for(let i = 1; i <= shiftValue; i++) {
        let firstElement = tileEnvironmentsKeysArray.shift()
        if(firstElement) tileEnvironmentsKeysArray.push(firstElement)
      }

      return tileEnvironmentsKeysArray
    }

    // TODO: dodać obsługę rotacji!!!
    for(const [key, value] of Object.entries(tileValues)) {
      value.forEach(array => array.forEach(string => {
        switch(string) {
          case("TOP"):
            tileEnvironments[tileEnvironmentsKeys()[0] as keyof TileEnvironments] = key
            break
          case("LEFT"):
            tileEnvironments[tileEnvironmentsKeys()[1] as keyof TileEnvironments] = key
            break
          case("BOTTOM"):
            tileEnvironments[tileEnvironmentsKeys()[2] as keyof TileEnvironments] = key
            break
          case("RIGHT"):
            tileEnvironments[tileEnvironmentsKeys()[3] as keyof TileEnvironments] = key
            break
        }
      }))
    }

    return tileEnvironments
  }

  private makeTranslateString(coordinates: Coordinates): string {
    if(this.firstTilePosition) {
      return `translate(${this.firstTilePosition.x + 112 * (coordinates.x)}px, ${this.firstTilePosition.y - 112 * (coordinates.y)}px)`
    } else {
      return ''
    }
  }
}
