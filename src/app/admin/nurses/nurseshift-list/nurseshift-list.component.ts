import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { NursesService } from '../nurses.service';
import { NurseShift } from '../nurseShift.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ConfirmationDialogeComponent } from 'src/app/confirmation-dialoge/confirmation-dialoge.component';



@Component({
  selector: 'app-nurseshift-list',
  templateUrl: './nurseshift-list.component.html',
  styleUrls: ['./nurseshift-list.component.css']
})
export class NurseshiftListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['index', 'name', 'start Time', 'end Time', 'actions'];
  ShiftList: NurseShift[] = [];
  private shiftSub: Subscription;
  dataSource;

  constructor(private nurseService: NursesService, public dialog: MatDialog) { }

  ngOnInit() {
    this.nurseService.getShift();
    this.shiftSub = this.nurseService.getShiftUpdate()
      .subscribe((data: { nurseShift: NurseShift[] }) => {
        this.ShiftList = data.nurseShift;
        this.dataSource = new MatTableDataSource(data.nurseShift)
      })

  }

  ondelete(id, name) {


    const dialogRef = this.dialog.open(ConfirmationDialogeComponent, {
      width: '450px',
      data: `Are you sure you want to delete ${name}?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.nurseService.deleteShift(id).subscribe((response) => {
          this.nurseService.getShift();
        })
     }

    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.shiftSub.unsubscribe()
  }
}
