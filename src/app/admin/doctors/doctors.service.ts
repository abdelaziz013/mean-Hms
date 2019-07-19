import { Injectable } from '@angular/core';
import { Doctor } from './doctor.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const BACKEND_URL = environment.apiURL;


@Injectable({ providedIn: 'root' })

export class DoctorsService {
  private doctors: Doctor[] = [];
  public doctorsUpdated = new Subject<{ doctors: Doctor[], doctorsCount: number }>();

  constructor(private http: HttpClient, private router: Router) { }


  // add doctor
  addDoctor(doctor: Doctor) {
    this.http
      .post<{ message: string }>(  BACKEND_URL +'/doctors/add-doctor', doctor)
      .subscribe((responseData) => {
        this.router.navigate(['/admin/doctorsList'])
      });
  }

  // get doctors list
  getDoctors(doctorsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${doctorsPerPage}&page=${currentPage}`;
    this.http

      .get<{ doctors: any, maxCount: number }>( BACKEND_URL + '/doctors' + queryParams)
      .pipe(
        map(doctorsData => {
          return {
            doctors: doctorsData.doctors.map(doctor => {
              return {
                id: doctor._id,
                name: doctor.name,
                phone: doctor.phone,
                email: doctor.email,
                speciality: doctor.speciality,
                rank: doctor.rank,
                creator: doctor.creator
              };
            }),
            maxCount: doctorsData.maxCount
          };
        })
      ).subscribe((transformedDoctorData) => {
        this.doctors = transformedDoctorData.doctors;
        this.doctorsUpdated.next({
          doctors: [...this.doctors],
          doctorsCount: transformedDoctorData.maxCount
        });
      });
  }

  // to listen to doctorsUpdate
  getUpdatedDoctorsListener() {
    return this.doctorsUpdated.asObservable();
  }

  deleteDoctor(doctorId: string) {
    return this.http.delete( BACKEND_URL +'/doctors/' + doctorId)
  }

  // get by id
  getDoctor(id: string) {
    return this.http.get<{
      doctor: {
        _id: any,
        name: string,
        phone: string,
        email: string,
        speciality: string,
        rank: string,
        creator: string
      }
    }>( BACKEND_URL +'/doctors/' + id)
  }

  // update
  updateDoctor(id: string, doctor: Doctor) {
    this.http.put( BACKEND_URL +'/doctors/edit-doctor/' + id, doctor)
      .subscribe((response) => {
        this.router.navigate(['/admin/doctorsList'])
      });
  }


}
