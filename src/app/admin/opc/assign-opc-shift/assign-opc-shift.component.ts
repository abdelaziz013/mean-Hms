import { Component, OnInit } from '@angular/core';
import { OpcShift } from '../opc-shift.model';
import { Subscription } from 'rxjs';
import { OpcService } from '../opc.service';
import { Opc } from '../opc.model';
import { Doctor } from '../../doctors/doctor.model';
import { DoctorsService } from '../../doctors/doctors.service';
import { NgForm } from '@angular/forms';
import { OpcRoster } from '../opc-roster.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-assign-opc-shift',
  templateUrl: './assign-opc-shift.component.html',
  styleUrls: ['./assign-opc-shift.component.css']
})
export class AssignOpcShiftComponent implements OnInit {
  shiftList: OpcShift[] = [];
  private shiftSub: Subscription;
  opcList: Opc[] = []
  opcSub: Subscription;
  doctorList: Doctor[] = [];
  private doctorsSub: Subscription;
  doctorsPerPage = null;
  currentPage = null;
  id;
  roster: OpcRoster;
  public mode ='add';


  constructor(private opcService: OpcService,
              private doctorsService: DoctorsService,
              private route: ActivatedRoute,


              ) { }

  ngOnInit() {

    // get opcShift list
    this.opcService.getOpcShift();
    this.shiftSub = this.opcService.opcShiftUpdateListener()
      .subscribe((responseData) => {
        this.shiftList = responseData.opcShift;
      })

    // get opc list
    this.opcService.getOpc();
    this.opcSub = this.opcService.opcUpdateListener()
      .subscribe((opcData: { opc: Opc[] }) => {
        this.opcList = opcData.opc;
      })

    // get doctor
    this.doctorsService.getDoctors(this.doctorsPerPage, this.currentPage);
    this.doctorsSub = this.doctorsService.getUpdatedDoctorsListener()
      .subscribe((doctorsData: { doctors: Doctor[], doctorsCount: number }) => {
        this.doctorList = doctorsData.doctors;

      })


    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('id')){
        this.mode ='edit';
        this.id =paramMap.get('id');
        this.opcService.getOpcRosterById(this.id)
                  .subscribe((data=>{
                    this.roster = data.roster;
                  }))
      }

      })

  }

  onSave(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const roster: OpcRoster = {
      _id: null,
      date: form.value.shiftdate,
      shift: form.value.shiftName,
      opc: form.value.opc,
      doctor: form.value.doctor,
      creator: null
    }

    if (this.mode==='edit'){
      this.opcService.updateRoster(this.id,roster)
    } else {
      this.opcService.addopcRoster(roster);
    }



  }

}
