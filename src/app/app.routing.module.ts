import { NgModule } from '@angular/core';
import {  Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import { DoctorsComponent } from './admin/doctors/doctors.component';
import { DoctorsListComponent } from './admin/doctors/doctors-list/doctors-list.component';
import { UsersComponent } from './admin/users/users.component';
import { AuthGuard } from './admin/users/auth.guard';
import { ReceptionComponent } from './admin/reception/reception.component';
import { ReceptionListComponent } from './admin/reception/reception-list/reception-list.component';
import { NursListComponent } from './admin/nurses/nurs-list/nurs-list.component';
import { AddNurseComponent } from './admin/nurses/add-nurse/add-nurse.component';
import { AddShiftComponent } from './admin/nurses/add-shift/add-shift.component';
import { NurseshiftListComponent } from './admin/nurses/nurseshift-list/nurseshift-list.component';
import { AssignShiftComponent } from './admin/nurses/assign-shift/assign-shift.component';
import { NrosterListComponent } from './admin/nurses/nroster-list/nroster-list.component';
import { OpcComponent } from './admin/opc/opc.component';
import { OpcListComponent } from './admin/opc/opc-list/opc-list.component';
import { ServicesComponent } from './admin/services/services.component';
import { ServiceListComponent } from './admin/services/service-list/service-list.component';
import { RoomComponent } from './admin/room/room.component';
import { RoomListComponent } from './admin/room/room-list/room-list.component';
import { MedicineComponent } from './admin/medicine/medicine.component';
import { MedicineListComponent } from './admin/medicine/medicine-list/medicine-list.component';
import { UserListComponent } from './admin/users/user-list/user-list.component';
import { PatientComponent } from './reception/patient/patient.component';
import { InpatientListComponent } from './reception/inpatient-list/inpatient-list.component';
import { OutpatientListComponent } from './reception/outpatient-list/outpatient-list.component';
import { DiagnosisComponent } from './doctors/diagnosis/diagnosis.component';
import { AddPrescriptionComponent } from './doctors/add-prescription/add-prescription.component';
import { PatientServicesComponent } from './doctors/patient-services/patient-services.component';
import { ShowCaseComponent } from './doctors/show-case/show-case.component';
import { AddOpcshiftComponent } from './admin/opc/add-opcshift/add-opcshift.component';
import { OpcShiftlistComponent } from './admin/opc/opc-shiftlist/opc-shiftlist.component';
import { AssignOpcShiftComponent } from './admin/opc/assign-opc-shift/assign-opc-shift.component';
import { OpcrosterListComponent } from './admin/opc/opcroster-list/opcroster-list.component';
import { AddBillComponent } from './reception/bill/add-bill/add-bill.component';
import { BillListComponent } from './reception/bill/bill-list/bill-list.component';
import { PrintBillComponent } from './reception/bill/print-bill/print-bill.component';
import { NotFoundComponent } from './not-found/not-found.component';








const routes: Routes = [
    {path : '', component : LoginComponent,data: {title: 'HMS Login'}},
    {path : 'admin', component : AdminComponent,canActivate:[AuthGuard],data: {title: 'HMS Home'}},
    {path: 'admin/doctors' , component: DoctorsComponent, canActivate:[AuthGuard],data: {title: 'Admin/doctors'} },
    {path: 'admin/doctorsList' , component: DoctorsListComponent, canActivate:[AuthGuard],data: {title: 'Admin/doctors List'}},
    {path: 'admin/doctors/edit/:doctorId' , component: DoctorsComponent, canActivate:[AuthGuard],data: {title: 'Admin/Edit Doctor'}},
    {path: 'admin/reception' , component: ReceptionComponent, canActivate:[AuthGuard],data: {title: 'Admin/Add Reception'}},
    {path: 'admin/reception-list' , component: ReceptionListComponent, canActivate:[AuthGuard],data: {title: 'Admin/Reception List'}},
    {path: 'admin/reception/edit/:id' , component: ReceptionComponent, canActivate:[AuthGuard],data: {title: 'Edit Reception'}},
    {path: 'admin/add-nurse' , component: AddNurseComponent, canActivate:[AuthGuard],data: {title: 'Add Nurse'}},
    {path: 'admin/nurses-list' , component: NursListComponent, canActivate:[AuthGuard],data: {title: 'Nurse List'}},
    {path: 'admin/add-nurse/edit/:id' , component: AddNurseComponent, canActivate:[AuthGuard],data: {title: 'Edit Nurse'}},
    {path: 'admin/add-nurse-shift' , component: AddShiftComponent, canActivate:[AuthGuard],data: {title: 'Add Nurse Shift'}},
    {path: 'admin/nurseshift-list' , component: NurseshiftListComponent,canActivate:[AuthGuard],data: {title: 'Nurse-Shift List'}},
    {path: 'admin/assign-nurseshift' , component:AssignShiftComponent, canActivate:[AuthGuard],data: {title: 'Assign Nurse Shift'}},
    {path: 'admin/roster-list' , component:NrosterListComponent, canActivate:[AuthGuard],data: {title: 'Nurse Roster'}},
    {path: 'admin/assign-nurseshift/:id' , component:AssignShiftComponent, canActivate:[AuthGuard],data: {title: 'Edit Nurse Roster'}},
    {path: 'admin/opc' , component:OpcComponent, canActivate:[AuthGuard],data: {title: 'Add Opc'}},
    {path: 'admin/opc-list' , component:OpcListComponent, canActivate:[AuthGuard],data: {title: 'Opcs list'}},
    {path: 'admin/add-opcshift' , component:AddOpcshiftComponent, canActivate:[AuthGuard],data: {title: 'Add Opcs Shift'}},
    {path: 'admin/opcshift-list' , component:OpcShiftlistComponent, canActivate:[AuthGuard],data: {title: 'Opcs Shift-list'}},
    {path: 'admin/assign-opcshift' , component:AssignOpcShiftComponent, canActivate:[AuthGuard],data: {title: 'Assign Opcs-Shift'}},
    {path: 'admin/opcroster-list' , component:OpcrosterListComponent, canActivate:[AuthGuard],data: {title: 'Opcs Roster'}},
    {path: 'admin/opc-roster/edit/:id' , component: AssignOpcShiftComponent, canActivate:[AuthGuard],data: {title: 'Edit Opcs Roster'}},
    {path: 'admin/services' , component:ServicesComponent, canActivate:[AuthGuard],data: {title: 'Add Service'}},
    {path: 'admin/service-list' , component:ServiceListComponent, canActivate:[AuthGuard],data: {title: 'Service List'}},
    {path: 'admin/services/edit/:id' , component:ServicesComponent, canActivate:[AuthGuard],data: {title: 'Edit Service'}},
    {path: 'admin/room' , component:RoomComponent, canActivate:[AuthGuard],data: {title: 'Add Room'}},
    {path: 'admin/room-list' , component:RoomListComponent, canActivate:[AuthGuard],data: {title: 'Room List'}},
    {path: 'admin/room/:id' , component:RoomComponent, canActivate:[AuthGuard],data: {title: 'Edit Room'}},
    {path: 'admin/medicine' , component:MedicineComponent, canActivate:[AuthGuard],data: {title: 'Add Medicine'}},
    {path: 'admin/medicine/edit/:id' , component:MedicineComponent, canActivate:[AuthGuard],data: {title: 'Edit Medicine'}},
    {path: 'admin/medicine-list' , component:MedicineListComponent, canActivate:[AuthGuard],data: {title: 'Medicine list'}},
    {path: 'reception/patient' , component:PatientComponent, canActivate:[AuthGuard],data: {title: 'Add Patient'}},
    {path: 'reception/in-patient' , component:InpatientListComponent, canActivate:[AuthGuard],data: {title: 'Reception InPatient-List'}},
    {path: 'reception/out-patient' , component:OutpatientListComponent, canActivate:[AuthGuard],data: {title: 'OutPatient-List'}},
    {path: 'reception/add-bill/:id' , component: AddBillComponent, canActivate:[AuthGuard],data: {title: 'Add Bill'} },
    {path: 'reception/print-bill/:id' , component: PrintBillComponent, canActivate:[AuthGuard], data: {title: 'Print Bill'}},
    {path: 'reception/bill-list' , component: BillListComponent , canActivate:[AuthGuard], data: {title: 'Bill List'}},
    {path: 'reception/edit-patient/:id' , component:PatientComponent,  canActivate:[AuthGuard],data: {title: 'Edit Patient'}},
    {path: 'doctor/patient' , component:InpatientListComponent, canActivate:[AuthGuard],data: {title: 'Doctor InPatient-List'}},
    {path: 'doctor/diagnosis/:id' , component:DiagnosisComponent, canActivate:[AuthGuard],data: {title: 'Add Diagnosis'}},
    {path: 'doctor/prescription/:id' , component:AddPrescriptionComponent, canActivate:[AuthGuard],data: {title: 'Add Prescription'}},
    {path: 'doctor/services/:id' , component:PatientServicesComponent, canActivate:[AuthGuard],data: {title: 'Add Service'}},
    {path: 'doctor/show-case/:id' , component:ShowCaseComponent, canActivate:[AuthGuard],data: {title: 'Case Manager'}},
    {path: 'admin/users' , component: UsersComponent, canActivate:[AuthGuard],data: {title: 'Add User'}},
    {path: 'admin/users-list' , component: UserListComponent, canActivate:[AuthGuard],data: {title: 'User List'}},
    {path: 'admin/edit-user/:id' , component: UsersComponent, canActivate:[AuthGuard],data: {title: 'Edit user'}},
    {path: '**', component:NotFoundComponent,data: {title: 'Not Found'} }

];




@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]

})
export class AppRoutingModule {}
