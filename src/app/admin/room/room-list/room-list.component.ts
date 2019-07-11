import { Component, OnInit, OnDestroy } from '@angular/core';
import { Room } from '../room.model';
import { RoomService } from '../room.service';
import { Subscription } from 'rxjs';
import { PageEvent, MatTableDataSource, MatDialog } from '@angular/material';
import { ConfirmationDialogeComponent } from 'src/app/confirmation-dialoge/confirmation-dialoge.component';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['index', 'number', 'type', 'cost', 'status', 'actionsColumn'];
  roomListLength = 0;
  itemPerPage = 10;
  currentPge = 1;
  pageSizeOption = [10, 15, 20];
  roomList: Room[] = [];
  private roomSub: Subscription;
  dataSource;


  constructor(private roomService: RoomService, public dialog: MatDialog) { }

  ngOnInit() {
    this.roomService.getRoomList(this.itemPerPage, this.currentPge);
    this.roomSub = this.roomService.getRoomUpdateListener()
      .subscribe((roomData: { room: Room[], maxCount: number }) => {
        this.roomList = roomData.room;
        this.roomListLength = roomData.maxCount;
        this.dataSource = new MatTableDataSource(roomData.room);
      })
  }

  onChangPage(event: PageEvent) {
    this.itemPerPage = event.pageSize + 1;
    this.currentPge = event.pageIndex;
    this.roomService.getRoomList(this.itemPerPage, this.currentPge);

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  onDelete(id: string, roomNumber: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogeComponent, {
      width: '450px',
      data: `Are you sure you want to delete room number ${roomNumber}?`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.roomService.deleteRoom(id).subscribe(() => {
          this.roomService.getRoomList(this.itemPerPage, this.currentPge)
        })
      }
    })
  }

  ngOnDestroy() {
    this.roomSub.unsubscribe()
  }



  // last
}
