import { Component, OnInit } from '@angular/core';
import { NurseRoster } from '../roster.model';
import { Subscription } from 'rxjs';
import { NursesService } from '../nurses.service';
import { PageEvent, MatTableDataSource, MatDialog } from '@angular/material';
import { ConfirmationDialogeComponent } from 'src/app/confirmation-dialoge/confirmation-dialoge.component';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-nroster-list',
  templateUrl: './nroster-list.component.html',
  styleUrls: ['./nroster-list.component.css']
})
export class NrosterListComponent implements OnInit {

  displayedColumns: string[] = ['index', 'shiftDate', 'shiftName', 'nurseName', 'actionsColumn'];
  rosterLength = 0;
  roster: NurseRoster[] = [];
  itemPerPage = 10;
  currentPge = 1;
  pageSizeOption = [10, 15, 20];
  private rosterSub: Subscription;
  dataSource;
  userRole: string;
  private authListenerSubs: Subscription;

  constructor(private nursesService: NursesService,
              public dialog: MatDialog,
              private userService: UsersService

  ) { }

  ngOnInit() {
    this.nursesService.getroster(this.itemPerPage, this.currentPge);
    this.rosterSub = this.nursesService.getrosterUpdateListener()
      .subscribe((rosterData: { roster: NurseRoster[], maxCount: number }) => {

        this.roster = rosterData.roster;
        this.dataSource = new MatTableDataSource(rosterData.roster)
        this.rosterLength = rosterData.maxCount;
      });

    this.userRole = this.userService.getRole();
    this.authListenerSubs = this.userService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userRole = this.userService.getRole();
      });

  }

  onChangPage(event: PageEvent) {
    this.currentPge = event.pageIndex + 1;
    this.itemPerPage = event.pageSize;
    this.nursesService.getroster(this.itemPerPage, this.currentPge);
  }

  ondelete(id: string) {

    const dialogRef = this.dialog.open(ConfirmationDialogeComponent, {
      width: '450px',
      data: `Are you sure you want to delete this roster?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.nursesService.deleteRoster(id).subscribe(() => {
          this.nursesService.getroster(this.itemPerPage, this.currentPge);
        })
      }
    })

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
