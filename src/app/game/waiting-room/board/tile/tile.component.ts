import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component, ElementRef,
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
export class TileComponent implements OnChanges {

  @Input() tile: Tile | null;
  @Input() isDraggable: boolean;
  @Input() rotation: number;
  @Input() translate: string;
  @Output() translateValueChanged = new EventEmitter<boolean>();

  constructor(private cdf: ChangeDetectorRef, private el: ElementRef) {
    this.tile = null;
    this.isDraggable = false;
    this.rotation = 0;
    this.translate = '';
  }


  ngOnChanges(changes: SimpleChanges) {
    if(changes.translate) {
      console.log('emitowanie tutaj powinno być')
      this.translateValueChanged.emit(true);
    }
  }

  public onImageLoad() {
    this.translateValueChanged.emit(true)
  }

  public makeRotateTransformString(rotation: number): string {
    return `rotate(${rotation}deg)`
  }

  public getImageSource(imageName: string) {
    return `../../../assets/PNG/${imageName}.png`
  }

}
