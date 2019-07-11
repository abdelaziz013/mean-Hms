import { Component, OnInit, OnDestroy, ViewEncapsulation, SimpleChanges } from '@angular/core';
import { Patient } from '../patient/patient.model';
import { Subscription } from 'rxjs';
import { PatientService } from '../patient/patient-service.service';
import { PageEvent, MatTableDataSource, MatDialog } from '@angular/material';
import { UsersService } from 'src/app/admin/users/users.service';
import { ConfirmationDialogeComponent } from 'src/app/confirmation-dialoge/confirmation-dialoge.component';





@Component({
  selector: 'app-inpatient-list',
  templateUrl: './inpatient-list.component.html',
  styleUrls: ['./inpatient-list.component.css'],

  encapsulation: ViewEncapsulation.None
})
export class InpatientListComponent implements OnInit, OnDestroy {


  inpatientList: Patient[] = [];

  inpatientListLength = 0;
  displayedColumns = ['index', 'name', 'gender', 'room', 'doctor', 'actions']
  itemPerPage = 10;
  currentPge = 1;
  pageSizeOption = [10, 15, 20];
  private inpatientListSub: Subscription;
  userRole: string;
  private authListenerSubs: Subscription;
  dataSource;
  doctorId;



  constructor(private patientService: PatientService,
              private userService: UsersService,
              public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userRole = this.userService.getRole();
    this.doctorId = this.userService.getLoginDoctor()
    this.authListenerSubs = this.userService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userRole = this.userService.getRole();
        this.doctorId = this.userService.getLoginDoctor();
      });

    this.patientService.getInPatientList(this.itemPerPage, this.currentPge,this.doctorId);
    this.inpatientListSub = this.patientService.updateInpatientListenr()
      .subscribe((patientData: { patient: Patient[], maxCount: number }) => {
        // if(this.doctorId !== 'noDoctor'){
        //   patientData.patient = patientData.patient.filter(element=>{
        //     return element.caringDoctor._id === this.doctorId;
        //   })
        //   patientData.maxCount = patientData.patient.length;

        // }

        this.inpatientList = patientData.patient;
        this.inpatientListLength = patientData.maxCount;
        this.dataSource = new MatTableDataSource(this.inpatientList);
      })
  }




  onChangPage(event: PageEvent) {
    this.itemPerPage = event.pageSize;
    this.currentPge = event.pageIndex + 1;
    this.patientService.getInPatientList(this.itemPerPage, this.currentPge,this.doctorId);
  }

  deleteInpatient(id: string, name: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogeComponent, {
      width: '450px',
      data: `Are you sure you want to delete ${name}?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientService.deletePatient(id).subscribe((response) => {
          this.patientService.getInPatientList(this.itemPerPage, this.currentPge,this.doctorId);
        })
      }
    })
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




  ngOnDestroy() {
    this.inpatientListSub.unsubscribe();
  }

}
