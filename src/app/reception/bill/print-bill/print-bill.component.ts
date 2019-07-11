import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bill } from '../bill.model';
import { PatientService } from '../../patient/patient-service.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UsersService } from 'src/app/admin/users/users.service';
import { Subscription } from 'rxjs';
import { Patient } from '../../patient/patient.model';

@Component({
  selector: 'app-print-bill',
  templateUrl: './print-bill.component.html',
  styleUrls: ['./print-bill.component.css']
})
export class PrintBillComponent implements OnInit,OnDestroy {
  userRole: string;
  private authListenerSubs: Subscription;
  public patient: Patient;
  public pateintType: string;
  public bill: Bill;
  public id: string;
  arrayCost = [];

  totalBillCost = 0;
  displayedColumns : string[]=['medicineCost','roomCost','serviceCost']

  constructor(private patientService: PatientService,
              private route: ActivatedRoute,
              private userService: UsersService) { }

  ngOnInit() {
    // get user Role
    this.userRole = this.userService.getRole();
    this.authListenerSubs = this.userService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userRole = this.userService.getRole();
      });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.id = paramMap.get('id')
        this.patientService.getBillById(this.id).subscribe((responseData) => {

          this.bill = responseData.bill;

          this.patient = responseData.patient;
          this.pateintType =responseData.patient.patientType
          this.arrayCost.push(this.bill.serviceCost);
          this.arrayCost.push(this.bill.medicineCost);
          this.arrayCost.push(this.bill.roomCost);
         
          this.arrayCost.forEach(element => {
            if (element === undefined) {
              element = 0;
            }
            this.totalBillCost += element;
          })

        })
      }
    })



  }


  ngOnDestroy(){
    this.authListenerSubs.unsubscribe()
  }


}
