import { Component, OnInit, OnDestroy } from '@angular/core';
import { DoctorsService } from './doctors/doctors.service';
import { Subscription } from 'rxjs';
import { Doctor } from './doctors/doctor.model';
import { element } from '@angular/core/src/render3';
import { ReceptionService } from './reception/reception.service';
import { Reception } from './reception/reception.model';
import { NursesService } from './nurses/nurses.service';
import { Nurse } from './nurses/nurse.model';
import { RoomService } from './room/room.service';
import { Room } from './room/room.model';
import { Opc } from './opc/opc.model';
import { OpcService } from './opc/opc.service';
import { PatientService } from '../reception/patient/patient-service.service';
import { Patient } from '../reception/patient/patient.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit,OnDestroy {
  itemPerPage ;
  currentPage ;
  id


  // doctors
  doctorListLength;
  private doctorsSub: Subscription;



  // reception
  private receptionSub: Subscription;
  receptionListLength;

  // nurses
  nurseListLength;
  private nursesub: Subscription;

  // rooms
  roomListLength;
  private roomSub: Subscription;
  // inpatient
  inpatientListLength;
  private inpatientListSub: Subscription;

  // out patient
  outpatientListLength;
  private outpatientListSub: Subscription;


  dataArray: string []= []


  constructor(public doctorsService: DoctorsService,
    public receptionService: ReceptionService,
    public nurseService: NursesService,
    private roomService: RoomService,
    private patientService: PatientService
  ) { }

  public pieChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public pieChartLabels = ['Doctors', 'Reception', 'Nurses', 'Rooms', 'In-patients', 'Out-patients'];
  public pieChartType = 'pie';
  public pieChartLegend = true;
  public pieChartData: any = [{ data: this.dataArray }];

  public pieChartColors = [
    {
      backgroundColor: ['#487BC0', '#5CA733', '#FFC800', '#E040FB', '#FF4081', '#FF7F00'],
      borderColor: 'rgba(148,159,177,1)'
    }
  ]



  ngOnInit() {



    // get doctors Number
    this.doctorsService.getDoctors(this.itemPerPage, this.currentPage);
    this.doctorsSub = this.doctorsService.getUpdatedDoctorsListener()
      .subscribe((doctorsData: { doctors: Doctor[], doctorsCount: number }) => {
        this.doctorListLength = doctorsData.doctorsCount;
        this.dataArray[0] = this.doctorListLength;



      })

    // get reception number
    this.receptionService.getReception(this.itemPerPage, this.currentPage);
    this.receptionSub = this.receptionService.getUpdatedReceptionListener()
      .subscribe((receptionData: { reception: Reception[], receptionCount: number }) => {
        this.receptionListLength = receptionData.receptionCount;
        this.dataArray[1] = this.receptionListLength;



      })

    // get nurse Number
    this.nurseService.getNurseList(this.itemPerPage, this.currentPage);
    this.nursesub = this.nurseService.getupdatenurselistener()
      .subscribe((nurseData: { nurses: Nurse[], nursesCount: number }) => {
        this.nurseListLength = nurseData.nursesCount;
        this.dataArray[2] =this.nurseListLength;
      })

    // get room number
    this.roomService.getRoomList(this.itemPerPage, this.currentPage);
    this.roomSub = this.roomService.getRoomUpdateListener()
      .subscribe((roomData: { room: Room[], maxCount: number }) => {
        this.roomListLength = roomData.maxCount;
        this.dataArray[3] = this.roomListLength;
      })

    // inpatient list
    this.patientService.getInPatientList(this.itemPerPage, this.currentPage,this.id);
    this.inpatientListSub = this.patientService.updateInpatientListenr()
      .subscribe((patientData: { patient: Patient[], maxCount: number }) => {
        this.inpatientListLength = patientData.patient.length;
        this.dataArray[4] = this.inpatientListLength;


      })


    // outpatient
    this.patientService.getOutPatientList(this.itemPerPage, this.currentPage,this.id);
    this.outpatientListSub = this.patientService.updateOutpatientListenr()
      .subscribe((patientData: { patient: Patient[], maxCount: number }) => {
        this.outpatientListLength = patientData.maxCount;
        this.dataArray[5] =this.outpatientListLength;

      })






  }


ngOnDestroy(){
  this.doctorsSub.unsubscribe();
  this.receptionSub.unsubscribe();
  this.nursesub.unsubscribe();
  this.inpatientListSub.unsubscribe();
  this.outpatientListSub.unsubscribe();
}

}
