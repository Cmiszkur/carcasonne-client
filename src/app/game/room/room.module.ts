import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PlayingRoomComponent } from "./playing-room/playing-room.component";
import { BoardComponent } from "./playing-room/board/board.component";
import { TileComponent } from "./playing-room/board/tile/tile.component";
import { EmptyTileComponent } from "./playing-room/board/empty-tile/empty-tile.component";
import { EmptyTileClickDirective } from "./playing-room/directives/empty-tile-click.directive";
import { CommonsModule } from "../../commons/commons.module";
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';


@NgModule({
  declarations: [
    RoomComponent,
    DashboardComponent,
    PlayingRoomComponent,
    BoardComponent,
    TileComponent,
    EmptyTileComponent,
    EmptyTileClickDirective,
    WaitingRoomComponent,
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    CommonsModule
  ]
})
export class RoomModule { }
