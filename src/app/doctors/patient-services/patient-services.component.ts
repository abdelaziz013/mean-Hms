import { Component, OnInit, OnDestroy } from '@angular/core';
import { Service } from 'src/app/admin/services/service.model';
import { Subscription } from 'rxjs';
import { ServiceService } from 'src/app/admin/services/service.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Pservice } from './pservice.model';
import { PserviceService } from './pservice.service';
import { UsersService } from 'src/app/admin/users/users.service';




@Component({
  selector: 'app-patient-services',
  templateUrl: './patient-services.component.html',
  styleUrls: ['./patient-services.component.css']
})
export class PatientServicesComponent implements OnInit, OnDestroy {
  serviceList: Service[] = [];
  itemPerPage = null;
  currentPge = null;
  serviceSub: Subscription;
  patientServ: Pservice;
  id;
  userRole: string;
  private authListenerSubs: Subscription;



  constructor(  private sreviceService: ServiceService,
                private route: ActivatedRoute,
                private patientService: PserviceService,
                private fb: FormBuilder,
                private userService: UsersService,
                private router: Router

  ) { }

  serviceForm: FormGroup;

  ngOnInit() {
    // this.serviceForm = new FormGroup({
    //   services: new FormControl(null, Validators.required)
    // })


    // array of service
    this.serviceForm = this.fb.group({
      service: this.fb.array([
        this.fb.group({
          _id: '',
          pService: ''
        })
      ])
    })






    // serviceList
    this.sreviceService.getServiceList(this.itemPerPage, this.currentPge);
    this.serviceSub = this.sreviceService.getServiceUpdateListener()
      .subscribe((response) => {
        this.serviceList = response.service;
      })


    // get id
    this.route.paramMap.subscribe((paramMab: ParamMap) => {
      this.id = paramMab.get('id');
    })

    this.userRole = this.userService.getRole();
    this.authListenerSubs = this.userService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userRole = this.userService.getRole();
      });



  }

  // get pservice array
  get service() {
    return this.serviceForm.get('service') as FormArray;
  }

  // add service
  addService() {
    this.service.push(this.fb.group({
      _id: '',
      pService: ''

    }
    ));
  }

  removeService(index) {
    this.service.removeAt(index);
  }


  onSubmit() {
    this.service.value.forEach(element => {
      const service: Pservice = {
        _id: null,
        pService: element.pService,
        creator: null
      }

      if(this.userRole ==='Nurse'){
        this.patientService.addPatientServices(this.id, service).subscribe(response=>{
          this.router.navigate(['/reception/in-patient'])
        });

      }else{
        this.patientService.addPatientServices(this.id, service).subscribe(response=>{
          this.router.navigate(['/doctor/show-case', this.id])
        });
      }

    });
  }




  ngOnDestroy() {
    this.serviceSub.unsubscribe();
  }
}
