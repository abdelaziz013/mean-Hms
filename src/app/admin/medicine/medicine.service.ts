import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Medicine } from './medicine.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private medList: Medicine[]=[]
  private medUpdate = new Subject<{medicine:Medicine[],maxCount:number}>()

  constructor(private http: HttpClient,private router:Router) { }

  // add medicine
  addMedicine(medicine:Medicine){
    this.http.post<{message:string}>('http://localhost:3000/medicine/add-medicne',medicine)
        .subscribe(()=>{
          this.router.navigate(['/admin/medicine-list'])
        })
  }

  getMedicineList(itemPerPage: number, currentpage: number){
      const queryParams = `?pagesize=${itemPerPage}&page=${currentpage}`;
      this.http.get<{medicine:Medicine[],maxCount:number}>('http://localhost:3000/medicine/list'+ queryParams)
          .subscribe((medData)=>{
            this.medList =medData.medicine
            this.medUpdate.next({
              medicine:[...this.medList],
              maxCount:medData.maxCount
            })
          })
  }

  getMedUpdateListner(){
    return this.medUpdate.asObservable();
  }

  // delete
  deleteMedicine(id: string){
    return this.http.delete('http://localhost:3000/medicine/'+ id);
  }


  // get medicine by ID
  getMedicineById(id: string){
    return this.http.get<{medicine: Medicine}>('http://localhost:3000/medicine/'+ id);

  }


updateMedicine(id:string,medicine:Medicine){
  this.http.put('http://localhost:3000/medicine/edit-medicine/'+id,medicine)
  .subscribe((response=>{
    this.router.navigate(['/admin/medicine-list'])
  }))
}

  //last
}
