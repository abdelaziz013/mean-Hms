import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { AddPrescriptionComponent } from './add-prescription/add-prescription.component';
import { PatientServicesComponent } from './patient-services/patient-services.component';
import { ShowCaseComponent } from './show-case/show-case.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InpatientListComponent } from '../reception/inpatient-list/inpatient-list.component';
import { OutpatientListComponent } from '../reception/outpatient-list/outpatient-list.component';

@NgModule({
  declarations: [
    DiagnosisComponent,
    AddPrescriptionComponent,
    PatientServicesComponent,
    ShowCaseComponent,
   

  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,

  ]
})
export class DoctorModule { }
