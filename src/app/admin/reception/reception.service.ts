import { Injectable } from '@angular/core';
import { Reception } from './reception.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
const BACKEND_URL = environment.apiURL;


@Injectable({
  providedIn: 'root'
})
export class ReceptionService {
  private recption : Reception[] = [];
  private receptionUpdated = new Subject<{reception: Reception[], receptionCount: number}>();

  constructor(private http : HttpClient , private router: Router) { }

  // add recception
  addReception(reception: Reception){
    this.http
      .post<{message: string}>(BACKEND_URL+'/reception/add-reception', reception)
      .subscribe((responseData) => {
        this.router.navigate(['/admin/reception-list']);
      });
  }

// get receptionlist
getReception(receptionPerPage: number, currentpage: number){

  const queryParams = `?pagesize=${receptionPerPage}&page=${currentpage}`;
  this.http
  .get<{reception: Reception[], maxCount: number}>(BACKEND_URL+'/reception/reception-list' + queryParams)
  .subscribe((receptiondata) => {
    this.recption = receptiondata.reception;
    this.receptionUpdated.next({
      reception: [...this.recption],
      receptionCount: receptiondata.maxCount
    })
  })
}

// listen to update
getUpdatedReceptionListener(){
  return this.receptionUpdated.asObservable();
}

// delete reception
deleteReception(id: string){
  return this.http.delete<{message: string}>(BACKEND_URL+'/reception/del-reception/'+ id )
}

// get by id
getReceptionById(id: string){
  return this.http.get<{reception: Reception}>(BACKEND_URL+'/reception/'+id)
}

// update
updateReception(id: string, reception: Reception){
  this.http.put(BACKEND_URL+'/reception/edit-reception/'+ id ,reception)
  .subscribe((response)=>{
      this.router.navigate(['/admin/reception-list']);
    });
  }




}








