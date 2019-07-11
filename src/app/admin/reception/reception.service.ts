import { Injectable } from '@angular/core';
import { Reception } from './reception.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

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
      .post<{message: string}>('http://localhost:3000/reception/add-reception', reception)
      .subscribe((responseData) => {
        this.router.navigate(['/admin/reception-list']);
      });
  }

// get receptionlist
getReception(receptionPerPage: number, currentpage: number){

  const queryParams = `?pagesize=${receptionPerPage}&page=${currentpage}`;
  this.http
  .get<{reception: Reception[], maxCount: number}>('http://localhost:3000/reception/reception-list' + queryParams)
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
  return this.http.delete<{message: string}>('http://localhost:3000/reception/del-reception/'+ id )
}

// get by id
getReceptionById(id: string){
  return this.http.get<{reception: Reception}>('http://localhost:3000/reception/'+id)
}

// update
updateReception(id: string, reception: Reception){
  this.http.put('http://localhost:3000/reception/edit-reception/'+ id ,reception)
  .subscribe((response)=>{
      this.router.navigate(['/admin/reception-list']);
    });
  }




}








