import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { AuthGuard } from '../admin/users/auth.guard';
import { InpatientListComponent } from './inpatient-list/inpatient-list.component';
import { OutpatientListComponent } from './outpatient-list/outpatient-list.component';
import { AddBillComponent } from './bill/add-bill/add-bill.component';
import { PrintBillComponent } from './bill/print-bill/print-bill.component';
import { BillListComponent } from './bill/bill-list/bill-list.component';

const routes: Routes = [
  {path: 'patient' , component:PatientComponent, canActivate:[AuthGuard],data: {title: 'Add Patient'}},
    
    {path: 'out-patient' , component:OutpatientListComponent, canActivate:[AuthGuard],data: {title: 'OutPatient-List'}},
    {path: 'add-bill/:id' , component: AddBillComponent, canActivate:[AuthGuard],data: {title: 'Add Bill'} },
    {path: 'print-bill/:id' , component: PrintBillComponent, canActivate:[AuthGuard], data: {title: 'Print Bill'}},
    {path: 'bill-list' , component: BillListComponent , canActivate:[AuthGuard], data: {title: 'Bill List'}},
    {path: 'edit-patient/:id' , component:PatientComponent,  canActivate:[AuthGuard],data: {title: 'Edit Patient'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionRoutingModule { }
