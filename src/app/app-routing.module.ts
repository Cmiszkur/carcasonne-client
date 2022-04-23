import { AuthGuard } from './user/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        redirectTo: '/game',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'game',
    canActivate: [AuthGuard],
    loadChildren: () => import('./game/game.module').then(module => module.GameModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
