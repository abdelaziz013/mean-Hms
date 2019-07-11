import { Component, OnInit, OnDestroy } from '@angular/core';
import { OpcRoster } from '../opc-roster.model';
import { Subscription } from 'rxjs';
import { OpcService } from '../opc.service';
import { MatTableDataSource, PageEvent, MatDialog } from '@angular/material';
import { ConfirmationDialogeComponent } from 'src/app/confirmation-dialoge/confirmation-dialoge.component';

@Component({
  selector: 'app-opcroster-list',
  templateUrl: './opcroster-list.component.html',
  styleUrls: ['./opcroster-list.component.css']
})
export class OpcrosterListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['index', 'shiftDate', 'shiftName', 'opcName', 'doctorName', 'actionsColumn'];
  rosterLength = 0;
  opcRoster: OpcRoster[] = [];
  itemPerPage = 10;
  currentPge = 1;
  pageSizeOption = [10, 15, 20];
  private rosterSub: Subscription;
  dataSource;

  opcRosterSub: Subscription;

  constructor(private opcSrvice: OpcService, public dialog: MatDialog) { }

  ngOnInit() {
    this.opcSrvice.getroster(this.itemPerPage, this.currentPge);
    this.rosterSub = this.opcSrvice.opcRosterUpdateListene()
      .subscribe((rosterData: { roster: OpcRoster[], maxCount: number }) => {
        this.opcRoster = rosterData.roster;
        this.dataSource = new MatTableDataSource(rosterData.roster)
        this.rosterLength = rosterData.maxCount;

      })
  }

  onChangPage(event: PageEvent) {
    this.currentPge = event.pageIndex + 1;
    this.itemPerPage = event.pageSize;
    this.opcSrvice.getroster(this.itemPerPage, this.currentPge);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ondelete(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogeComponent, {
      width: '450px',
      data: `Are you sure you want to delete this roster?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.opcSrvice.deleteopcRoster(id)
      .subscribe(() => {
        this.opcSrvice.getroster(this.itemPerPage, this.currentPge);
      })
      }
    })
  }


  ngOnDestroy() {
    this.rosterSub.unsubscribe();
  }
}
