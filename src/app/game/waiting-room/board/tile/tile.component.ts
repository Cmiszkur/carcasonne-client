import {
  Component,
  Input,
  OnChanges, OnInit,
  SimpleChanges
} from '@angular/core';
import { Tile, TileEnvironments } from "../../../models/Tile";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Pawn } from "../../../models/pawn";

const follower = require('!!raw-loader?!../../../../../assets/SVG/follower.svg');

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.sass']
})
export class TileComponent implements OnChanges, OnInit {

  @Input() tile: Tile | null;
  @Input() rotation: number;
  @Input() translate: string;
  @Input() isTilePlacementConfirmed: boolean;
  @Input() tileEnvironments: TileEnvironments;
  @Input() isCurrentTile: boolean;
  public pawns: Pawn[];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.tile = null;
    this.rotation = 0;
    this.translate = '';
    this.isTilePlacementConfirmed = false;
    this.tileEnvironments = {} as TileEnvironments;
    this.pawns = [];
    this.isCurrentTile = false;
    iconRegistry.addSvgIconLiteral(
      'follower',
      sanitizer.bypassSecurityTrustHtml(follower.default)
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.rotation) {
      if(this.isCurrentTile) this.pawns = this.fillPossiblePawnPlacements();
    }
  }

  ngOnInit() {
    if(this.isCurrentTile) this.pawns = this.fillPossiblePawnPlacements();
  }

  public makeRotateTransformString(rotation: number): string {
    return `rotate(${rotation}deg)`;
  }

  public getImageSource(imageName: string) {
    return `../../../assets/PNG/${imageName}.png`;
  }

  private fillPossiblePawnPlacements(): Pawn[] {

    const possiblePawnPlacements: Pawn[] = [];

    if(this.tile && this.tile?.tileValues) {

      const tileValues: Tile['tileValues'] = JSON.parse(JSON.stringify(this.tile.tileValues));
      const shiftValue = this.rotation >= 360 ? 0 : this.rotation / 90;
      const environmentValues = ['TOP', 'RIGHT', 'BOTTOM', 'LEFT'];

      for (const [ key, value ] of Object.entries(tileValues)) {
        value.forEach((values) => {

          values.forEach((environmentValue, environmentIndex) => {
            const environmentValuesIndex = environmentValues.indexOf(environmentValue);
            const environmentValuesIndexWithRotation = (environmentValuesIndex + shiftValue) === 3 ?
              3 : (environmentValuesIndex + shiftValue) % 3;
            values[environmentIndex] = environmentValues[environmentValuesIndexWithRotation];
          })

          if(values.length === 2 || values.length === 3 || value.length === 4) {
            possiblePawnPlacements.push({
              transformValue: 'translate(32px, 32px)',
              value: key,
              direction: values
            });
          }

          if(values.length === 1) {
            switch(values[0]) {
              case 'TOP':
                possiblePawnPlacements.push({
                  transformValue: 'translate(32px, 0)',
                  value: key,
                  direction: ['TOP']
                });
                break;
              case 'RIGHT':
                possiblePawnPlacements.push({
                  transformValue: 'translate(70px, 32px)',
                  value: key,
                  direction: ['RIGHT']
                });
                break;
              case 'BOTTOM':
                possiblePawnPlacements.push({
                  transformValue: 'translate(70px, 32px)',
                  value: key,
                  direction: ['BOTTOM']
                });
                break;
              case 'LEFT':
                possiblePawnPlacements.push({
                  transformValue: 'translate(0, 32px)',
                  value: key,
                  direction: ['LEFT']
                });
                break;
            }
          }

        })
      }
    }
    return possiblePawnPlacements;
  }

}
