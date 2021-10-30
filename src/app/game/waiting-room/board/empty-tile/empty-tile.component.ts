import { ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Coordinates, Emptytile } from "../../../models/emptytile";
import { Tile } from "../../../models/Tile";
import { BoardTilesService } from "../../../services/board-tiles.service";

@Component({
  selector: 'app-empty-tiles',
  templateUrl: './empty-tile.component.html',
  styleUrls: ['./empty-tile.component.sass']
})
export class EmptyTileComponent implements OnChanges {

  @Input() translate: string

  constructor() {
    this.translate = ''
  }



  ngOnChanges(changes: SimpleChanges) {
    if(changes.translate) {
    }
  }

}
