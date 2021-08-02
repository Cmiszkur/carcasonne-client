import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Player } from '../../models/Room';

const follower = require('!!raw-loader?!../../../../assets/SVG/follower.svg');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  @Input() arrayToIterate: Array<number>;
  @Input() player: Player | null;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.arrayToIterate = Array(1).fill(1);
    this.player = null;
    iconRegistry.addSvgIconLiteral(
      'follower',
      sanitizer.bypassSecurityTrustHtml(follower.default)
    );
  }

  ngOnInit(): void {}
}
