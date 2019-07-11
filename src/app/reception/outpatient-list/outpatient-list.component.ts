import { Component, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { Patient } from '../patient/patient.model';
import { Subscription } from 'rxjs';
import { PatientService } from '../patient/patient-service.service';
import { UsersService } from 'src/app/admin/users/users.service';
import { PageEvent, MatTableDataSource, MatDialog } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ConfirmationDialogeComponent } from 'src/app/confirmation-dialoge/confirmation-dialoge.component';


@Component({
  selector: 'app-outpatient-list',
  templateUrl: './outpatient-list.component.html',
  styleUrls: ['./outpatient-list.component.css']
})
export class OutpatientListComponent implements OnInit, OnDestroy {
  outpatientList: Patient[] = [];

  outpatientListLength = 0;
  displayedColumns: string[] = ['index', 'name', 'gender', 'opc', 'doctor', 'actions']
  itemPerPage = 10;
  currentPge = 1;
  pageSizeOption = [10, 15, 20];
  private outpatientListSub: Subscription;
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

    this.patientService.getOutPatientList(this.itemPerPage, this.currentPge,this.doctorId);
    this.outpatientListSub = this.patientService.updateOutpatientListenr()
      .subscribe((patientData: { patient: Patient[], maxCount: number }) => {


        this.outpatientList = patientData.patient;
        this.outpatientListLength = patientData.maxCount;
        this.dataSource = new MatTableDataSource(patientData.patient);
      })

  }



  onChangPage(event: PageEvent) {
    this.itemPerPage = event.pageSize;
    this.currentPge = event.pageIndex + 1;
    this.patientService.getOutPatientList(this.itemPerPage, this.currentPge,this.doctorId,);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDeleteOutpatient(id: string,name:string) {
    const dialogRef = this.dialog.open(ConfirmationDialogeComponent, {
      width: '450px',
      data: `Are you sure you want to delete ${name}?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientService.deletePatient(id).subscribe((response) => {
          this.patientService.getOutPatientList(this.itemPerPage,this.currentPge,this.doctorId);
        })
      }
    })
  }


  ngOnDestroy() {
    this.outpatientListSub.unsubscribe();

  }




}
