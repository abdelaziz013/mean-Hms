import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { OpcShift } from '../opc-shift.model';
import { Subscription } from 'rxjs';
import { OpcService } from '../opc.service';
import { ConfirmationDialogeComponent } from 'src/app/confirmation-dialoge/confirmation-dialoge.component';

@Component({
  selector: 'app-opc-shiftlist',
  templateUrl: './opc-shiftlist.component.html',
  styleUrls: ['./opc-shiftlist.component.css']
})
export class OpcShiftlistComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['index', 'name', 'start Time', 'end Time', 'actions'];
  shiftList: OpcShift[] = [];
  private shiftSub: Subscription;
  dataSource;
  constructor(private opcService: OpcService, public dialog: MatDialog) { }

  ngOnInit() {
    this.opcService.getOpcShift();
    this.shiftSub = this.opcService.opcShiftUpdateListener()
      .subscribe((responseData) => {
        this.shiftList = responseData.opcShift,
          this.dataSource = new MatTableDataSource(responseData.opcShift)
      })
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ondelete(id, name) {
    const dialogRef = this.dialog.open(ConfirmationDialogeComponent, {
      width: '450px',
      data: `Are you sure you want to delete ${name}?`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.opcService.deleteOpcShift(id).subscribe((response) => {
          this.opcService.getOpcShift();
        })
      }
    })
  }

  ngOnDestroy() {
    this.shiftSub.unsubscribe()
  }
}
