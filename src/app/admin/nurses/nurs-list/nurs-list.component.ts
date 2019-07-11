import { Component, OnInit, OnDestroy } from '@angular/core';
import { Nurse } from '../nurse.model';
import { NursesService } from '../nurses.service';
import { Subscription } from 'rxjs';
import { PageEvent, MatTableDataSource, MatDialog } from '@angular/material';
import { ConfirmationDialogeComponent } from 'src/app/confirmation-dialoge/confirmation-dialoge.component';

@Component({
  selector: 'app-nurs-list',
  templateUrl: './nurs-list.component.html',
  styleUrls: ['./nurs-list.component.css']
})
export class NursListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['index', 'name', 'phone', 'address', 'actionsColumn'];
  nurseListLength = 0;
  itemPerPage = 10;
  currentPge = 1;
  pageSizeOption = [10, 15, 20];
  nursesList: Nurse[] = [];
  private nursesub: Subscription;
  dataSource;



  constructor(public nurseService: NursesService, public dialog: MatDialog) { }


  ngOnInit() {
    this.nurseService.getNurseList(this.itemPerPage, this.currentPge);
    this.nursesub = this.nurseService.getupdatenurselistener()
      .subscribe((nurseData: { nurses: Nurse[], nursesCount: number }) => {
        this.nursesList = nurseData.nurses;
        this.dataSource = new MatTableDataSource(nurseData.nurses);
        this.nurseListLength = nurseData.nursesCount;
      })
  }

  onChangPage(pageData: PageEvent) {
    this.currentPge = pageData.pageIndex + 1;
    this.itemPerPage = pageData.pageSize;
    this.nurseService.getNurseList(this.itemPerPage, this.currentPge)
  }

  ondelete(id: string, name: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogeComponent, {
      width: '450px',
      data: `Are you sure you want to delete ${name}?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.nurseService.deletNurse(id).subscribe(() => {
          this.nurseService.getNurseList(this.itemPerPage, this.currentPge);
        });
      }
    }
    )
  }




  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngOnDestroy() {
    this.nursesub.unsubscribe();
  }

}
