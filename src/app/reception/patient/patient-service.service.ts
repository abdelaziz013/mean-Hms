import { Injectable } from '@angular/core';
import { Patient } from './patient.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Bill } from '../bill/bill.model';


@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patient: Patient;
  inPatientList: Patient[] = [];
  inpatientListUpdate = new Subject<{ patient: Patient[], maxCount: number }>();

  outPatientList: Patient[] = [];
  outpatientListUpdate = new Subject<{ patient: Patient[], maxCount: number }>();

  billList: Bill[] = []
  billListUpdate = new Subject<{ billList: Bill[] }>()
  moment: any

  constructor(private http: HttpClient, private router: Router) {
    this.moment = moment();

  }

  // add patient
  addPatient(patient: Patient) {
    this.http
      .post<{ savedpatient: Patient, message: string }>('http://localhost:3000/patient/add-patient', patient)
      .subscribe(responseData => {
        if (responseData.savedpatient.patientType === 'InPatient') {
          this.router.navigate(['/reception/in-patient'])
        } else {
          this.router.navigate(['/reception/out-patient'])
        }
      });
  }


  // getINpatientList
  getInPatientList(itemPerPage: number, currentpage, id: string) {
    const queryParams = `?pagesize=${itemPerPage}&page=${currentpage}&id=${id}`;
    this.http
      .get<{ patient: Patient[], maxCount: number }>('http://localhost:3000/patient/in-patient' + queryParams)
      .pipe(map(data => {
        return {
          patient: data.patient.map(patient => {
            return {
              _id: patient._id,
              regDate: moment(patient.regDate).format('DD-MM-YYYY'),
              name: patient.name,
              birthDate: patient.birthDate,
              age: this.calculate_age(patient.birthDate),
              phone: patient.phone,
              address: patient.address,
              gender: patient.gender,
              caringDoctor: patient.caringDoctor,
              room: patient.room,
              creator: patient.creator,
              maritalStatus: patient.maritalStatus,
              patientType: patient.patientType,
              checkoutDate: patient.checkoutDate,
              opc: null
            };
          }),
          maxCount: data.maxCount
        }
      })
      ).subscribe((transformedData => {

        this.inPatientList = transformedData.patient;
        this.inpatientListUpdate.next({
          patient: [...this.inPatientList],
          maxCount: transformedData.maxCount
        })


      }))
  }

  updateInpatientListenr() {
    return this.inpatientListUpdate.asObservable();
  }


  // get outPatient
  getOutPatientList(itemPerPage: number, currentpage:number, id: string) {
    const queryParams = `?pagesize=${itemPerPage}&page=${currentpage}&id=${id}`;
    this.http
      .get<{ patient: Patient[], maxCount: number }>('http://localhost:3000/patient/out-patient' + queryParams)
      .pipe(map(data => {
        return {
          patient: data.patient.map(patient => {
            return {
              _id: patient._id,
              regDate: patient.regDate,
              name: patient.name,
              birthDate: patient.birthDate,
              age: this.calculate_age(patient.birthDate),
              phone: patient.phone,
              address: patient.address,
              gender: patient.gender,
              caringDoctor: patient.caringDoctor,
              room: null,
              checkoutDate: null,
              creator: patient.creator,
              maritalStatus: patient.maritalStatus,
              patientType: patient.patientType,
              opc: patient.opc,
            };
          }),
          maxCount: data.maxCount
        }
      })
      ).subscribe((transformedData => {

        this.outPatientList = transformedData.patient;
        this.outpatientListUpdate.next({
          patient: [...this.outPatientList],
          maxCount: transformedData.maxCount
        })

      })
      )
  }

  updateOutpatientListenr() {
    return this.outpatientListUpdate.asObservable();
  }


  // calculate age
  calculate_age(dob) {
    const transformedDob = new Date(dob)
    const diff_ms = Date.now() - transformedDob.getTime();
    const age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }



  // get patient by id
  getPatientById(id: string) {
    return this.http.get<{ patient: Patient, message: string }>('http://localhost:3000/patient/patient/' + id)
  }

  // get bill by patient id
  getbillByPatientId(id: string) {
    return this.http.get<{ bill: Bill }>('http://localhost:3000/patient/patient-bill/' + id)
  }
 // get edit patient by id
 getEditPatientById(id: string) {
  return this.http.get<{ patient: Patient, message: string }>('http://localhost:3000/patient/edit-patient/' + id)
}

// update patient
updatePatient(id: string,patient: Patient){
  return this.http.put<{patient: Patient,message: string}>('http://localhost:3000/patient/edit/' + id,patient)
}


 // delete patient
deletePatient(id: string){
  return this.http.delete<{message: string}>('http://localhost:3000/patient/delete-patient/'+ id )
}

  // add discharge date
  addDischargeDate(id: string, date: Date) {
    this.http.put<{ messsage: string,id:string }>('http://localhost:3000/patient/discharge-inpatient/' + id, date)
      .subscribe((response) => {
        // console.log(response)
        // this.router.navigate(['/reception/add-bill',response.id])
        // location.reload();
      })
  }
  // add bill
  addBill(id: string, bill: Bill) {
    this.http.post<{ messsage: string }>('http://localhost:3000/patient/add-bill/' + id, bill)
      .subscribe((response) => {
        this.router.navigate(['/reception/bill-list'])
      })
  }


  // get bill list
  getbillList() {
    this.http.get<{ billList: Bill[], message: string }>('http://localhost:3000/patient/bill-list')
      .subscribe((response) => {
        this.billList = response.billList;
        this.billListUpdate.next({
          billList: [...this.billList],
        })
      })
  }

  billListUpdateListener(){
    return this.billListUpdate.asObservable();
  }

  // get bill By id
  getBillById(id:string){
   return this.http.get<{bill:Bill,patient:Patient}>('http://localhost:3000/patient/print-bill/'+id)
  }


  //  get days in room
  getdays(regDate, checkoutDate) {
    const oneDay = 1000 * 60 * 60 * 24;
    regDate =moment(regDate).format('MM/D/YYYY')
    checkoutDate=moment(checkoutDate).format('MM/D/YYYY')
    const dat1Ms = Date.parse(regDate)
    const dat2Ms = Date.parse(checkoutDate)
    const differenceMs = dat2Ms - dat1Ms;
    let days = differenceMs / oneDay;

    if (days === 0) {
      days = 1
    }
    return days;
  }







  //last
}
