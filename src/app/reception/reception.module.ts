import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceptionRoutingModule } from './reception-routing.module';
import { PatientComponent } from './patient/patient.component';
import { AddBillComponent } from './bill/add-bill/add-bill.component';
import { BillListComponent } from './bill/bill-list/bill-list.component';
import { PrintBillComponent } from './bill/print-bill/print-bill.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PatientComponent,
    AddBillComponent,
    BillListComponent,
    PrintBillComponent,
  ],
  imports: [
    CommonModule,
    ReceptionRoutingModule,
    SharedModule
  ]
})
export class ReceptionModule { }
