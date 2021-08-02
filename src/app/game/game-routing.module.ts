import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './room/room.component';
import { StartingRoomComponent } from './starting-room/starting-room.component';
import { PlayingRoomComponent } from './waiting-room/playing-room.component';

const routes: Routes = [
  {
    path: 'game',
    component: RoomComponent,
    children: [
      {
        path: '',
        children: [{ path: '', component: StartingRoomComponent }],
      },
      {
        path: '',
        children: [{ path: 'playing-room', component: PlayingRoomComponent }],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
