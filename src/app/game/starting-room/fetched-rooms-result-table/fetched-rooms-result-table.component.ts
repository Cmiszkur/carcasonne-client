import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Room } from '../../models/Room';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-fetched-rooms-result-table',
  templateUrl: './fetched-rooms-result-table.component.html',
  styleUrls: ['./fetched-rooms-result-table.component.sass'],
})
export class FetchedRoomsResultTableComponent implements OnChanges {
  public displayedColumns: string[];
  public selection: SelectionModel<Room>;
  public dataSource: MatTableDataSource<Room>;
  @Input() public availableRooms: Room[] | null;

  constructor() {
    this.displayedColumns = ['select', 'roomId', 'players', 'roomHost', 'numberOfPlayers'];
    this.dataSource = new MatTableDataSource<Room>([]);
    this.selection = new SelectionModel<Room>(false, []);
    this.availableRooms = null;
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.availableRooms.currentValue) {
      if (this.availableRooms) {
        console.log('availableRooms', this.availableRooms);
        this.dataSource = new MatTableDataSource<Room>(this.availableRooms);
      }
    }
  }
}
