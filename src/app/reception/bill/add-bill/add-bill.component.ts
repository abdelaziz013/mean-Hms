import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PatientService } from '../../patient/patient-service.service';
import { NgForm } from '@angular/forms';
import { Patient } from '../../patient/patient.model';
import { Prescription } from 'src/app/doctors/add-prescription/prescribtion.model';
import { Subscription } from 'rxjs';
import { PrescriptionServiceService } from 'src/app/doctors/add-prescription/prescription-service.service';
import { Pservice } from 'src/app/doctors/patient-services/pservice.model';
import { PserviceService } from 'src/app/doctors/patient-services/pservice.service';
import { Bill } from '../bill.model';





@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css']
})
export class AddBillComponent implements OnInit {
  patient: Patient;
  id: string;
  addbill = true;
  outpatient = false;
  daysInRoom;
  regdate;
  checkoutDate;
  totalRoomCost: number;
  totalPrescreptioncost: number;
  totalServiceCost: number;
  minDate;
  patientBill = false;
  billId: string;
  presList: Prescription[];
  presSub: Subscription;
  displayedColumns: string[] = ['index', 'medicine', 'dose']
  pService: Pservice[];
  serviceSub: Subscription;
  serviceColumns: string[] = ['index', 'service', 'category']




  constructor(private route: ActivatedRoute,
              private patientService: PatientService,
              private presService: PrescriptionServiceService,
              private servicePtient: PserviceService



  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMab: ParamMap) => {
      this.id = paramMab.get('id')
    })


    // get patient
    this.patientService.getPatientById(this.id).subscribe((responseData) => {
      this.patient = responseData.patient;
      this.minDate = responseData.patient.regDate;

      if (this.patient.opc) {
        this.addbill = false;
        this.outpatient = true;
      }

      if (this.patient.checkoutDate) {
        this.addbill = false;
        this.regdate = this.patient.regDate;
        this.checkoutDate = this.patient.checkoutDate;
        this.daysInRoom = this.patientService.getdays(this.regdate, this.checkoutDate)
        this.totalRoomCost = this.daysInRoom * this.patient.room.roomCost;
      }
      // get prescription
      this.presService.getPrescription(this.id);
      this.presSub = this.presService.presListUpdateListener()
        .subscribe((response) => {
          this.presList = response.pres;
          this.presList = this.presList.filter(element => {
            return element.medicine !== null;
          })



          let cost = 0;
          // tslint:disable-next-line: no-shadowed-variable
          this.presList.forEach(element => {
            // tslint:disable-next-line: radix
            const total = parseInt(element.medicine.cost);
            cost += total;
          })
          this.totalPrescreptioncost = cost;
        })
    })


    // get patientServices
    this.servicePtient.getPtientService(this.id);
    this.serviceSub = this.servicePtient.pServiceUpdateListener()
      .subscribe((response) => {
        this.pService = response.pservice;
        let scost = 0;
        this.pService.forEach(element => {
          const totalser = parseInt(element.pService.serviceCost);
          scost += totalser;
        })

        this.totalServiceCost = scost;

      })


    // get bill by patient id
    this.patientService.getbillByPatientId(this.id).subscribe(response => {
      if (response.bill) {
        this.patientBill = true;
        this.billId =response.bill._id;

      }
    })

  }


// add duscharge date
  onSave(dischrageDate: NgForm) {
    if (dischrageDate.invalid) {
      return;
    }
    this.patientService.addDischargeDate(this.id, dischrageDate.value)
    window.location.reload()
  }



  onSaveBill(bill: NgForm) {
    if (bill.invalid) {
      return;
    }

    const newbill: Bill = {
      _id: null,
      serviceCost: bill.value.serviceCost,
      roomCost: bill.value.roomCost,
      medicineCost: bill.value.presCost,
      patient: null,
      creator: null
    }

    this.patientService.addBill(this.id, newbill)

  }

}
