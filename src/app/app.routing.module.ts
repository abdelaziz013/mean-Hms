import { NgModule } from '@angular/core';
import {  Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';

import { AuthGuard } from './admin/users/auth.guard';

import { PatientComponent } from './reception/patient/patient.component';
import { InpatientListComponent } from './reception/inpatient-list/inpatient-list.component';
import { OutpatientListComponent } from './reception/outpatient-list/outpatient-list.component';
import { DiagnosisComponent } from './doctors/diagnosis/diagnosis.component';
import { AddPrescriptionComponent } from './doctors/add-prescription/add-prescription.component';
import { PatientServicesComponent } from './doctors/patient-services/patient-services.component';
import { ShowCaseComponent } from './doctors/show-case/show-case.component';
import { AddBillComponent } from './reception/bill/add-bill/add-bill.component';
import { BillListComponent } from './reception/bill/bill-list/bill-list.component';
import { PrintBillComponent } from './reception/bill/print-bill/print-bill.component';
import { NotFoundComponent } from './not-found/not-found.component';








const routes: Routes = [
    {path : '', component : LoginComponent,data: {title: 'HMS Login'}},
    {path : 'home', component : AdminComponent,canActivate:[AuthGuard],data: {title: 'HMS Home'}},
    {path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
    {path: 'reception', loadChildren: './reception/reception.module#ReceptionModule'},
    {path: 'doctor', loadChildren: './doctors/doctor.module#DoctorModule'},
    {path: 'doctor/patient' , component:InpatientListComponent, canActivate:[AuthGuard],data: {title: 'Doctor InPatient-List'}},
    {path: 'reception/in-patient' , component:InpatientListComponent, canActivate:[AuthGuard],data: {title: 'Reception InPatient-List'}},






    {path: '**', component:NotFoundComponent,data: {title: 'Not Found'} }

];




@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]

})
export class AppRoutingModule {}
