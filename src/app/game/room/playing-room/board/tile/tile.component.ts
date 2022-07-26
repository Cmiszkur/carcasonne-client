import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Position, Tile, TileEnvironments } from '../../../../models/Tile';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Pawn } from '../../../../models/pawn';
import { ExtendedTile } from 'src/app/game/models/Room';
import { BaseComponent } from 'src/app/commons/components/base/base.component';
import { RoomService } from 'src/app/game/services/room.service';

const follower = require('!!raw-loader?!../../../../../../assets/SVG/follower.svg');

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.sass'],
})
export class TileComponent extends BaseComponent implements OnChanges, OnInit {
  /**
   * Extended tile data.
   */
  @Input() public extendedTile: ExtendedTile | null;
  /**
   * Rotation of tile.
   */
  @Input() public rotation: number;
  /**
   * Translate string, which is used in template to position tile in DOM.
   */
  @Input() public translate: string;
  /**
   * Indicates confirmation of tile placement. Based on this variable possible pawn placements are determined.
   */
  @Input() public isTilePlacementConfirmed: boolean;
  /**
   * Indicates confirmation of tile and pawn placement. Based on this variable tile is send to the server.
   */
  @Input() public istileAndPawnPlacementConfirmed: boolean;
  /**
   * Tile environments casted to object.
   */
  @Input() public tileEnvironments: TileEnvironments;
  /**
   * Boolean that determines whether this tile is currently placed tile.
   */
  @Input() public isCurrentTile: boolean;
  /**
   * Emits pawn placed on a tile.
   */
  @Output() public placedPawn: EventEmitter<Pawn>;
  /**
   * Pawns corresponding to possible positions on the tile.
   */
  public pawns: Pawn[];
  /**
   * Color of pawns of logged in player.
   */
  public loggedPlayerColor: string | null;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private roomService: RoomService) {
    super();
    this.extendedTile = null;
    this.rotation = 0;
    this.translate = '';
    this.isTilePlacementConfirmed = false;
    this.istileAndPawnPlacementConfirmed = false;
    this.tileEnvironments = {} as TileEnvironments;
    this.pawns = [];
    this.isCurrentTile = false;
    this.loggedPlayerColor = this.roomService.playersValue?.loggedPlayer?.color || null;
    iconRegistry.addSvgIconLiteral('follower', sanitizer.bypassSecurityTrustHtml(follower.default));
    this.placedPawn = new EventEmitter();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isTilePlacementConfirmed) {
      if (this.isCurrentTile) this.pawns = this.fillPossiblePawnPlacements();
    }
  }

  ngOnInit() {
    if (this.isCurrentTile) this.pawns = this.fillPossiblePawnPlacements();
  }

  public makeRotateTransformString(rotation: number): string {
    return `rotate(${rotation}deg)`;
  }

  public getImageSource(imageName: string) {
    return `../../../assets/PNG/${imageName}.png`;
  }

  /**
   * Marks clicked pawn as selected which colors it in the color of logged player.
   * Emits value to ``board.component``.
   * @param pawn clicked pawn
   */
  public placePawn(pawn: Pawn): void {
    this.pawns.forEach(p => (p.selected = false));
    pawn.selected = true;
    this.placedPawn.emit(pawn);
  }

  private fillPossiblePawnPlacements(): Pawn[] {
    const possiblePawnPlacements: Pawn[] = [];

    if (this.extendedTile && this.extendedTile.tile.tileValues) {
      const tileValues: Tile['tileValues'] = JSON.parse(JSON.stringify(this.extendedTile.tile.tileValues));
      const shiftValue = this.rotation >= 360 ? 0 : this.rotation / 90;
      const environmentValues: Position[] = [Position.TOP, Position.RIGHT, Position.BOTTOM, Position.LEFT];

      for (const [key, value] of Object.entries(tileValues)) {
        value.forEach((values: Position[]) => {
          values.forEach((environmentValue, environmentIndex) => {
            const environmentValuesIndex = environmentValues.indexOf(environmentValue);
            const environmentValuesIndexWithRotation = (environmentValuesIndex + shiftValue) % 4;
            values[environmentIndex] = environmentValues[environmentValuesIndexWithRotation];
          });

          if (values.length >= 2) {
            possiblePawnPlacements.push({
              transformValue: 'translate(32px, 32px)',
              position: key,
              direction: values,
            });
          }

          if (values.length === 1) {
            switch (values[0]) {
              case 'TOP':
                possiblePawnPlacements.push({
                  transformValue: 'translate(32px, 0)',
                  position: key,
                  direction: [Position.TOP],
                });
                break;
              case 'RIGHT':
                possiblePawnPlacements.push({
                  transformValue: 'translate(70px, 32px)',
                  position: key,
                  direction: [Position.RIGHT],
                });
                break;
              case 'BOTTOM':
                possiblePawnPlacements.push({
                  transformValue: 'translate(32px, 70px)',
                  position: key,
                  direction: [Position.BOTTOM],
                });
                break;
              case 'LEFT':
                possiblePawnPlacements.push({
                  transformValue: 'translate(0, 32px)',
                  position: key,
                  direction: [Position.LEFT],
                });
                break;
            }
          }
        });
      }
    }
    return possiblePawnPlacements;
  }
}
