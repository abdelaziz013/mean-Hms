import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/admin/users/users.service';
import { Bill } from '../bill.model';
import { PatientService } from '../../patient/patient-service.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {
  userRole: string;
  private authListenerSubs: Subscription;
  billList: Bill[]=[];
  displayedColumns : string[]=['index','patientName','roomCost','serviceCost','medCost','createdBy','actionsColumn']
  billListSub: Subscription;

  constructor(private userService: UsersService,
              private patientService: PatientService

    ) { }

  ngOnInit() {
  this.userRole = this.userService.getRole();
  this.authListenerSubs = this.userService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userRole = this.userService.getRole();
      });

  this.patientService. getbillList();
  this.billListSub =this.patientService.billListUpdateListener()
                    .subscribe((responseData:{billList:Bill[]})=>{
                      this.billList =responseData.billList;
                      console.log(responseData)
                    })

  }

}
