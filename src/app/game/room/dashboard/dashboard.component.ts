import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Player } from '../../models/Room';
import { RoomService } from '../../services/room.service';
import { AuthService } from '../../../user/auth.service';
import { UserResponse } from '../../../interfaces/responseInterfaces';

const follower = require('!!raw-loader?!../../../../assets/SVG/follower.svg');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  public arrayToIterate: Array<number>;
  public player: Player | null;
  public players: Player[];
  private user: UserResponse | null;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private roomService: RoomService,
    private authService: AuthService
  ) {
    this.arrayToIterate = Array(1).fill(1);
    this.players = this.roomService.currentRoom?.players || [];
    this.player = null;
    this.user = this.authService.user;
    iconRegistry.addSvgIconLiteral('follower', sanitizer.bypassSecurityTrustHtml(follower.default));
  }

  ngOnInit(): void {
    this.listenForCurrentRoomChanges();
  }

  private listenForCurrentRoomChanges(): void {
    this.roomService.currentRoomAsObservable().subscribe(room => {
      this.players = room?.players || [];
      console.log(this.players);
      this.player = this.findPlayer();
      this.arrayToIterate = Array(this.player?.followers).fill(1);
    });
  }

  /**
   * Finds player that corresponds to username of logged in user.
   * @private
   */
  private findPlayer(): Player | null {
    return this.players.find(player => player.username === this.user?.username) || null;
  }
}
