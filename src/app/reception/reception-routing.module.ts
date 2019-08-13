import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { AuthGuard } from '../admin/users/auth.guard';
import { AddBillComponent } from './bill/add-bill/add-bill.component';
import { PrintBillComponent } from './bill/print-bill/print-bill.component';
import { BillListComponent } from './bill/bill-list/bill-list.component';

const routes: Routes = [
  {path: 'patient' , component:PatientComponent,data: {title: 'Add Patient'}},
    {path: 'add-bill/:id' , component: AddBillComponent,data: {title: 'Add Bill'} },
    {path: 'print-bill/:id' , component: PrintBillComponent, data: {title: 'Print Bill'}},
    {path: 'bill-list' , component: BillListComponent , data: {title: 'Bill List'}},
    {path: 'edit-patient/:id' , component:PatientComponent,data: {title: 'Edit Patient'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionRoutingModule { }
