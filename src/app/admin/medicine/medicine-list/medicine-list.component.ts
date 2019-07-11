import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medicine } from '../medicine.model';
import { MedicineService } from '../medicine.service';
import { Subscription } from 'rxjs';
import { PageEvent, MatTableDataSource, MatDialog } from '@angular/material';
import { ConfirmationDialogeComponent } from 'src/app/confirmation-dialoge/confirmation-dialoge.component';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements OnInit, OnDestroy {

  medicineList: Medicine[] = []
  displayedColumns: string[] = ['index', 'name', 'cost', 'action']
  medicineListLength = 0;
  itemPerPage = 10;
  currentPge = 1;
  pageSizeOption = [10, 15, 20];
  private medListSub: Subscription;
  dataSource;


  constructor(private medicineService: MedicineService, public dialog: MatDialog) { }

  ngOnInit() {
    this.medicineService.getMedicineList(this.itemPerPage, this.currentPge)
    this.medListSub = this.medicineService.getMedUpdateListner()
      .subscribe((medListData: { medicine: Medicine[], maxCount: number }) => {
        this.medicineList = medListData.medicine;
        this.medicineListLength = medListData.maxCount;
        this.dataSource = new MatTableDataSource(medListData.medicine);

      })
  }

  onChangPage(event: PageEvent) {
    this.itemPerPage = event.pageSize;
    this.currentPge = event.pageIndex + 1
    this.medicineService.getMedicineList(this.itemPerPage, this.currentPge)
  }

  onDelete(id: string, name: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogeComponent, {
      width: '450px',
      data: `Are you sure you want to delete ${name}?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.medicineService.deleteMedicine(id)
        .subscribe(() => {
          this.medicineService.getMedicineList(this.itemPerPage, this.currentPge)
        })
      }
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngOnDestroy() {
    this.medListSub.unsubscribe()
  }



}
