import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { Tile } from "../../../models/Tile";

interface DragPosition {
  x: number,
  y: number
}

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.sass']
})
export class TileComponent implements OnInit, OnChanges {

  dragPosition: DragPosition = {x: 0, y: 0}
  @Input() tile: Tile | null;
  @Input() isDraggable: boolean;
  @Input() rotation: number;
  @Input() translate: string;
  @Output() ImageLoaded = new EventEmitter<boolean>();
  tileTransformValue: string;

  constructor(private cdf: ChangeDetectorRef) {
    this.tile = null;
    this.isDraggable = false;
    this.rotation = 0;
    this.translate = '';
    this.tileTransformValue = ''
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.rotation || changes.translate) {
      this.tileTransformValue = this.translate + `rotate(${this.rotation}deg)`
      this.cdf.markForCheck()
    }
  }

  public onImageLoad() {
    this.ImageLoaded.emit(true);
  }

  public tileOverOtherTile() {
    console.log('kafelek jest nad innym kafelkiem');
  }

  public getImageSource(imageName: string) {
    return `../../../assets/PNG/${imageName}.png`
  }

}
