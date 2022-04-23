import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { PlayingRoomComponent } from './waiting-room/playing-room.component';
import { MatButtonModule } from '@angular/material/button';
import { BoardComponent } from './waiting-room/board/board.component';
import { DashboardComponent } from './waiting-room/dashboard/dashboard.component';
import { StartingRoomComponent } from './starting-room/starting-room.component';
import { TileComponent } from './waiting-room/board/tile/tile.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EmptyTileComponent } from './waiting-room/board/empty-tile/empty-tile.component';
import { EmptyTileClickDirective } from './waiting-room/directives/empty-tile-click.directive';
import { FetchedRoomsResultTableComponent } from './starting-room/fetched-rooms-result-table/fetched-rooms-result-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PlayerTableCellComponent } from './starting-room/fetched-rooms-result-table/player-table-cell/player-table-cell.component';

@NgModule({
  declarations: [
    PlayingRoomComponent,
    BoardComponent,
    DashboardComponent,
    StartingRoomComponent,
    TileComponent,
    EmptyTileComponent,
    EmptyTileClickDirective,
    FetchedRoomsResultTableComponent,
    PlayerTableCellComponent,
  ],
  imports: [CommonModule, GameRoutingModule, MatButtonModule, MatIconModule, DragDropModule, MatTableModule, MatCheckboxModule],
})
export class GameModule {}
