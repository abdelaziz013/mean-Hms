import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../admin/users/auth.guard';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { AddPrescriptionComponent } from './add-prescription/add-prescription.component';
import { PatientServicesComponent } from './patient-services/patient-services.component';
import { ShowCaseComponent } from './show-case/show-case.component';
import { DoctorGuard } from '../admin/users/doctor.guard';

const routes: Routes = [
  {path: 'diagnosis/:id' ,canActivate:[AuthGuard,DoctorGuard], component:DiagnosisComponent,data: {title: 'Add Diagnosis'}},
  {path: 'prescription/:id' ,canActivate:[AuthGuard,DoctorGuard], component:AddPrescriptionComponent,data: {title: 'Add Prescription'}},
  {path: 'services/:id' , component:PatientServicesComponent,data: {title: 'Add Service'}},
  {path: 'show-case/:id' ,canActivate:[AuthGuard,DoctorGuard], component:ShowCaseComponent,data: {title: 'Case Manager'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
