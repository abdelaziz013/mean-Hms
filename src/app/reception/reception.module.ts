import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceptionRoutingModule } from './reception-routing.module';
import { PatientComponent } from './patient/patient.component';
import { InpatientListComponent } from './inpatient-list/inpatient-list.component';
import { OutpatientListComponent } from './outpatient-list/outpatient-list.component';
import { AddBillComponent } from './bill/add-bill/add-bill.component';
import { BillListComponent } from './bill/bill-list/bill-list.component';
import { PrintBillComponent } from './bill/print-bill/print-bill.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';
import { MaterialModule } from '../material.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

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
    FlexLayoutModule,
    FormsModule,
    NgxPrintModule,
    MaterialModule,
    NgxMaterialTimepickerModule,
  ]
})
export class ReceptionModule { }
