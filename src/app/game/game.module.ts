import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { PlayingRoomComponent } from './waiting-room/playing-room.component';
import { RoomComponent } from './room/room.component';
import { MatButtonModule } from '@angular/material/button';
import { BoardComponent } from './waiting-room/board/board.component';
import { DashboardComponent } from './waiting-room/dashboard/dashboard.component';
import { StartingRoomComponent } from './starting-room/starting-room.component';
import { TileComponent } from './waiting-room/board/tile/tile.component';
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [
    PlayingRoomComponent,
    RoomComponent,
    BoardComponent,
    DashboardComponent,
    StartingRoomComponent,
    TileComponent,
  ],
  imports: [ CommonModule, GameRoutingModule, MatButtonModule, MatIconModule, DragDropModule ],
})
export class GameModule {}
