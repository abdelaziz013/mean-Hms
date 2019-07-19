import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Service } from './service.model';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
const BACKEND_URL = environment.apiURL;


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  serviceList:Service[] =[];
  serviceListUpdate = new Subject<({service: Service[],maxCount: number})>();

  constructor(private http: HttpClient,private router:Router) { }


  // save service
  addService(service: Service){
    this.http
          .post<{message: string}>(BACKEND_URL+'/service/add-service',service)
            .subscribe((response)=>{
              this.router.navigate(['/admin/service-list']);
            })
  }



// getServiceList
getServiceList(pageSize:number, currentPage: number){
  const queryParams = `?pagesize=${pageSize}&page=${currentPage}`;
  this.http
      .get<{service: Service[],maxCount: number}>(BACKEND_URL+'/service/service-list'+queryParams)
      .subscribe((response)=>{
        this.serviceList =response.service;
        this.serviceListUpdate.next({
          service:[...this.serviceList],
          maxCount:response.maxCount
        })
      })
}

getServiceUpdateListener(){
  return this.serviceListUpdate.asObservable();
}

// get service by id
getserviceById(id:string){
  return this.http.get<{service:Service}>(BACKEND_URL+'/service/service/'+id);
}

// updateService
updateService(id:string,service:Service){
  return this.http.put(BACKEND_URL+'/service/edit-service/'+id,service)
}

// delete service
deleteService(id:string){
  return this.http.delete(BACKEND_URL+'/service/del-service/'+id)
}

}



