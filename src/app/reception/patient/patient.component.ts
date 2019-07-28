import { Component, OnInit, OnDestroy } from '@angular/core';
import { Room } from 'src/app/admin/room/room.model';
import { Opc } from 'src/app/admin/opc/opc.model';
import { Doctor } from 'src/app/admin/doctors/doctor.model';
import { DoctorsService } from 'src/app/admin/doctors/doctors.service';
import { Subscription } from 'rxjs';
import { RoomService } from 'src/app/admin/room/room.service';
import { OpcService } from 'src/app/admin/opc/opc.service';
import { PatientService } from './patient-service.service';
import { NgForm } from '@angular/forms';
import { Patient } from './patient.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit, OnDestroy {
  maritalStatus: string[] = ['Married', 'Single'];
  sex: string[] = ['Male', 'Female'];
  patientType: string[] = ['InPatient', 'OutPatient']
  selected: string;
  emptyroomList: Room[] = [];
  opcList: Opc[] = [];
  doctorList: Doctor[] = [];
  itemPerPage = null;
  currentPage = null;

  patient: Patient;
  id;
  public mode = 'add'
  private doctorSub: Subscription;
  private emtyroomSub: Subscription;
  private opcSub: Subscription;
  editRoom = false;
  editOpc = false;



  constructor(
    private doctorService: DoctorsService,
    private roomService: RoomService,
    private opcService: OpcService,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() {
    this.doctorService.getDoctors(this.itemPerPage, this.currentPage);
    this.doctorSub = this.doctorService.getUpdatedDoctorsListener()
      .subscribe((doctorsData: { doctors: Doctor[], doctorsCount: number }) => {
        this.doctorList = doctorsData.doctors;
      })

    this.roomService.getEmptyRoomList();
    this.emtyroomSub = this.roomService.emptyRoomUpdateListener()
      .subscribe((roomData: { emptyRoom: Room[] }) => {
        this.emptyroomList = roomData.emptyRoom;
      })

    this.opcService.getOpc();
    this.opcSub = this.opcService.opcUpdateListener()
      .subscribe((opcData: { opc: Opc[] }) => {
        this.opcList = opcData.opc;
      })

    //  get id edit mode
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.id = paramMap.get('id');
        this.patientService.getEditPatientById(this.id).subscribe((response) => {
          this.patient = response.patient;
          if (this.patient.patientType === 'InPatient') {
            this.editRoom = true;
          } else {
            this.editOpc = true;
          }
        })
      }
    })
  }



  onSave(form: NgForm) {
    if (form.invalid) {
      return;
    }


    const patient: Patient = {
      _id: null,
      name: form.value.name,
      birthDate: form.value.birthDate,
      phone: form.value.phone,
      address: form.value.address,
      gender: form.value.gender,
      maritalStatus: form.value.mstate,
      caringDoctor: form.value.doctor,
      patientType: form.value.type,
      room: form.value.pRoom,
      opc: form.value.opc,
      regDate: null,
      age: null,
      checkoutDate: null,
      creator: null
    }


    if (this.mode === 'edit') {
      this.patientService.updatePatient(this.id, patient).subscribe((response) => {
        if (patient.patientType === 'InPatient') {
          this.router.navigate(['/patient'])
        } else {
          this.router.navigate(['/reception/out-patient'])
        }
      })
    } else {
      this.patientService.addPatient(patient);
    }

    form.resetForm();

  }



  ngOnDestroy() {
    this.opcSub.unsubscribe();
    this.emtyroomSub.unsubscribe();
    this.doctorSub.unsubscribe();
  }

}
