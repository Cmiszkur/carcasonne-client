import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/game/models/Room';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const meeple = require('!!raw-loader?!../../../../../assets/SVG/meeple.svg');

@Component({
  selector: 'app-player-table-cell',
  templateUrl: './player-table-cell.component.html',
  styleUrls: ['./player-table-cell.component.sass'],
})
export class PlayerTableCellComponent implements OnInit {
  @Input() players: Player[];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.players = [];
    iconRegistry.addSvgIconLiteral('meeple', sanitizer.bypassSecurityTrustHtml(meeple.default));
  }

  ngOnInit(): void {}
}
