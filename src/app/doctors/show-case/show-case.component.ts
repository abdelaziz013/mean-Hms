import { Component, OnInit, OnDestroy } from '@angular/core';
import { Diagnosis } from '../diagnosis.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DiagnosisServiceService } from '../diagnosis-service.service';
import { Prescription } from '../add-prescription/prescribtion.model';
import { Subscription } from 'rxjs';
import { PrescriptionServiceService } from '../add-prescription/prescription-service.service';
import { Pservice } from '../patient-services/pservice.model';
import { PserviceService } from '../patient-services/pservice.service';
import { Patient } from 'src/app/reception/patient/patient.model';
import { PatientService } from 'src/app/reception/patient/patient-service.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogeComponent } from 'src/app/confirmation-dialoge/confirmation-dialoge.component';


@Component({
  selector: 'app-show-case',
  templateUrl: './show-case.component.html',
  styleUrls: ['./show-case.component.css']
})
export class ShowCaseComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  diagnosis: Diagnosis;
  diagnosisSub: Subscription;
  pService: Pservice[];
  presList: Prescription[];
  presListLength: number;
  presSub: Subscription;
  serviceSub: Subscription;
  displayedColumns: string[] = ['index', 'medicine', 'dose', 'action']
  serviceColumns: string[] = ['index', 'service', 'category', 'action']
  id: string;
  patient: Patient;
  moment: any;
  patientAge;


  constructor(private route: ActivatedRoute,
              private diagnsisService: DiagnosisServiceService,
              private presService: PrescriptionServiceService,
              private patientService: PserviceService,
              private patientById: PatientService,
              public dialog: MatDialog
                ) {
    this.moment = moment();

  }

  ngOnInit() {
    // get id
    this.route.paramMap.subscribe((paramMab: ParamMap) => {
      this.id = paramMab.get('id');
    })

    // get patient diagnosis
    this.diagnsisService.getDiagnosis(this.id);
    this.diagnosisSub = this.diagnsisService.diagnsisupdatlistenr()
      .subscribe((responseData) => {
        this.diagnosis = responseData.diagnosis;
      })


    // get prescription
    this.presService.getPrescription(this.id);
    this.presSub = this.presService.presListUpdateListener()
      .subscribe((responseData) => {
        this.presList = responseData.pres;
        this.presList = this.presList.filter(element => {
          return element.medicine !== null;
        })
        this.presListLength = this.presList.length;
      })


    // get patientServices
    this.patientService.getPtientService(this.id);
    this.serviceSub = this.patientService.pServiceUpdateListener()
      .subscribe((response) => {
        console.log(response)
        this.pService = response.pservice;
        this.pService =this.pService.filter(element=>{
          return  element.pService !== null;
        })
      })

    // get patient
    this.patientById.getPatientById(this.id).subscribe((responseData) => {
      this.patient = responseData.patient;
      this.patientAge = this.calculate_age(this.patient.birthDate);
    })
  }

  ondelete(id: string, name: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogeComponent, {
      width: '450px',
      data: `Are you sure you want to delete ${name} Diagnosis?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.diagnsisService.deleteDiagnosis(id).subscribe(() => {
          this.diagnsisService.getDiagnosis(id);
        })
      }
    })
  }

  deletePres(id: string,name: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogeComponent, {
      width: '450px',
      data: `Are you sure you want to delete ${name}?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.presService.deletePres(id).subscribe((response) => {
          this.presService.getPrescription(this.id);
        })
      }
    })
  }

  deleteService(id: string, name: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogeComponent, {
      width: '450px',
      data: `Are you sure you want to delete ${name}?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientService.deletePatientService(id).subscribe((response) => {
          this.patientService.getPtientService(this.id)
        })
      }
    })
  }

  // last
  ngOnDestroy() {
    this.diagnosisSub.unsubscribe();
    this.presSub.unsubscribe();
    this.serviceSub.unsubscribe();
  }


  calculate_age(dob) {
    const transformedDob = new Date(dob)
    const diffMs = Date.now() - transformedDob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  }

}
