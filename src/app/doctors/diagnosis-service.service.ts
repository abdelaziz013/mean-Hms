import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Diagnosis } from './diagnosis.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Patient } from '../reception/patient/patient.model';
import { environment } from 'src/environments/environment';
const BACKEND_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class DiagnosisServiceService {
  diagnosis: Diagnosis;
  diagnosisupdate = new Subject<{ diagnosis: Diagnosis, message: string }>();


  constructor(private http: HttpClient, private router: Router) { }

  // add diagnosis
  addDignosis(id: string, diagnosis: Diagnosis) {
    this.http
      .post<{ message: string, patient: Patient }>(BACKEND_URL+'/casemange/add-diagnosis/' + id, diagnosis)
      .subscribe((responseData) => {
          this.router.navigate(['/doctor/show-case', responseData.patient._id])
      })

  }

  // get diagnosis
  getDiagnosis(id: string) {
    this.http
      .get<{ diagnosis: Diagnosis, message: string }>(BACKEND_URL+'/casemange/diagnisis/' + id)
      .subscribe((responseData) => {
        this.diagnosis = responseData.diagnosis;
        this.diagnosisupdate.next({
          diagnosis: this.diagnosis,
          message: responseData.message
        })
      })
  }

  diagnsisupdatlistenr() {
    return this.diagnosisupdate.asObservable()
  }



  // update Diagnosis
  updateDiagnosis(id: string, diagnosis: Diagnosis) {
    this.http.put(BACKEND_URL+'/casemange/edit/' + id, diagnosis)
      .subscribe((response) => {
        this.router.navigate(['/doctor/show-case',id])
      });
  }

  // delete diagnosis
  deleteDiagnosis(id: string) {
    return this.http.delete(BACKEND_URL+'/casemange/delete/' + id)
  }















  // last
}
