import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Pservice } from './pservice.model';
import { Patient } from 'src/app/reception/patient/patient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PserviceService {
  pservice: Pservice[] = [];
  pserviceUpdate = new Subject<{ pservice: Pservice[] }>();


  constructor(private http: HttpClient, private router: Router) { }


  // add pservice
  addPatientServices(id: string, pService: Pservice) {
    // this.http
    //   .post<{ message: string,patient: Patient }>('http://localhost:3000/casemange/add-service/' + id, pService)
    //   .subscribe((response) => {
    //     this.router.navigate(['/doctor/show-case', response.patient._id])
    //   })
    return this.http.post<{ message: string, patient: Patient }>('http://localhost:3000/casemange/add-service/' + id, pService)

  }


  // get pservice
  getPtientService(id: string) {
    this.http
      .get<{ pService: Pservice[], message: string }>('http://localhost:3000/casemange/service/' + id)
      .subscribe((responseData) => {
        this.pservice = responseData.pService;
        this.pserviceUpdate.next({
          pservice: [...this.pservice]
        })
      })

  }

  pServiceUpdateListener() {
    return this.pserviceUpdate.asObservable();
  }


  // delete service
  deletePatientService(id: string) {
    return this.http.delete('http://localhost:3000/casemange/deleteservice/' + id)
  }
}



