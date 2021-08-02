import { AfterViewChecked, Component, Inject, Input } from '@angular/core';
import { Tile } from "../../models/Tile";
import { DomElementsService } from "../../../dom-elements.service";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements AfterViewChecked {

  @Input() public tiles: Tile[] | null;
  public tilesAreaWidth: number | null;
  public tilesAreaHeight: number | null;
  private tilesMatrix: Array<[Tile | undefined]>
  private emptyTile: Tile;

  constructor(private dom: DomElementsService, @Inject(DOCUMENT) private document: Document) {
    this.tiles = null;
    this.tilesAreaWidth = null;
    this.tilesAreaHeight = null;
    this.tilesMatrix = [];
    this.emptyTile = {
      _id: 'none',
      rotation: 0,
      isFollowerPlaced: false,
      tileType: 'empty-tile',
      tileValues: {},
      extraPoints: false,
      hasChurch: false,
      positionRef: null,
    };
  }

  ngAfterViewChecked() {
    this.tilesAreaWidth = this.dom.getTilesAreaWidth();
    this.tilesAreaHeight = this.dom.getTilesAreaHeight();
  }

  public onImageLoad(): void {
    this.positionTilesOnBoard();
  }

  //TO DO:
  //1. Przesunąć wiersze po całej linii.
  //2. Przesunąć kolumny po całej linii.
  private createMatrix(tile: Tile) {
    const placeEmptyTiles = (column: number, row: number) => {
      //place right
      !this.tilesMatrix[row][column + 1] ? this.tilesMatrix[row][column + 1] = this.emptyTile : console.log('prawa się nie wykonała');
      //place left
      if(column === 0) {
        this.tilesMatrix[row].unshift(this.emptyTile);
        this.tilesMatrix.forEach((tilesRow, rowIndex, array) => {
          row === rowIndex ? null : tilesRow.unshift(undefined);
        })
      } else {
        !this.tilesMatrix[row][column - 1] ? this.tilesMatrix[row][column - 1] = this.emptyTile : console.log('lewy się nie wykonał');
      }
      //place bottom
      this.tilesMatrix[row + 1] ? null : this.tilesMatrix[row + 1] = [undefined];
      !this.tilesMatrix[row + 1][column] ? this.tilesMatrix[row + 1][column] = this.emptyTile : console.log('dół się nie wykonał');
      //place top
      if(row === 0) {
        this.tilesMatrix.unshift([undefined]);
        this.tilesMatrix[row][column] = this.emptyTile;
      } else {
        !this.tilesMatrix[row - 1][column] ? this.tilesMatrix[row - 1][column] = this.emptyTile : console.log('góra się nie wykonała');
      }
      console.log('koniec ustawiania pustych kafelek')
    }
    if(!tile.positionRef) {
      this.tilesMatrix = [[tile]]
    } else {
      const referencedTileId = tile.positionRef.referenceTile;
      let matrixRowIndex = 0;
      let matrixColumnIndex = 0;
      this.tilesMatrix.forEach((row, rowIndex) => {
        console.log(row.findIndex(tileInMatrix => tileInMatrix?._id === referencedTileId) !== -1);
        if(row.findIndex(tileInMatrix => tileInMatrix?._id === referencedTileId) !== -1) {
          console.log(this.tilesMatrix)
          matrixRowIndex = rowIndex;
          matrixColumnIndex = row.findIndex(tileInMatrix => tileInMatrix?._id === referencedTileId);
          const referenceTileRotation = this.tiles?.find(tile => tile._id === referencedTileId)?.rotation;
          const placeRight = () => {
            this.tilesMatrix[matrixRowIndex][matrixColumnIndex + 1] = tile;
          };
          const placeLeft = () => {
            if(matrixColumnIndex === 0){
              this.tilesMatrix[matrixRowIndex].unshift(tile);
              this.tilesMatrix.forEach((tilesRow, row, array) => {
                row === matrixRowIndex ? null : tilesRow.unshift(undefined);
              })
            } else {
              this.tilesMatrix[matrixRowIndex][matrixColumnIndex - 1] = tile;
            }
          };
          const placeTop = () => {
            if(matrixRowIndex === 0) {
              this.tilesMatrix.unshift([ tile ]);
              placeEmptyTiles(0, matrixRowIndex);
            } else {
              this.tilesMatrix[matrixRowIndex - 1][matrixColumnIndex] = tile;
            }
          };
          const placeBottom = () => {
            this.tilesMatrix[matrixRowIndex + 1] ? null : this.tilesMatrix[matrixRowIndex + 1] = [undefined]
            this.tilesMatrix[matrixRowIndex + 1][matrixColumnIndex] = tile;
          }
          switch(referenceTileRotation) {
            case 0:
              switch(tile.positionRef?.position) {
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
              switch(tile.positionRef?.position) {
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
              switch(tile.positionRef?.position) {
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
              switch(tile.positionRef?.position) {
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

          console.log(this.tilesMatrix)
        }
      })

    }
  }

  private positionTilesOnBoard() {
    if(this.tiles) {
      const tiles = this.tiles;
      tiles.forEach((tile, index, tiles) => {
        const currentTileAsHtmlElement = this.document.getElementById(tile._id);
        if(currentTileAsHtmlElement && this.tilesAreaWidth && this.tilesAreaHeight) {
          const previousTile = tile.positionRef?.referenceTile ? tiles[tiles.findIndex(tileInArray => tileInArray._id === tile.positionRef?.referenceTile)] : '';
          const previousTileId = tile.positionRef?.referenceTile.toString() || '';
          const previousTileAsHtmlElement = this.document.getElementById(previousTileId);
          const tilesAreaPosition = this.document.getElementById('tiles-area')?.getBoundingClientRect();
          const currentTileRotation = tile.rotation;
          if(!tile.positionRef) {
            currentTileAsHtmlElement.style.transform = `translate(${(this.tilesAreaWidth / 2) - 50}px, ${(this.tilesAreaHeight / 2) - 50}px)`;
            currentTileAsHtmlElement.style.transform += ` rotate(${currentTileRotation}deg)`;
          }else {
            if(previousTileAsHtmlElement && tilesAreaPosition && previousTile) {
              const previousTilePosition = previousTileAsHtmlElement.getBoundingClientRect();
              this.placeTilesRelativeToPrevious(currentTileAsHtmlElement, tile, tilesAreaPosition, previousTilePosition, previousTile, currentTileRotation);
            }
          }
        }
        this.createMatrix(tile);
      })
      console.log(this.tilesMatrix)
    }
  }

  //TO DO:
  //1. Rotacja kafelka ma się odnosić do kafelka podanego w positionRef, nie obecnego. DONE
  //2. Referencja ma się odnosić do kafelka podanego w positionRef, a nie poprzedniego kafeflka. DONE
  private placeTilesRelativeToPrevious(
    currentTileAsHtmlElement: HTMLElement,
    tile: Tile,
    tilesAreaPosition: DOMRect,
    previousTilePosition: DOMRect,
    previousTile: Tile,
    currentTileRotation: number) {
    const placeLeft = `translate(${previousTilePosition.x - tilesAreaPosition.x - previousTilePosition.width}px, ${previousTilePosition.y - tilesAreaPosition.y}px)`;
    const placeRight = `translate(${previousTilePosition.x - tilesAreaPosition.x + previousTilePosition.width}px, ${previousTilePosition.y - tilesAreaPosition.y}px)`;
    const placeTop = `translate(${previousTilePosition.x - tilesAreaPosition.x}px, ${previousTilePosition.y - tilesAreaPosition.y - previousTilePosition.height}px)`;
    const placeBottom = `translate(${previousTilePosition.x - tilesAreaPosition.x}px, ${previousTilePosition.y - tilesAreaPosition.y + previousTilePosition.height}px)`;
    const previousTileRotation = previousTile.rotation;
    switch(previousTileRotation) {
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
    currentTileAsHtmlElement.style.transform += ` rotate(${currentTileRotation}deg)`;
  }
}
