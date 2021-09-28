import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[emptyTileClick]'
})
export class EmptyTileClickDirective {

  constructor() { }

  @HostListener('click', ['emptyTile'])
  onClick(event: any) {
    console.log(event)
  }

}
