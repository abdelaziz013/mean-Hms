import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../admin/users/auth.guard';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { AddPrescriptionComponent } from './add-prescription/add-prescription.component';
import { PatientServicesComponent } from './patient-services/patient-services.component';
import { ShowCaseComponent } from './show-case/show-case.component';

const routes: Routes = [
  {path: 'diagnosis/:id' , component:DiagnosisComponent, canActivate:[AuthGuard],data: {title: 'Add Diagnosis'}},
  {path: 'prescription/:id' , component:AddPrescriptionComponent, canActivate:[AuthGuard],data: {title: 'Add Prescription'}},
  {path: 'services/:id' , component:PatientServicesComponent, canActivate:[AuthGuard],data: {title: 'Add Service'}},
  {path: 'show-case/:id' , component:ShowCaseComponent, canActivate:[AuthGuard],data: {title: 'Case Manager'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
