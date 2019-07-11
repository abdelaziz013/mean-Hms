import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Doctor } from '../doctor.model';
import { DoctorsService } from '../doctors.service';
import { Subscription } from 'rxjs';
import { UsersService } from '../../users/users.service';
import { PageEvent, MatTableDataSource, MatDialog } from '@angular/material';
import { ConfirmationDialogeComponent } from 'src/app/confirmation-dialoge/confirmation-dialoge.component';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DoctorsListComponent implements OnInit, OnDestroy {
  doctorList: Doctor[] = [];
  doctorListLength = 0;
  doctorsPerPage = 10;
  currentPage = 1;
  pageSizeOption = [10, 15, 20];
  displayedColumns: string[] = ['index', 'name', 'phone', 'speciality', 'rank', 'actionsColumn'];
  private doctorsSub: Subscription;

  userId: string;

  dataSource;


  constructor(public doctorsService: DoctorsService,
              private userService: UsersService,
              public dialog: MatDialog
              ) { }

  ngOnInit() {
    this.doctorsService.getDoctors(this.doctorsPerPage, this.currentPage);
    this.userId = this.userService.getUserId();
    this.doctorsSub = this.doctorsService.getUpdatedDoctorsListener()
      .subscribe((doctorsData: { doctors: Doctor[], doctorsCount: number }) => {
        this.doctorList = doctorsData.doctors;
        this.dataSource = new MatTableDataSource(doctorsData.doctors);
        this.doctorListLength = doctorsData.doctorsCount;
      })
  }

  onChangPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.doctorsPerPage = pageData.pageSize;
    this.doctorsService.getDoctors(this.doctorsPerPage, this.currentPage);

  }



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  onDelete(doctorId: string,doctorName) {
    const dialogRef = this.dialog.open(ConfirmationDialogeComponent, {
      width: '350px',
      data: `Are you sure you want to delete ${doctorName}?`
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.doctorsService.deleteDoctor(doctorId).subscribe(() => {
          this.doctorsService.getDoctors(this.doctorsPerPage, this.currentPage)
        });

      }
    });
  }


  ngOnDestroy() {
    this.doctorsSub.unsubscribe();
  }

}
