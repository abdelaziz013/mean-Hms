import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Opc } from './opc.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { OpcShift } from './opc-shift.model';
import { OpcRoster } from './opc-roster.model';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class OpcService {
  opc: Opc[] = []
  opcShift: OpcShift[] = []

  opcUpdate = new Subject<{ opc: Opc[] }>();
  opcShiftUpdate = new Subject<{ opcShift: OpcShift[] }>();

  private opcRoster: OpcRoster[] = [];
  opcRosterUpdate = new Subject<{ roster: OpcRoster[], maxCount: number }>();
  moment: any;



  constructor(private http: HttpClient, private router: Router) {
    this.moment = moment();
  }

  // addOpc
  addOpc(opc: Opc) {
    this.http.post<{ message: string }>('http://localhost:3000/opc/add-opc', opc)
      .subscribe((response) => {
        this.router.navigate(['/admin/opc-list'])
      })
  }

  // get opcList
  getOpc() {
    this.http
      .get<{ opc: Opc[] }>('http://localhost:3000/opc/opc-list')
      .subscribe((opcData) => {
        this.opc = opcData.opc
        this.opcUpdate.next({
          opc: [...this.opc]
        })
      })
  }

  opcUpdateListener() {
    return this.opcUpdate.asObservable();
  }

  // delete opc
  deleteOpc(id: string) {
    return this.http.delete('http://localhost:3000/opc/delete-opc/' + id)
  }


  // add opcShift
  addOpcShift(opcShift: OpcShift) {
    this.http.post<{ message: string }>('http://localhost:3000/opc/add-opcshift', opcShift)
      .subscribe((response) => {
        this.router.navigate(['/admin/opcshift-list'])
      })
  }

  // get opc shift
  getOpcShift() {
    this.http
      .get<{ opcShift: OpcShift[] }>('http://localhost:3000/opc/opc-shift')
      .subscribe((responseData) => {
        this.opcShift = responseData.opcShift,
          this.opcShiftUpdate.next({
            opcShift: [...this.opcShift]
          })
      })
  }

  opcShiftUpdateListener() {
    return this.opcShiftUpdate.asObservable();
  }

  // delete opc Shift
  deleteOpcShift(id: string) {
    return this.http.delete('http://localhost:3000/opc/delete-opcshift/' + id)
  }

  // add roster
  addopcRoster(roster: OpcRoster) {
    this.http
      .post<{ mesage: string }>('http://localhost:3000/opc/assign-opcshift', roster)
      .subscribe((response) => {
        this.router.navigate(['/admin/opcroster-list'])
      })

  }

  // get opc Roster
  getroster(itemPerPage: number, currentpage) {
    const queryParams = `?pagesize=${itemPerPage}&page=${currentpage}`;
    this.http.get<{ roster: OpcRoster[], maxCount: number }>('http://localhost:3000/opc/roster/list' + queryParams)
      .pipe(map(data => {
        return {
          roster: data.roster.map(roster => {
            return {
              _id: roster._id,
              date: moment(roster.date).format('DD-MM-YYYY'),
              shift: roster.shift,
              opc: roster.opc,
              doctor: roster.doctor,
              creator: roster.creator
            };
          }),
          maxCount: data.maxCount
        };
      })
      ).subscribe((transformedData) => {
        this.opcRoster = transformedData.roster;
        this.opcRosterUpdate.next({
          roster: [...this.opcRoster],
          maxCount: transformedData.maxCount
        })

      })

  }

  // opcRosterUpdate Listenrt
  opcRosterUpdateListene(){
    return this.opcRosterUpdate.asObservable()
  }

  // getroster by id
  getOpcRosterById(id:string){
    return this.http.get<{roster:OpcRoster}>('http://localhost:3000/opc/opc-roster/' + id)
  }

  // update rostte
  updateRoster(id:string,roster:OpcRoster){
    this.http.put('http://localhost:3000/opc/edit-roster/' + id,roster)
    .subscribe((response)=>{

      this.router.navigate(['/admin/opcroster-list'])
    })
  }

  // delete roster
  deleteopcRoster(id:string){
    return this.http.delete('http://localhost:3000/opc/del-roster/' + id)
  }

}
