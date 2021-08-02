import { ThemesService } from '../themes.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

const githubIcon = require('!!raw-loader?!../../assets/SVG/github-icon.svg');
const sunIcon = require('!!raw-loader?!../../assets/SVG/Sun.svg');
const moonIcon = require('!!raw-loader?!../../assets/SVG/Moon.svg');

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass'],
})
export class ToolbarComponent implements OnInit {
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public themeService: ThemesService
  ) {
    iconRegistry.addSvgIconLiteral(
      'github',
      sanitizer.bypassSecurityTrustHtml(githubIcon.default)
    );
    iconRegistry.addSvgIconLiteral(
      'moon',
      sanitizer.bypassSecurityTrustHtml(moonIcon.default)
    );
    iconRegistry.addSvgIconLiteral(
      'sun',
      sanitizer.bypassSecurityTrustHtml(sunIcon.default)
    );
  }

  ngOnInit(): void {}

  changeTheme(input: string) {
    this.themeService.loadStyle(input);
    this.themeService.changeTheme(input);
  }
}
