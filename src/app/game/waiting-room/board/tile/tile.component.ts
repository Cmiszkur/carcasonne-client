import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class TileComponent implements OnInit {

  dragPosition: DragPosition = {x: 0, y: 0}
  @Input() tile: Tile | null;
  @Input() isDraggable: boolean;
  @Output() ImageLoaded = new EventEmitter<boolean>();

  constructor() {
    this.tile = null;
    this.isDraggable = false;
  }

  ngOnInit(): void {
  }

  public onImageLoad() {
    this.ImageLoaded.emit(true);
  }

  public getImageSource(imageName: string) {
    return `../../../assets/PNG/${imageName}.png`
  }

}
