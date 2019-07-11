import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Prescription } from './prescribtion.model';
import { Subject } from 'rxjs';
import { Patient } from 'src/app/reception/patient/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionServiceService {
  presList: Prescription[] = []
  presListupdate = new Subject<{ pres: Prescription[] }>()


  constructor(private http: HttpClient, private router: Router) { }

  // add presceiption
  addPresceibtion(id: string, prescription: Prescription) {
    this.http
      .post<{ message: string, patient: Patient }>('http://localhost:3000/casemange/add-prescription/' + id, prescription)
      .subscribe((response) => {
        this.router.navigate(['/doctor/show-case', response.patient._id])

      })
  }


  // get prescribtion by patient id
  getPrescription(id: string) {
    this.http.get<{ pres: Prescription[], message: string }>('http://localhost:3000/casemange/presciption/' + id)
      .subscribe((responseData) => {
        this.presList = responseData.pres;
        this.presListupdate.next({
          pres: [...this.presList]
        })

      })
  }

  presListUpdateListener() {
    return this.presListupdate.asObservable()
  }

  // delete ores
  deletePres(id: string) {
    return this.http.delete('http://localhost:3000/casemange/deletepres/' + id)
  }


  // last
}
