import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../user/auth.guard';
import { RoomResolver } from './resolvers/room.resolver';
import { StartingRoomComponent } from './starting-room/starting-room.component';
import { PlayingRoomComponent } from './waiting-room/playing-room.component';

const routes: Routes = [
  {
    path: '',
    resolve: {
      rooms: RoomResolver,
    },
    component: StartingRoomComponent,
  },
  {
    path: 'board',
    component: PlayingRoomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
