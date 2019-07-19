import { Injectable } from '@angular/core';
import { Nurse } from './nurse.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NurseShift } from './nurseShift.model';
import { NurseRoster } from './roster.model';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const BACKEND_URL = environment.apiURL;


@Injectable({
  providedIn: 'root'
})
export class NursesService {
  private nurses: Nurse[] = [];
  private nurseShift: NurseShift[] = [];
  private roster: NurseRoster[]=[];
  private nursesUpdate = new Subject<{ nurses: Nurse[], nursesCount: number }>();
  private shiftUpdate = new Subject<{nurseShift: NurseShift[]}>();
  private rosterUpdate = new Subject<{roster: NurseRoster[],maxCount: number}>();
  moment: any


  constructor(private http: HttpClient, private router: Router) {
    this.moment = moment();
   }

  // addnurse
  addNurse(nurse: Nurse) {
    this.http
      .post<{ message: string, nurse: Nurse }>(BACKEND_URL+'/nurse/add-nurse', nurse)
      .subscribe((responseData) => {
        this.router.navigate(['/admin/nurses-list']);
      })
  }

  // getnurseList

  getNurseList(itemPerPage: number, currentpage: number) {
    const queryParams = `?pagesize=${itemPerPage}&page=${currentpage}`;
    this.http.get<{ nurses: Nurse[], maxCount: number }>(BACKEND_URL+'/nurse/nurse-list' + queryParams)
      .subscribe((responseData) => {
        this.nurses = responseData.nurses;
        this.nursesUpdate.next({
          nurses: [...this.nurses],
          nursesCount: responseData.maxCount
        })
      })
  }

  // listn to update
  getupdatenurselistener() {
    return this.nursesUpdate.asObservable();
  }

  // get nurse by id
  getbyId(id: string) {
    return this.http.get<{ nurse: Nurse }>(BACKEND_URL+'/nurse/' + id);
  }

  // update
  updateNurse(nurse: Nurse, id: string) {
    return this.http.put(BACKEND_URL+'/nurse/edit/' + id, nurse)
  }

  // delete nurse
  deletNurse(id: string) {
    return this.http.delete<{ message: string }>(BACKEND_URL+'/nurse/' + id)
  }


  // add nurseShifet
  addShift(shift: NurseShift) {
    this.http.post<{ message: string, shift: NurseShift }>('BACKEND_URL+/nurse/add-shift', shift)
      .subscribe((response) => {
        this.router.navigate(['/admin/nurseshift-list']);
      })
  }

  // get shift list
  getShift(){
    this.http.get<{nurseShift: NurseShift[]}>(BACKEND_URL+'/nurse/list/shift')
    .subscribe((data)=>{
      this.nurseShift = data.nurseShift;
      this.shiftUpdate.next({
        nurseShift:[...this.nurseShift]
      })
    })



  }

  getShiftUpdate(){
    return this.shiftUpdate.asObservable()
  }


  // deleteShift
  deleteShift(id:string){
    return this.http.delete<{message: string}>(BACKEND_URL+'/nurse/deleteshift/' + id)
  }


  // save roster
  addRoster(nurseRoster: NurseRoster){
    this.http.post<{message: string}>(BACKEND_URL+'/nurse/add-roster',nurseRoster)
    .subscribe((response)=>{
      this.router.navigate(['/admin/roster-list'])

    })
  }
//  getroster
getroster(itemPerPage: number,currentpage){
  const queryParams = `?pagesize=${itemPerPage}&page=${currentpage}`;
  this.http.get<{roster: NurseRoster[],maxCount: number}>(BACKEND_URL+'/nurse/roster/list'+queryParams)
    .pipe(map(data=>{
        return {
          roster:data.roster.map(roster=>{
            return{
          _id:roster._id,
          date:moment(roster.date).format('DD-MM-YYYY'),
          nurseShift:roster.nurseShift,
          nurse:roster.nurse,
          creator:roster.creator
        };
          }),
          maxCount: data.maxCount
        };
      })
    ).subscribe((transformedData)=>{
      this.roster = transformedData.roster;
      this.rosterUpdate.next({
        roster:[...this.roster],
        maxCount: transformedData.maxCount
      })

    })

}

getrosterUpdateListener(){
  return this.rosterUpdate.asObservable()
}

// get roster by id
getRosterById(id:string){
  return this.http.get<{roster: NurseRoster}>(BACKEND_URL+'/nurse/nurse-roster/' + id)
}

//  update Roster
updateRoster(roster: NurseRoster,id:string){
  return this.http.put(BACKEND_URL+'/nurse/edit-roster/' + id,roster)

}

// delete roster
deleteRoster(id: string){
  return this.http.delete(BACKEND_URL+'/nurse/del-roster/' + id)
}






}
