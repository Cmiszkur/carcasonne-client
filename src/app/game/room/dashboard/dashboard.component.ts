import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Player } from '../../models/Room';
import { RoomService } from '../../services/room.service';
import { AuthService } from '../../../user/auth.service';
import { UserResponse } from '../../../interfaces/responseInterfaces';
import { Constants } from '../../../constants/httpOptions';

const follower = require('!!raw-loader?!../../../../assets/SVG/follower.svg');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  /**
   * Array with length equal to number of meeples the players have.
   * Used to iterate over in HTML template.
   */
  public arrayToIterate: Array<number>;
  /**
   * Currently logged in user.
   */
  public player: Player | null;
  /**
   * All players beside logged in user.
   */
  public restOfThePlayers: Player[];
  /**
   * Currently logged in user data.
   * @private
   */
  private user: UserResponse | null;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private roomService: RoomService,
    private authService: AuthService
  ) {
    this.arrayToIterate = Array(1).fill(1);
    this.restOfThePlayers = [];
    this.player = null;
    this.user = this.authService.user;
    iconRegistry.addSvgIconLiteral('follower', sanitizer.bypassSecurityTrustHtml(follower.default));
  }

  ngOnInit(): void {
    this.listenForCurrentRoomChanges();
  }

  private listenForCurrentRoomChanges(): void {
    this.roomService.currentRoomAsObservable().subscribe(room => {
      const players: Player[] = room?.players || [];
      this.player = this.findPlayer(players);
      this.restOfThePlayers = this.getRestOfThePlayers(players);
      this.arrayToIterate = Array(this.player?.followers).fill(1);
    });
  }

  /**
   * Finds player that corresponds to username of logged in user.
   * @private
   */
  private findPlayer(players: Player[]): Player | null {
    return players.find(player => player.username === this.user?.username) || null;
  }

  /**
   * Returns all players but the one logged in.
   * @param players
   * @private
   */
  private getRestOfThePlayers(_players: Player[]): Player[] {
    const players: Player[] = Constants.copy<Player[]>(_players);
    players.forEach((player, index, array) => {
      if (player.username === this.user?.username) delete array[index];
    });
    return players;
  }
}
